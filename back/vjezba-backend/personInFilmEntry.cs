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
    
    public partial class personInFilmEntry
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public personInFilmEntry()
        {
            this.actorDoingCharacter = new HashSet<actorDoingCharacter>();
        }
    
        public int Id { get; set; }
        public System.DateTime dateCreated { get; set; }
        public System.DateTime dateLastUpdated { get; set; }
        public int filmEntry_Id { get; set; }
        public int person_Id { get; set; }
        public string personRole_roleName { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<actorDoingCharacter> actorDoingCharacter { get; set; }
        public virtual filmEntry filmEntry { get; set; }
        public virtual person person { get; set; }
        public virtual personRole personRole { get; set; }
    }
}
