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
    
    public partial class character
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public character()
        {
            this.actorDoingCharacter = new HashSet<actorDoingCharacter>();
            this.image = new HashSet<image>();
        }
    
        public int Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public System.DateTime dateCreated { get; set; }
        public System.DateTime dateLastUpdated { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<actorDoingCharacter> actorDoingCharacter { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<image> image { get; set; }
    }
}
