using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using vjezba_backend.Models;

namespace vjezba_backend.Controllers
{
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
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""genres"":[");

            filmEntry f = (from i in db.filmEntry where i.Id == idFilm select i).First();
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

        private HttpResponseMessage generateResponse(HttpStatusCode status, StringBuilder sb)
        {
            HttpResponseMessage m = new HttpResponseMessage(status);
            m.Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json");
            return m;
        }
    }
}