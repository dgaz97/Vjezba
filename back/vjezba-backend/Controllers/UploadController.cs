using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web.Http.Cors;

namespace vjezba_backend.Controllers
{
    public class UploadController : Controller
    {

        [DataContract]
        public class ChunkMetaData
        {
            [DataMember(Name = "uploadUid")]
            public string UploadUid { get; set; }
            [DataMember(Name = "fileName")]
            public string FileName { get; set; }
            [DataMember(Name = "contentType")]
            public string ContentType { get; set; }
            [DataMember(Name = "chunkIndex")]
            public long ChunkIndex { get; set; }
            [DataMember(Name = "totalChunks")]
            public long TotalChunks { get; set; }
            [DataMember(Name = "totalFileSize")]
            public long TotalFileSize { get; set; }
        }

        public class FileResult
        {
            public bool uploaded { get; set; }
            public string fileUid { get; set; }
        }

        [HttpPost]
        [AllowCrossSite]
        public ActionResult Submit(IEnumerable<HttpPostedFileBase> files)
        {
            if (files != null)
            {
                TempData["UploadedFiles"] = GetFileInfo(files);
            }

            return RedirectToRoute("Demo", new { section = "upload", example = "result" });
        }

        [AllowCrossSite]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> files, string type, int id)
        {
            string workingDirectory = HttpRuntime.AppDomainAppPath;
            StringBuilder sb = new StringBuilder();
            // The Name of the Upload component is "files"
            if (files != null)
            {
                foreach (var file in files)
                {
                    Directory.CreateDirectory($"{workingDirectory}/img/{type}/{id}/");
                    file.SaveAs($"{workingDirectory}/img/{type}/{id}/{file.FileName}");
                    //if (type == "movie") sb.Append("movie");
                    //sb.Append(file.FileName);
                    //sb.Append(file.ContentType);
                    //sb.Append(file.ContentLength);

                    // Some browsers send file names with full path. This needs to be stripped.
                    //var fileName = Path.GetFileName(file.FileName);
                    //var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);

                    // The files are not actually saved in this demo
                    // file.SaveAs(physicalPath);
                }
            }

            // Return an empty string to signify success
            return Content("");
        }

        [AllowCrossSite]
        public ActionResult Remove(string[] fileNames, string type, int id)
        {
            string workingDirectory = HttpRuntime.AppDomainAppPath;
            // The parameter of the Remove action must be called "fileNames"

            if (fileNames != null)
            {
                foreach (var fullName in fileNames)
                {
                    //var fileName = Path.GetFileName(fullName);
                    //var physicalPath = Path.Combine(Server.MapPath("~/App_Data"), fileName);
                    string physicalPath = $"{workingDirectory}/img/{type}/{id}/{fullName}";

                    // TODO: Verify user permissions

                    if (System.IO.File.Exists(physicalPath))
                    {
                        // The files are not actually removed in this demo
                        System.IO.File.Delete(physicalPath);
                    }
                }
            }

            // Return an empty string to signify success
            return Content("");
        }

        /*
        [AllowCrossSite]
        public void AppendToFile(string fullPath, Stream content)
        {
            try
            {
                using (FileStream stream = new FileStream(fullPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
                {
                    using (content)
                    {
                        content.CopyTo(stream);
                    }
                }
            }
            catch (IOException ex)
            {
                throw ex;
            }
        }*/

        /*[AllowCrossSite]
        public ActionResult ChunkSave(IEnumerable<HttpPostedFileBase> files, string metaData, string type, int id)
        {
            if (metaData == null)
            {
                return Save(files, type, id);
            }

            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(metaData));
            var serializer = new DataContractJsonSerializer(typeof(ChunkMetaData));
            ChunkMetaData somemetaData = serializer.ReadObject(ms) as ChunkMetaData;
            string path = String.Empty;
            // The Name of the Upload component is "files"
            if (files != null)
            {
                foreach (var file in files)
                {
                    //path = Path.Combine(Server.MapPath("~/App_Data"), somemetaData.FileName);

                    //AppendToFile(path, file.InputStream);
                }
            }

            FileResult fileBlob = new FileResult();
            fileBlob.uploaded = somemetaData.TotalChunks - 1 <= somemetaData.ChunkIndex;
            fileBlob.fileUid = somemetaData.UploadUid;

            return Json(fileBlob);
        }*/

        [AllowCrossSite]
        [Route("image/getall/{type}/{id}")]
        public ActionResult GetAll(string type, int id)
        {
            string workingDirectory = HttpRuntime.AppDomainAppPath;
            string physicalPath = $"{workingDirectory}/img/{type}/{id}";


            List<string> files = new List<string>();
            try
            {
                Directory.GetFiles(physicalPath).ToList().ForEach(x =>
                {
                    x = x.Replace(workingDirectory, "");
                    files.Add($@"https://localhost:44385{x.Replace('\\', '/')}");
                });
            }catch (DirectoryNotFoundException ex)
            {
                return Json(files, JsonRequestBehavior.AllowGet);
            }



            return Json(files, JsonRequestBehavior.AllowGet);
        }

        private IEnumerable<string> GetFileInfo(IEnumerable<HttpPostedFileBase> files)
        {
            return
                from a in files
                where a != null
                select string.Format("{0} ({1} bytes)", Path.GetFileName(a.FileName), a.ContentLength);
        }
    }
}