using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vjezba_backend.Models
{
    public class MovieToAdd
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public System.TimeSpan duration { get; set; }
        public System.DateTime releaseDate { get; set; }
        public string status { get; set; }
        public string countryOfOrigin { get; set; }
    }
}