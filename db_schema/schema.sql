DROP TABLE IF EXISTS Galleries;
CREATE TABLE IF NOT EXISTS Galleries (
    GalleryId INTEGER PRIMARY KEY AUTOINCREMENT, 
    Name TEXT NOT NULL,
    UNIQUE (Name)
);

INSERT INTO Galleries (Name) VALUES
    ('Fursuit'),
    ('Commissions'),
    ('My Drawings');

DROP TABLE IF EXISTS Posts;
CREATE TABLE IF NOT EXISTS Posts (
    PostId INTEGER PRIMARY KEY AUTOINCREMENT, 
    Title TEXT NOT NULL,
    Description TEXT,
    Date INTEGER NOT NULL,
    IsNSFW BOOLEAN NOT NULL CHECK (IsNSFW IN (0, 1)),
    GalleryId INTEGER,
    CoverImageId INTEGER NOT NULL,
    FOREIGN KEY (GalleryId) REFERENCES Galleries(GalleryId),
    FOREIGN KEY (CoverImageId) REFERENCES PostImages(ImageId)
);

INSERT INTO Posts (Title, Date, IsNSFW, GalleryId, CoverImageId) VALUES 
    ('Test Post 1 DW', strftime('%s', 'now'), 0, 2, 1),
    ('Test Post 2 Mercurial', strftime('%s', 'now'), 0, 2, 2);


DROP TABLE IF EXISTS Credits;
CREATE TABLE IF NOT EXISTS Credits (
    CreditId INTEGER PRIMARY KEY AUTOINCREMENT, 
    CreditName TEXT NOT NULL,
    UNIQUE (CreditId, CreditName)
);

INSERT INTO Credits (CreditName) VALUES
    ('imdanuki');

DROP TABLE IF EXISTS CreditLinks;
DROP TABLE IF EXISTS CreditsLinks;
CREATE TABLE IF NOT EXISTS CreditLinks (
    CreditId INTEGER NOT NULL,
    Type TEXT NOT NULL,
    Link TEXT NOT NULL,
    FOREIGN KEY (CreditId) REFERENCES Credits(CreditId),
    UNIQUE (CreditId, Type, Link)
);

INSERT INTO CreditLinks (CreditId, Type, Link) VALUES
    (last_insert_rowid(), 'Bluesky', 'https://bsky.app/profile/imdanuki.bsky.social');

DROP TABLE IF EXISTS PostCredits;
CREATE TABLE IF NOT EXISTS PostCredits (
    PostId INTEGER NOT NULL,
    CreditId INTEGER NOT NULL,
    FOREIGN KEY (PostId) REFERENCES Posts(PostId),
    FOREIGN KEY (CreditId) REFERENCES Credits(CreditId),
    UNIQUE (PostId, CreditId)
);

INSERT INTO PostCredits (PostId, CreditId) VALUES
    (1, 1),
    (2, 1);

DROP TABLE IF EXISTS PostImages;
CREATE TABLE IF NOT EXISTS PostImages (
    ImageId INTEGER PRIMARY KEY AUTOINCREMENT, 
    PostId INTEGER NOT NULL,
    Blob BLOB NOT NULL,
    AltText Text NOT NULL,
    FOREIGN KEY (PostId) REFERENCES Posts(PostId),
    UNIQUE (Blob)
);

INSERT INTO PostImages (PostId, Blob, AltText) VALUES
    (1, 'blob-1', 'DawnWhisker doing stuff'),
    (2, 'blob-2', 'Mercurial doing stuff');

DROP TABLE IF EXISTS Characters;
CREATE TABLE IF NOT EXISTS Characters (
    CharacterId INTEGER PRIMARY KEY AUTOINCREMENT, 
    Name TEXT NOT NULL,
    Color TEXT,
    IsGuest BOOLEAN NOT NULL CHECK (IsGuest IN (0, 1)),
    UNIQUE (Name)
);

INSERT INTO Characters (Name, Color, IsGuest) VALUES
    ('DawnWhisker', '#1b86a7', 0),
    ('Mercurial', '#ba0203', 0);

DROP TABLE IF EXISTS PostCharacters;
CREATE TABLE IF NOT EXISTS PostCharacters (
    PostId INTEGER NOT NULL,
    CharacterId INTEGER NOT NULL,
    FOREIGN KEY (PostId) REFERENCES Posts(PostId),
    FOREIGN KEY (CharacterId) REFERENCES Credits(CharacterId),
    UNIQUE (PostId, CharacterId)
);

INSERT INTO PostCharacters (PostId, CharacterId) VALUES
    (1, 1),
    (2, 2);