PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS Galleries;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Credits;
DROP TABLE IF EXISTS CreditLinks;
DROP TABLE IF EXISTS PostCredits;
DROP TABLE IF EXISTS PostImages;
DROP TABLE IF EXISTS Characters;
DROP TABLE IF EXISTS PostCharacters;

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Galleries (
    GalleryId INTEGER PRIMARY KEY AUTOINCREMENT, 
    Name TEXT NOT NULL,
    UNIQUE (Name)
);

-- INSERT INTO Galleries (Name) VALUES
--     ('Fursuit'),
--     ('Commissions'),
--     ('My Drawings');

CREATE TABLE IF NOT EXISTS Posts (
    PostId INTEGER PRIMARY KEY AUTOINCREMENT, 
    Title TEXT NOT NULL,
    Description TEXT,
    Date INTEGER NOT NULL,
    IsNSFW BOOLEAN NOT NULL CHECK (IsNSFW IN (0, 1)),
    GalleryId INTEGER,
    FOREIGN KEY (GalleryId) REFERENCES Galleries(GalleryId)
);

-- INSERT INTO Posts (Title, Date, IsNSFW, GalleryId) VALUES 
--     ('Test Post 1 DW', strftime('%s', 'now'), 0, 2),
--     ('Test Post 2 Mercurial', strftime('%s', 'now'), 0, 2);


CREATE TABLE IF NOT EXISTS Credits (
    CreditId INTEGER PRIMARY KEY AUTOINCREMENT, 
    CreditName TEXT NOT NULL,
    UNIQUE (CreditId, CreditName)
);

-- INSERT INTO Credits (CreditName) VALUES
--     ('imdanuki');

CREATE TABLE IF NOT EXISTS CreditLinks (
    CreditId INTEGER NOT NULL,
    Type TEXT NOT NULL,
    Link TEXT NOT NULL,
    FOREIGN KEY (CreditId) REFERENCES Credits(CreditId) ON DELETE CASCADE,
    UNIQUE (CreditId, Type, Link)
);

-- INSERT INTO CreditLinks (CreditId, Type, Link) VALUES
--     (last_insert_rowid(), 'Bluesky', 'https://bsky.app/profile/imdanuki.bsky.social');

CREATE TABLE IF NOT EXISTS PostCredits (
    PostId INTEGER NOT NULL,
    CreditId INTEGER NOT NULL,
    FOREIGN KEY (PostId) REFERENCES Posts(PostId) ON DELETE CASCADE,
    FOREIGN KEY (CreditId) REFERENCES Credits(CreditId) ON DELETE CASCADE,
    UNIQUE (PostId, CreditId)
);

-- INSERT INTO PostCredits (PostId, CreditId) VALUES
--     (1, 1),
--     (2, 1);

CREATE TABLE IF NOT EXISTS PostImages (
    ImageId INTEGER PRIMARY KEY AUTOINCREMENT, 
    PostId INTEGER NOT NULL,
    ImageName TEXT NOT NULL,
    AltText Text NOT NULL,
    IsCover BOOLEAN NOT NULL CHECK (IsCover IN (0, 1)),
    FOREIGN KEY (PostId) REFERENCES Posts(PostId) ON DELETE CASCADE,
    UNIQUE (ImageName)
);

-- INSERT INTO PostImages (PostId, ImageName, AltText, IsCover) VALUES
--     (1, 'cool-image-1.png', 'DawnWhisker doing stuff', 1),
--     (2, 'cool-img2.jpg', 'Mercurial doing stuff', 1);

CREATE TABLE IF NOT EXISTS Characters (
    CharacterId INTEGER PRIMARY KEY AUTOINCREMENT, 
    Name TEXT NOT NULL,
    Color TEXT,
    IsGuest BOOLEAN NOT NULL CHECK (IsGuest IN (0, 1)),
    UNIQUE (Name)
);

-- INSERT INTO Characters (Name, Color, IsGuest) VALUES
--     ('DawnWhisker', '#1b86a7', 0),
--     ('Mercurial', '#ba0203', 0);

CREATE TABLE IF NOT EXISTS PostCharacters (
    PostId INTEGER NOT NULL,
    CharacterId INTEGER NOT NULL,
    FOREIGN KEY (PostId) REFERENCES Posts(PostId) ON DELETE CASCADE,
    FOREIGN KEY (CharacterId) REFERENCES Characters(CharacterId) ON DELETE CASCADE,
    UNIQUE (PostId, CharacterId)
);

-- INSERT INTO PostCharacters (PostId, CharacterId) VALUES
--     (1, 1),
--     (2, 2);