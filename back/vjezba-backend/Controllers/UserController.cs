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
using System.Text;
using AutoMapper;
using vjezba_backend.Models;
using System.Security.Cryptography;

namespace vjezba_backend.Controllers
{
    public class UserController : ApiController
    {
        // GET api/<controller>/
        public HttpResponseMessage Get()
        {
            int cnt = -66;
            using (var db = new VjezbaEntities())
            {
                cnt = db.user.Count();
                HttpResponseMessage m = new HttpResponseMessage(HttpStatusCode.OK);
                m.Content = new StringContent($"{{\"date\": \"test\", \"ggg\": 52, \"brojKorisnika\":{cnt}}}", System.Text.Encoding.UTF8, "application/json");
                return m;
            }
        }

        // GET api/<controller>/{id}
        public string Get(int id)
        {
            using (var db = new VjezbaEntities())
            {
                var u =from x in db.user
                         where x.Id == id
                         select x;
                return u.First().username;
            }
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
        public HttpResponseMessage Post([FromBody] UserToRegister value)
        {
            int SALTSIZE = 48;
            int HASHSIZE = 48;
            int ITERATIONS = 15000;
            HashAlgorithmName HASH = HashAlgorithmName.SHA256;
            //PBKDF2

            Task<string> t = Request.Content.ReadAsStringAsync();
            t.Wait();

            MapperConfiguration config = (MapperConfiguration) new MapperConfiguration(cfg => cfg.CreateMap<UserToRegister, user>());

            user u = config.CreateMapper().Map<user>(value);

            byte[] salt = new byte[SALTSIZE];
            RandomNumberGenerator rcsp = RNGCryptoServiceProvider.Create();
            rcsp.GetBytes(salt);
            u.passSalt = Convert.ToBase64String(salt);
            Rfc2898DeriveBytes pbkdf2 = new Rfc2898DeriveBytes(value.password, salt, ITERATIONS, HASH);
            u.passHash = Convert.ToBase64String(pbkdf2.GetBytes(HASHSIZE));

            u.verified = false;
            u.banned = false;
            u.banReason = null;
            u.registrationTime = DateTime.Now;
            u.avatarLink = "img/default.webp";
            u.role_roleName = "user";

            //u.passSalt=System.Security.Cryptography

            using (var db=new VjezbaEntities())
            {
                //user u = (user) JsonSerializer.Deserialize(t.Result, typeof(user));
                StringBuilder sb = new StringBuilder();
                HttpResponseMessage m;
                HttpStatusCode status;

                int usersWithUsername = (from x in db.user
                            where x.username == u.username
                            select x).Count();
                int usersWithEmail = (from x in db.user
                                         where x.email == u.email
                                         select x).Count();
                if (usersWithUsername != 0)
                {
                    status = HttpStatusCode.BadRequest;
                    sb.AppendLine($"{{");
                    sb.AppendLine($"\"success\":false,");
                    sb.AppendLine($"\"errorMsg\":\"User already exists\"");
                    sb.AppendLine($"}}");
                }
                else if (usersWithEmail != 0)
                {
                    status = HttpStatusCode.BadRequest;
                    sb.AppendLine($"{{");
                    sb.AppendLine($"\"success\":false,");
                    sb.AppendLine($"\"errorMsg\":\"Email already in use\"");
                    sb.AppendLine($"}}");
                }
                else try
                {
                    Console.WriteLine(u.Id);
                    db.user.Add(u);
                    db.SaveChanges();

                    status = HttpStatusCode.OK;
                    sb.AppendLine($"{{");
                    sb.AppendLine($"\"success\":true,");
                    sb.AppendLine($"\"errorMsg\":\"User added successfully\"");
                    sb.AppendLine($"}}");
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException)
                {
                    status = HttpStatusCode.BadRequest;
                    sb.AppendLine($"{{");
                    sb.AppendLine($"\"success\":false,");
                    sb.AppendLine($"\"errorMsg\":\"User attributes missing\"");
                    sb.AppendLine($"}}");

                }
                m = new HttpResponseMessage(status);
                m.Content = new StringContent(sb.ToString(), System.Text.Encoding.UTF8, "application/json");
                return m;
            }
            
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