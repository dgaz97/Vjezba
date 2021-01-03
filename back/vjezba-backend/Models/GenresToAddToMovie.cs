using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vjezba_backend.Models
{
    public class GenresToAddToMovie
    {
        public int idMovie;
        public List<int> listOfGenreIds;
    }
}