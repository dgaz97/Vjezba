﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class VjezbaEntities : DbContext
    {
        public VjezbaEntities()
            : base("name=VjezbaEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<actorDoingCharacter> actorDoingCharacter { get; set; }
        public virtual DbSet<character> character { get; set; }
        public virtual DbSet<filmEntry> filmEntry { get; set; }
        public virtual DbSet<filmEntry_movie> filmEntry_movie { get; set; }
        public virtual DbSet<filmEntry_tvShow> filmEntry_tvShow { get; set; }
        public virtual DbSet<filmEntryHasGenre> filmEntryHasGenre { get; set; }
        public virtual DbSet<genre> genre { get; set; }
        public virtual DbSet<image> image { get; set; }
        public virtual DbSet<movieList> movieList { get; set; }
        public virtual DbSet<movieListEntry> movieListEntry { get; set; }
        public virtual DbSet<person> person { get; set; }
        public virtual DbSet<personInFilmEntry> personInFilmEntry { get; set; }
        public virtual DbSet<personRole> personRole { get; set; }
        public virtual DbSet<role> role { get; set; }
        public virtual DbSet<user> user { get; set; }
    }
}