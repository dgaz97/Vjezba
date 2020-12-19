using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;

namespace vjezba_backend.Controllers
{
    public class UserController : ApiController
    {
        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            int cnt = -66;
            using (var db = new VjezbaEntities())
            {
                cnt = db.userSet.Count();
                HttpResponseMessage m = new HttpResponseMessage(HttpStatusCode.OK);
                m.Content = new StringContent($"{{\"date\": \"test\", \"ggg\": 52, \"brojKorisnika\":{cnt}}}", System.Text.Encoding.UTF8, "application/json");
                return m;
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return id.ToString();
        }

        class unutarnjaKlasa
        {
            bool test;
            string test2;
            DateTime test3;
            public override string ToString()
            {
                    return test + " " + test2 + " " + test3;
            }
        }
        // POST api/<controller>
        [HttpPost]
        public string Post(/*[FromBody] string value*/)
        {
            //HttpResponseMessage m = new HttpResponseMessage(HttpStatusCode.OK);
            //m.Content = new StringContent($"{value}", System.Text.Encoding.UTF8, "text/plain");
            //return m;
            Task<string> t = Request.Content.ReadAsStringAsync();
            t.Wait();

            unutarnjaKlasa k = (unutarnjaKlasa) JsonSerializer.Deserialize(t.Result, typeof(unutarnjaKlasa));
            return k.ToString();
            //return (Regex.Unescape(t.Result));
            //return (string) JObject.Parse(t.Result.Replace(System.Environment.NewLine, String.Empty)).ToString();
            
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}