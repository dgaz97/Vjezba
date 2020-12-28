using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using vjezba_backend;

namespace vjezba_backend.Controllers
{
    [EnableCors(origins: "http://localhost:8000, https://localhost:8000", headers: "*", methods: "*")]
    public class filmEntriesController : ApiController
    {
        private VjezbaEntities db = new VjezbaEntities();

        // GET: api/filmEntries
        public HttpResponseMessage GetfilmEntry(int page=1)
        {
            List<filmEntry> l = (from x in db.filmEntry
                    select x).OrderBy(g=>g.dateLastUpdated).Skip((page-1)*10).Take(10).ToList();
            StringBuilder sb = new StringBuilder();
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""filmEntries"":[");

            l.ForEach(y =>
            {
                sb.Append(y.ToJson()+",");

            });
            sb.Length--;//Briše zadnji zarez
            sb.Append($@"]}}");

            return generateResponse(HttpStatusCode.OK, sb);

        }

        /*// GET: api/filmEntries/5
        [ResponseType(typeof(filmEntry))]
        public IHttpActionResult GetonefilmEntry(int id)
        {
            filmEntry filmEntry = db.filmEntry.Find(id);
            if (filmEntry == null)
            {
                return NotFound();
            }

            return Ok(filmEntry);
        }*/

        // PUT: api/filmEntries/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutfilmEntry(int id, filmEntry filmEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != filmEntry.Id)
            {
                return BadRequest();
            }

            db.Entry(filmEntry).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!filmEntryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/filmEntries
        [ResponseType(typeof(filmEntry))]
        public IHttpActionResult PostfilmEntry(filmEntry filmEntry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.filmEntry.Add(filmEntry);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = filmEntry.Id }, filmEntry);
        }

        // DELETE: api/filmEntries/5
        [ResponseType(typeof(filmEntry))]
        public IHttpActionResult DeletefilmEntry(int id)
        {
            filmEntry filmEntry = db.filmEntry.Find(id);
            if (filmEntry == null)
            {
                return NotFound();
            }

            db.filmEntry.Remove(filmEntry);
            db.SaveChanges();

            return Ok(filmEntry);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool filmEntryExists(int id)
        {
            return db.filmEntry.Count(e => e.Id == id) > 0;
        }

        private HttpResponseMessage generateResponse(HttpStatusCode status, StringBuilder sb)
        {
            HttpResponseMessage m = new HttpResponseMessage(status);
            m.Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json");
            return m;
        }
    }
}