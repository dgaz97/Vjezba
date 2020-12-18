
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 12/18/2020 23:33:37
-- Generated from EDMX file: C:\Users\Gazdek Denis\Desktop\praksa\Projekti\Bootstrap\back\vjezba-backend\DataModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [Vjezba];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_movieListmovieListEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[movieListEntrySet] DROP CONSTRAINT [FK_movieListmovieListEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_filmEntrymovieListEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[movieListEntrySet] DROP CONSTRAINT [FK_filmEntrymovieListEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_usermovieList]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[movieListSet] DROP CONSTRAINT [FK_usermovieList];
GO
IF OBJECT_ID(N'[dbo].[FK_filmEntryactorInFilmEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[personInFilmEntrySet] DROP CONSTRAINT [FK_filmEntryactorInFilmEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_characteractorDoingCharacter]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[actorDoingCharacterSet] DROP CONSTRAINT [FK_characteractorDoingCharacter];
GO
IF OBJECT_ID(N'[dbo].[FK_filmEntryfilmEntryImage]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[imageSet_filmEntryImage] DROP CONSTRAINT [FK_filmEntryfilmEntryImage];
GO
IF OBJECT_ID(N'[dbo].[FK_charactercharacterImage]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[imageSet_characterImage] DROP CONSTRAINT [FK_charactercharacterImage];
GO
IF OBJECT_ID(N'[dbo].[FK_actoractorImage]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[imageSet_personImage] DROP CONSTRAINT [FK_actoractorImage];
GO
IF OBJECT_ID(N'[dbo].[FK_genrefilmEntryHasGenre]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[filmEntryHasGenreSet] DROP CONSTRAINT [FK_genrefilmEntryHasGenre];
GO
IF OBJECT_ID(N'[dbo].[FK_filmEntryfilmEntryHasGenre]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[filmEntryHasGenreSet] DROP CONSTRAINT [FK_filmEntryfilmEntryHasGenre];
GO
IF OBJECT_ID(N'[dbo].[FK_personpersonInFilmEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[personInFilmEntrySet] DROP CONSTRAINT [FK_personpersonInFilmEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_personRolepersonInFilmEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[personInFilmEntrySet] DROP CONSTRAINT [FK_personRolepersonInFilmEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_personInFilmEntryactorDoingCharacter]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[actorDoingCharacterSet] DROP CONSTRAINT [FK_personInFilmEntryactorDoingCharacter];
GO
IF OBJECT_ID(N'[dbo].[FK_tvShowtvShowEpisode]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[filmEntrySet_tvShowEpisode] DROP CONSTRAINT [FK_tvShowtvShowEpisode];
GO
IF OBJECT_ID(N'[dbo].[FK_roleuser]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[userSet] DROP CONSTRAINT [FK_roleuser];
GO
IF OBJECT_ID(N'[dbo].[FK_filmEntryImage_inherits_image]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[imageSet_filmEntryImage] DROP CONSTRAINT [FK_filmEntryImage_inherits_image];
GO
IF OBJECT_ID(N'[dbo].[FK_characterImage_inherits_image]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[imageSet_characterImage] DROP CONSTRAINT [FK_characterImage_inherits_image];
GO
IF OBJECT_ID(N'[dbo].[FK_personImage_inherits_image]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[imageSet_personImage] DROP CONSTRAINT [FK_personImage_inherits_image];
GO
IF OBJECT_ID(N'[dbo].[FK_tvShow_inherits_filmEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[filmEntrySet_tvShow] DROP CONSTRAINT [FK_tvShow_inherits_filmEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_tvShowEpisode_inherits_filmEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[filmEntrySet_tvShowEpisode] DROP CONSTRAINT [FK_tvShowEpisode_inherits_filmEntry];
GO
IF OBJECT_ID(N'[dbo].[FK_movie_inherits_filmEntry]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[filmEntrySet_movie] DROP CONSTRAINT [FK_movie_inherits_filmEntry];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[userSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[userSet];
GO
IF OBJECT_ID(N'[dbo].[roleSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[roleSet];
GO
IF OBJECT_ID(N'[dbo].[movieListSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[movieListSet];
GO
IF OBJECT_ID(N'[dbo].[movieListEntrySet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[movieListEntrySet];
GO
IF OBJECT_ID(N'[dbo].[personSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[personSet];
GO
IF OBJECT_ID(N'[dbo].[personInFilmEntrySet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[personInFilmEntrySet];
GO
IF OBJECT_ID(N'[dbo].[filmEntrySet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[filmEntrySet];
GO
IF OBJECT_ID(N'[dbo].[characterSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[characterSet];
GO
IF OBJECT_ID(N'[dbo].[actorDoingCharacterSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[actorDoingCharacterSet];
GO
IF OBJECT_ID(N'[dbo].[imageSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[imageSet];
GO
IF OBJECT_ID(N'[dbo].[filmEntryHasGenreSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[filmEntryHasGenreSet];
GO
IF OBJECT_ID(N'[dbo].[genreSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[genreSet];
GO
IF OBJECT_ID(N'[dbo].[personRoleSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[personRoleSet];
GO
IF OBJECT_ID(N'[dbo].[imageSet_filmEntryImage]', 'U') IS NOT NULL
    DROP TABLE [dbo].[imageSet_filmEntryImage];
GO
IF OBJECT_ID(N'[dbo].[imageSet_characterImage]', 'U') IS NOT NULL
    DROP TABLE [dbo].[imageSet_characterImage];
GO
IF OBJECT_ID(N'[dbo].[imageSet_personImage]', 'U') IS NOT NULL
    DROP TABLE [dbo].[imageSet_personImage];
GO
IF OBJECT_ID(N'[dbo].[filmEntrySet_tvShow]', 'U') IS NOT NULL
    DROP TABLE [dbo].[filmEntrySet_tvShow];
GO
IF OBJECT_ID(N'[dbo].[filmEntrySet_tvShowEpisode]', 'U') IS NOT NULL
    DROP TABLE [dbo].[filmEntrySet_tvShowEpisode];
GO
IF OBJECT_ID(N'[dbo].[filmEntrySet_movie]', 'U') IS NOT NULL
    DROP TABLE [dbo].[filmEntrySet_movie];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'userSet'
CREATE TABLE [dbo].[userSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [username] nvarchar(max)  NOT NULL,
    [passSalt] nvarchar(max)  NOT NULL,
    [passHash] nvarchar(max)  NOT NULL,
    [verified] bit  NOT NULL,
    [banned] bit  NOT NULL,
    [banReason] nvarchar(max)  NULL,
    [registrationTime] datetime  NOT NULL,
    [email] nvarchar(max)  NOT NULL,
    [firstName] nvarchar(max)  NOT NULL,
    [lastName] nvarchar(max)  NOT NULL,
    [birthdate] datetime  NOT NULL,
    [avatarLink] nvarchar(max)  NOT NULL,
    [role_roleName] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'roleSet'
CREATE TABLE [dbo].[roleSet] (
    [roleName] nvarchar(50)  NOT NULL,
    [roleDescription] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'movieListSet'
CREATE TABLE [dbo].[movieListSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [listName] nvarchar(max)  NOT NULL,
    [dateCreated] datetime  NOT NULL,
    [dateLastUpdated] datetime  NOT NULL,
    [user_Id] int  NOT NULL
);
GO

-- Creating table 'movieListEntrySet'
CREATE TABLE [dbo].[movieListEntrySet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [userRating] nvarchar(max)  NOT NULL,
    [dateCreated] datetime  NOT NULL,
    [dateLastUpdated] datetime  NOT NULL,
    [movieList_Id] int  NOT NULL,
    [filmEntry_Id] int  NOT NULL
);
GO

-- Creating table 'personSet'
CREATE TABLE [dbo].[personSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [firstName] nvarchar(max)  NOT NULL,
    [lastName] nvarchar(max)  NOT NULL,
    [birthdate] nvarchar(max)  NOT NULL,
    [dateCreated] datetime  NOT NULL,
    [dateLastUpdated] datetime  NOT NULL
);
GO

-- Creating table 'personInFilmEntrySet'
CREATE TABLE [dbo].[personInFilmEntrySet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [dateCreated] datetime  NOT NULL,
    [dateLastUpdated] datetime  NOT NULL,
    [filmEntry_Id] int  NOT NULL,
    [person_Id] int  NOT NULL,
    [personRole_roleName] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'filmEntrySet'
CREATE TABLE [dbo].[filmEntrySet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [name] nvarchar(max)  NOT NULL,
    [description] nvarchar(max)  NOT NULL,
    [duration] time  NOT NULL,
    [releaseDate] datetime  NOT NULL,
    [status] nvarchar(max)  NOT NULL,
    [dateCreated] datetime  NOT NULL,
    [dateLastUpdated] datetime  NOT NULL,
    [countryOfOrigin] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'characterSet'
CREATE TABLE [dbo].[characterSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [name] nvarchar(max)  NOT NULL,
    [description] nvarchar(max)  NOT NULL,
    [dateCreated] datetime  NOT NULL,
    [dateLastUpdated] datetime  NOT NULL
);
GO

-- Creating table 'actorDoingCharacterSet'
CREATE TABLE [dbo].[actorDoingCharacterSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [dateCreated] datetime  NOT NULL,
    [dateLastUpdated] datetime  NOT NULL,
    [character_Id] int  NOT NULL,
    [personInFilmEntry_Id] int  NOT NULL
);
GO

-- Creating table 'imageSet'
CREATE TABLE [dbo].[imageSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [link] nvarchar(max)  NOT NULL,
    [altText] nvarchar(max)  NOT NULL,
    [dateCreated] datetime  NOT NULL,
    [dateLastUpdated] datetime  NOT NULL
);
GO

-- Creating table 'filmEntryHasGenreSet'
CREATE TABLE [dbo].[filmEntryHasGenreSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [genre_Id] int  NOT NULL,
    [filmEntry_Id] int  NOT NULL
);
GO

-- Creating table 'genreSet'
CREATE TABLE [dbo].[genreSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [name] nvarchar(max)  NOT NULL,
    [description] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'personRoleSet'
CREATE TABLE [dbo].[personRoleSet] (
    [roleName] nvarchar(50)  NOT NULL,
    [roleDescription] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'imageSet_filmEntryImage'
CREATE TABLE [dbo].[imageSet_filmEntryImage] (
    [Id] int  NOT NULL,
    [filmEntry_Id] int  NOT NULL
);
GO

-- Creating table 'imageSet_characterImage'
CREATE TABLE [dbo].[imageSet_characterImage] (
    [Id] int  NOT NULL,
    [character_Id] int  NOT NULL
);
GO

-- Creating table 'imageSet_personImage'
CREATE TABLE [dbo].[imageSet_personImage] (
    [Id] int  NOT NULL,
    [actor_Id] int  NOT NULL
);
GO

-- Creating table 'filmEntrySet_tvShow'
CREATE TABLE [dbo].[filmEntrySet_tvShow] (
    [dateFirstEpisodeAired] datetime  NULL,
    [dateLastEpisodeAired] datetime  NULL,
    [Id] int  NOT NULL
);
GO

-- Creating table 'filmEntrySet_tvShowEpisode'
CREATE TABLE [dbo].[filmEntrySet_tvShowEpisode] (
    [Id] int  NOT NULL,
    [tvShow_Id] int  NOT NULL
);
GO

-- Creating table 'filmEntrySet_movie'
CREATE TABLE [dbo].[filmEntrySet_movie] (
    [Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'userSet'
ALTER TABLE [dbo].[userSet]
ADD CONSTRAINT [PK_userSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [roleName] in table 'roleSet'
ALTER TABLE [dbo].[roleSet]
ADD CONSTRAINT [PK_roleSet]
    PRIMARY KEY CLUSTERED ([roleName] ASC);
GO

-- Creating primary key on [Id] in table 'movieListSet'
ALTER TABLE [dbo].[movieListSet]
ADD CONSTRAINT [PK_movieListSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'movieListEntrySet'
ALTER TABLE [dbo].[movieListEntrySet]
ADD CONSTRAINT [PK_movieListEntrySet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'personSet'
ALTER TABLE [dbo].[personSet]
ADD CONSTRAINT [PK_personSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'personInFilmEntrySet'
ALTER TABLE [dbo].[personInFilmEntrySet]
ADD CONSTRAINT [PK_personInFilmEntrySet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'filmEntrySet'
ALTER TABLE [dbo].[filmEntrySet]
ADD CONSTRAINT [PK_filmEntrySet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'characterSet'
ALTER TABLE [dbo].[characterSet]
ADD CONSTRAINT [PK_characterSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'actorDoingCharacterSet'
ALTER TABLE [dbo].[actorDoingCharacterSet]
ADD CONSTRAINT [PK_actorDoingCharacterSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'imageSet'
ALTER TABLE [dbo].[imageSet]
ADD CONSTRAINT [PK_imageSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'filmEntryHasGenreSet'
ALTER TABLE [dbo].[filmEntryHasGenreSet]
ADD CONSTRAINT [PK_filmEntryHasGenreSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'genreSet'
ALTER TABLE [dbo].[genreSet]
ADD CONSTRAINT [PK_genreSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [roleName] in table 'personRoleSet'
ALTER TABLE [dbo].[personRoleSet]
ADD CONSTRAINT [PK_personRoleSet]
    PRIMARY KEY CLUSTERED ([roleName] ASC);
GO

-- Creating primary key on [Id] in table 'imageSet_filmEntryImage'
ALTER TABLE [dbo].[imageSet_filmEntryImage]
ADD CONSTRAINT [PK_imageSet_filmEntryImage]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'imageSet_characterImage'
ALTER TABLE [dbo].[imageSet_characterImage]
ADD CONSTRAINT [PK_imageSet_characterImage]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'imageSet_personImage'
ALTER TABLE [dbo].[imageSet_personImage]
ADD CONSTRAINT [PK_imageSet_personImage]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'filmEntrySet_tvShow'
ALTER TABLE [dbo].[filmEntrySet_tvShow]
ADD CONSTRAINT [PK_filmEntrySet_tvShow]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'filmEntrySet_tvShowEpisode'
ALTER TABLE [dbo].[filmEntrySet_tvShowEpisode]
ADD CONSTRAINT [PK_filmEntrySet_tvShowEpisode]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'filmEntrySet_movie'
ALTER TABLE [dbo].[filmEntrySet_movie]
ADD CONSTRAINT [PK_filmEntrySet_movie]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [movieList_Id] in table 'movieListEntrySet'
ALTER TABLE [dbo].[movieListEntrySet]
ADD CONSTRAINT [FK_movieListmovieListEntry]
    FOREIGN KEY ([movieList_Id])
    REFERENCES [dbo].[movieListSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_movieListmovieListEntry'
CREATE INDEX [IX_FK_movieListmovieListEntry]
ON [dbo].[movieListEntrySet]
    ([movieList_Id]);
GO

-- Creating foreign key on [filmEntry_Id] in table 'movieListEntrySet'
ALTER TABLE [dbo].[movieListEntrySet]
ADD CONSTRAINT [FK_filmEntrymovieListEntry]
    FOREIGN KEY ([filmEntry_Id])
    REFERENCES [dbo].[filmEntrySet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_filmEntrymovieListEntry'
CREATE INDEX [IX_FK_filmEntrymovieListEntry]
ON [dbo].[movieListEntrySet]
    ([filmEntry_Id]);
GO

-- Creating foreign key on [user_Id] in table 'movieListSet'
ALTER TABLE [dbo].[movieListSet]
ADD CONSTRAINT [FK_usermovieList]
    FOREIGN KEY ([user_Id])
    REFERENCES [dbo].[userSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_usermovieList'
CREATE INDEX [IX_FK_usermovieList]
ON [dbo].[movieListSet]
    ([user_Id]);
GO

-- Creating foreign key on [filmEntry_Id] in table 'personInFilmEntrySet'
ALTER TABLE [dbo].[personInFilmEntrySet]
ADD CONSTRAINT [FK_filmEntryactorInFilmEntry]
    FOREIGN KEY ([filmEntry_Id])
    REFERENCES [dbo].[filmEntrySet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_filmEntryactorInFilmEntry'
CREATE INDEX [IX_FK_filmEntryactorInFilmEntry]
ON [dbo].[personInFilmEntrySet]
    ([filmEntry_Id]);
GO

-- Creating foreign key on [character_Id] in table 'actorDoingCharacterSet'
ALTER TABLE [dbo].[actorDoingCharacterSet]
ADD CONSTRAINT [FK_characteractorDoingCharacter]
    FOREIGN KEY ([character_Id])
    REFERENCES [dbo].[characterSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_characteractorDoingCharacter'
CREATE INDEX [IX_FK_characteractorDoingCharacter]
ON [dbo].[actorDoingCharacterSet]
    ([character_Id]);
GO

-- Creating foreign key on [filmEntry_Id] in table 'imageSet_filmEntryImage'
ALTER TABLE [dbo].[imageSet_filmEntryImage]
ADD CONSTRAINT [FK_filmEntryfilmEntryImage]
    FOREIGN KEY ([filmEntry_Id])
    REFERENCES [dbo].[filmEntrySet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_filmEntryfilmEntryImage'
CREATE INDEX [IX_FK_filmEntryfilmEntryImage]
ON [dbo].[imageSet_filmEntryImage]
    ([filmEntry_Id]);
GO

-- Creating foreign key on [character_Id] in table 'imageSet_characterImage'
ALTER TABLE [dbo].[imageSet_characterImage]
ADD CONSTRAINT [FK_charactercharacterImage]
    FOREIGN KEY ([character_Id])
    REFERENCES [dbo].[characterSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_charactercharacterImage'
CREATE INDEX [IX_FK_charactercharacterImage]
ON [dbo].[imageSet_characterImage]
    ([character_Id]);
GO

-- Creating foreign key on [actor_Id] in table 'imageSet_personImage'
ALTER TABLE [dbo].[imageSet_personImage]
ADD CONSTRAINT [FK_actoractorImage]
    FOREIGN KEY ([actor_Id])
    REFERENCES [dbo].[personSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_actoractorImage'
CREATE INDEX [IX_FK_actoractorImage]
ON [dbo].[imageSet_personImage]
    ([actor_Id]);
GO

-- Creating foreign key on [genre_Id] in table 'filmEntryHasGenreSet'
ALTER TABLE [dbo].[filmEntryHasGenreSet]
ADD CONSTRAINT [FK_genrefilmEntryHasGenre]
    FOREIGN KEY ([genre_Id])
    REFERENCES [dbo].[genreSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_genrefilmEntryHasGenre'
CREATE INDEX [IX_FK_genrefilmEntryHasGenre]
ON [dbo].[filmEntryHasGenreSet]
    ([genre_Id]);
GO

-- Creating foreign key on [filmEntry_Id] in table 'filmEntryHasGenreSet'
ALTER TABLE [dbo].[filmEntryHasGenreSet]
ADD CONSTRAINT [FK_filmEntryfilmEntryHasGenre]
    FOREIGN KEY ([filmEntry_Id])
    REFERENCES [dbo].[filmEntrySet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_filmEntryfilmEntryHasGenre'
CREATE INDEX [IX_FK_filmEntryfilmEntryHasGenre]
ON [dbo].[filmEntryHasGenreSet]
    ([filmEntry_Id]);
GO

-- Creating foreign key on [person_Id] in table 'personInFilmEntrySet'
ALTER TABLE [dbo].[personInFilmEntrySet]
ADD CONSTRAINT [FK_personpersonInFilmEntry]
    FOREIGN KEY ([person_Id])
    REFERENCES [dbo].[personSet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_personpersonInFilmEntry'
CREATE INDEX [IX_FK_personpersonInFilmEntry]
ON [dbo].[personInFilmEntrySet]
    ([person_Id]);
GO

-- Creating foreign key on [personRole_roleName] in table 'personInFilmEntrySet'
ALTER TABLE [dbo].[personInFilmEntrySet]
ADD CONSTRAINT [FK_personRolepersonInFilmEntry]
    FOREIGN KEY ([personRole_roleName])
    REFERENCES [dbo].[personRoleSet]
        ([roleName])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_personRolepersonInFilmEntry'
CREATE INDEX [IX_FK_personRolepersonInFilmEntry]
ON [dbo].[personInFilmEntrySet]
    ([personRole_roleName]);
GO

-- Creating foreign key on [personInFilmEntry_Id] in table 'actorDoingCharacterSet'
ALTER TABLE [dbo].[actorDoingCharacterSet]
ADD CONSTRAINT [FK_personInFilmEntryactorDoingCharacter]
    FOREIGN KEY ([personInFilmEntry_Id])
    REFERENCES [dbo].[personInFilmEntrySet]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_personInFilmEntryactorDoingCharacter'
CREATE INDEX [IX_FK_personInFilmEntryactorDoingCharacter]
ON [dbo].[actorDoingCharacterSet]
    ([personInFilmEntry_Id]);
GO

-- Creating foreign key on [tvShow_Id] in table 'filmEntrySet_tvShowEpisode'
ALTER TABLE [dbo].[filmEntrySet_tvShowEpisode]
ADD CONSTRAINT [FK_tvShowtvShowEpisode]
    FOREIGN KEY ([tvShow_Id])
    REFERENCES [dbo].[filmEntrySet_tvShow]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_tvShowtvShowEpisode'
CREATE INDEX [IX_FK_tvShowtvShowEpisode]
ON [dbo].[filmEntrySet_tvShowEpisode]
    ([tvShow_Id]);
GO

-- Creating foreign key on [role_roleName] in table 'userSet'
ALTER TABLE [dbo].[userSet]
ADD CONSTRAINT [FK_roleuser]
    FOREIGN KEY ([role_roleName])
    REFERENCES [dbo].[roleSet]
        ([roleName])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_roleuser'
CREATE INDEX [IX_FK_roleuser]
ON [dbo].[userSet]
    ([role_roleName]);
GO

-- Creating foreign key on [Id] in table 'imageSet_filmEntryImage'
ALTER TABLE [dbo].[imageSet_filmEntryImage]
ADD CONSTRAINT [FK_filmEntryImage_inherits_image]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[imageSet]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'imageSet_characterImage'
ALTER TABLE [dbo].[imageSet_characterImage]
ADD CONSTRAINT [FK_characterImage_inherits_image]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[imageSet]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'imageSet_personImage'
ALTER TABLE [dbo].[imageSet_personImage]
ADD CONSTRAINT [FK_personImage_inherits_image]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[imageSet]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'filmEntrySet_tvShow'
ALTER TABLE [dbo].[filmEntrySet_tvShow]
ADD CONSTRAINT [FK_tvShow_inherits_filmEntry]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[filmEntrySet]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'filmEntrySet_tvShowEpisode'
ALTER TABLE [dbo].[filmEntrySet_tvShowEpisode]
ADD CONSTRAINT [FK_tvShowEpisode_inherits_filmEntry]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[filmEntrySet]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Id] in table 'filmEntrySet_movie'
ALTER TABLE [dbo].[filmEntrySet_movie]
ADD CONSTRAINT [FK_movie_inherits_filmEntry]
    FOREIGN KEY ([Id])
    REFERENCES [dbo].[filmEntrySet]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------