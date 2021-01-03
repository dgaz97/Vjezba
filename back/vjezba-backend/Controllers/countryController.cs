using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace vjezba_backend.Controllers
{
    [EnableCors(origins: "http://localhost:8000, https://localhost:8000", headers: "*", methods: "*")]
    public class countryController : ApiController
    {
        /**
         * Dohvaća sve države iz baze
         */
        public HttpResponseMessage Get()
        {
            VjezbaEntities db = new VjezbaEntities();
            StringBuilder sb = new StringBuilder();
            sb.Append($@"{{");
            sb.Append($@"""success"":true,");
            sb.Append($@"""countries"":[");

            (from x in db.countryList select x).ToList().ForEach(x =>
            {
                sb.Append(x.ToJson());
                sb.Append(",");
            });
            sb.Length--;
            sb.Append($@"]}}");
            return generateResponse(HttpStatusCode.OK, sb);
        }

        /**
         * Dohvaća ime države prema ISO kodu
         */
        [HttpGet]
        [Route("api/country/countryName/")]
        public HttpResponseMessage GetCountryName(string code)
        {
            StringBuilder sb = new StringBuilder();
            VjezbaEntities db = new VjezbaEntities();

            string name = (from x in db.countryList
                           where code == x.countryCode
                           select x.countryNameEn).First();
            sb.Append($@"{{");
            sb.Append($@"""status"":true,");
            sb.Append($@"""countryName"":""{name}""");
            sb.Append($@"}}");

            return generateResponse(HttpStatusCode.OK, sb);
        }

        /**
         * Pomoćna metoda koja sastavlja HTTP odgovor
         */
        private HttpResponseMessage generateResponse(HttpStatusCode status, StringBuilder sb)
        {
            HttpResponseMessage m = new HttpResponseMessage(status);
            m.Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json");
            return m;
        }
    }
}