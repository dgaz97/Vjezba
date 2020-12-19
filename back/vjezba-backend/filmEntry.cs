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
    
    public partial class filmEntry
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public filmEntry()
        {
            this.personInFilmEntry = new HashSet<personInFilmEntry>();
            this.filmEntryHasGenre = new HashSet<filmEntryHasGenre>();
            this.movieListEntry = new HashSet<movieListEntry>();
            this.image = new HashSet<image>();
        }
    
        public int Id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public System.TimeSpan duration { get; set; }
        public System.DateTime releaseDate { get; set; }
        public string status { get; set; }
        public System.DateTime dateCreated { get; set; }
        public System.DateTime dateLastUpdated { get; set; }
        public string countryOfOrigin { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<personInFilmEntry> personInFilmEntry { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<filmEntryHasGenre> filmEntryHasGenre { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<movieListEntry> movieListEntry { get; set; }
        public virtual filmEntry_movie filmEntry_movie { get; set; }
        public virtual filmEntry_tvShow filmEntry_tvShow { get; set; }
        public virtual filmEntry_tvShow filmEntry_tvShow1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<image> image { get; set; }
    }
}