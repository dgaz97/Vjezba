using AutoMapper;
using Newtonsoft.Json.Linq;
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
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using vjezba_backend;
using vjezba_backend.Models;

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

        [HttpGet]
        [Route("api/filmEntries/nofpages/")]
        public HttpResponseMessage GetNumberOfMoviePages()
        {
            StringBuilder sb = new StringBuilder();
            double count = Math.Ceiling(Convert.ToDouble((from x in db.filmEntry select x).Count())/10);
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""numberOfPages"":{Convert.ToInt32(count)}");
            sb.Append($@"}}");

            return generateResponse(HttpStatusCode.OK, sb);
        }

        // GET: api/filmEntries/5
        public HttpResponseMessage GetonefilmEntry(int id)
        {
            filmEntry filmEntry = db.filmEntry.Find(id);

            StringBuilder sb = new StringBuilder();
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""filmEntry"":");
            sb.Append(filmEntry.ToJson());
            sb.Append($@"}}");
            return generateResponse(HttpStatusCode.OK, sb);
        }

        /*
         * Stvaranje novog filma
         */
        [HttpPost]
        [Route("api/filmEntries/create/")]
        public HttpResponseMessage CreateFilmEntry([FromBody] MovieToAdd data)
        {
            Task<string> t = Request.Content.ReadAsStringAsync();
            t.Wait();

            MapperConfiguration config = (MapperConfiguration)new MapperConfiguration(cfg => cfg.CreateMap<MovieToAdd, filmEntry>());
            filmEntry f = config.CreateMapper().Map<filmEntry>(data);

            DateTime time = DateTime.Now;
            f.dateCreated = time;
            f.dateLastUpdated = time;

            StringBuilder sb = new StringBuilder();

            db.filmEntry.Add(f);
            db.SaveChanges();

            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""id"":{f.Id}");
            sb.Append($@"}}");
            return generateResponse(HttpStatusCode.OK, sb);
        }

        /**
         * Uređivanje postojećeg filma
         */
        [HttpPost]
        [Route("api/filmEntries/edit/")]
        public HttpResponseMessage EditFilmEntry([FromBody] MovieToAdd data)
        {
            Task<string> t = Request.Content.ReadAsStringAsync();
            t.Wait();

            filmEntry f = (from x in db.filmEntry
                           where data.Id == x.Id
                           select x).First();

            //DateTime c = f.dateCreated;
            MapperConfiguration config = new MapperConfiguration(cfg => cfg.CreateMap<MovieToAdd, filmEntry>());
            config.CreateMapper().Map<MovieToAdd,filmEntry>(data, f);
            //f.dateCreated = c;

            DateTime time = DateTime.Now;
            f.dateLastUpdated = time;


            db.SaveChanges();

            StringBuilder sb = new StringBuilder();

            //db.filmEntry.Add(f);

            sb.Append($@"{{");
            sb.Append($@"""success"":true");
            sb.Append($@"}}");
            return generateResponse(HttpStatusCode.OK, sb);
        }

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