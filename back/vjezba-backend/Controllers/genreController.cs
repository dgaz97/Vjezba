using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using vjezba_backend.Models;

namespace vjezba_backend.Controllers
{
    [EnableCors(origins: "http://localhost:8000, https://localhost:8000", headers: "*", methods: "*")]
    public class genreController : ApiController
    {
        public HttpResponseMessage GetAllGenres()
        {
            VjezbaEntities db = new VjezbaEntities();
            StringBuilder sb = new StringBuilder();
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""genres"":[");

            (from x in db.genre select x).ToList().ForEach(x =>
            {
                sb.Append(x.ToJson());
                sb.Append(",");
            });
            sb.Length--;
            sb.Append($@"]}}");
            return generateResponse(HttpStatusCode.OK, sb);
        }

        public HttpResponseMessage GetFilmsOfGenre(int idGenre)
        {
            VjezbaEntities db = new VjezbaEntities();
            List<filmEntry> l = (from x in db.filmEntry where x.filmEntryHasGenre.Any(y=>y.genre_Id==idGenre)
                                 select x).OrderBy(g => g.dateLastUpdated).ToList();
            StringBuilder sb = new StringBuilder();
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""filmEntries"":[");

            if (l.Count == 0)
            {
                sb.Append($@"]");
                sb.Append($@"}}");
                return generateResponse(HttpStatusCode.OK, sb);
            }

            l.ForEach(y =>
            {
                sb.Append(y.ToJson() + ",");

            });
            sb.Length--;//Briše zadnji zarez
            sb.Append($@"]}}");

            return generateResponse(HttpStatusCode.OK, sb);

        }

        public HttpResponseMessage GetGenre(int id)
        {
            VjezbaEntities db = new VjezbaEntities();
            StringBuilder sb = new StringBuilder();
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""genre"":");

            genre g = (from x in db.genre where x.Id == id select x).First();
            sb.Append(g.ToJson());
            sb.Append($@"}}");
            return generateResponse(HttpStatusCode.OK, sb);
        }

        public HttpResponseMessage GetGenresOfFilm(int idFilm)
        {
            VjezbaEntities db = new VjezbaEntities();
            StringBuilder sb = new StringBuilder();
            filmEntry f = (from i in db.filmEntry where i.Id == idFilm select i).First();
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""genres"":[");

            if (f.filmEntryHasGenre.Count == 0)
            {
                sb.Append($@"]");
                sb.Append($@"}}");
                return generateResponse(HttpStatusCode.OK, sb);
            }
            foreach (filmEntryHasGenre i in f.filmEntryHasGenre)
            {
                sb.Append(i.genre.ToJson());
                sb.Append($@",");
            }
            sb.Length--;
            sb.Append($@"]");

            sb.Append($@"}}");
            return generateResponse(HttpStatusCode.OK, sb);
        }

        [HttpPost]
        [Route("api/genre/add/")]
        public HttpResponseMessage AddGenresToMovie(GenresToAddToMovie g)
        {
            VjezbaEntities db = new VjezbaEntities();
            StringBuilder sb = new StringBuilder();

            List<filmEntryHasGenre> fehg = new List<filmEntryHasGenre>();

            List<filmEntryHasGenre> oldlist = (from i in db.filmEntryHasGenre where i.filmEntry_Id == g.idMovie select i).ToList();
            oldlist.ForEach(y => db.filmEntryHasGenre.Remove(y));
            g.listOfGenreIds.ForEach(x =>
            {
                
                genre genre = (from i in db.genre where i.Id == x select i).First();
                filmEntry filmEntry = (from i in db.filmEntry where i.Id == g.idMovie select i).First();
                filmEntryHasGenre f = new filmEntryHasGenre();
                f.genre = genre;
                f.filmEntry = filmEntry;
                db.filmEntryHasGenre.Add(f);
                db.SaveChanges();
            });
            sb.Append($@"{{");
            sb.Append($@"""success"":true");
            sb.Append($@"}}");

            return generateResponse(HttpStatusCode.OK, sb);

        }

        private HttpResponseMessage generateResponse(HttpStatusCode status, StringBuilder sb)
        {
            HttpResponseMessage m = new HttpResponseMessage(status);
            m.Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json");
            return m;
        }
    }
}