//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace vjezba_backend
{
    using System;
    using System.Collections.Generic;
    
    public partial class actorDoingCharacter
    {
        public int Id { get; set; }
        public System.DateTime dateCreated { get; set; }
        public System.DateTime dateLastUpdated { get; set; }
    
        public virtual character character { get; set; }
        public virtual personInFilmEntry personInFilmEntry { get; set; }
    }
}
