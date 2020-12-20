using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vjezba_backend.Models
{
    public class UserToRegister
    {
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public System.DateTime birthdate { get; set; }
    }
}