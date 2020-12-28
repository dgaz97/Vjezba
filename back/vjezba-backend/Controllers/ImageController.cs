using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace vjezba_backend.Controllers
{
    public class ImageController : ApiController
    {
        // GET api/<controller>/5
        [HttpGet]
        public HttpResponseMessage Get(string img)
        {
            string workingDirectory = HttpRuntime.AppDomainAppPath;
            Byte[] b = File.ReadAllBytes(workingDirectory + "/img/" + img);
            string ext = Path.GetExtension(workingDirectory + "/img/" + img);
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(b.ToArray());
            result.Content.Headers.ContentType = new MediaTypeHeaderValue($"image/{ext.Trim('.')}");
            return result;
        }

    }
}