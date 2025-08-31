PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS Credits;
DROP TABLE IF EXISTS CreditLinks;
DROP TABLE IF EXISTS PostCredits;
DROP TABLE IF EXISTS PostImages;
DROP TABLE IF EXISTS Characters;
DROP TABLE IF EXISTS PostCharacters;
DROP TABLE IF EXISTS Posts;

PRAGMA foreign_keys = ON;

-- INSERT INTO Galleries (Name) VALUES
--     ('Fursuit'),
--     ('Commissions'),
--     ('My Drawings');

CREATE TABLE IF NOT EXISTS Posts (
    PostId TEXT PRIMARY KEY, 
    Title TEXT NOT NULL,
    Description TEXT,
    Date INTEGER NOT NULL,
    IsNSFW BOOLEAN NOT NULL CHECK (IsNSFW IN (0, 1)),
    Type TEXT NOT NULL, -- Commission, Art, or Fursuit
    Tags TEXT -- Comma separated set of strings
);

-- INSERT INTO Posts (Title, Date, IsNSFW, GalleryId) VALUES 
--     ('Test Post 1 DW', strftime('%s', 'now'), 0, 2),
--     ('Test Post 2 Mercurial', strftime('%s', 'now'), 0, 2);


CREATE TABLE IF NOT EXISTS Credits (
    CreditId TEXT PRIMARY KEY, 
    Name TEXT NOT NULL,
    Color TEXT NOT NULL,
    UNIQUE (CreditId, Name)
);

-- INSERT INTO Credits (CreditName) VALUES
--     ('imdanuki');

CREATE TABLE IF NOT EXISTS CreditLinks (
    CreditId TEXT NOT NULL,
    Type TEXT NOT NULL, -- Bluesky, Etc?
    Url TEXT NOT NULL,
    FOREIGN KEY (CreditId) REFERENCES Credits(CreditId) ON DELETE CASCADE,
    UNIQUE (CreditId, Type, Url)
);

-- INSERT INTO CreditLinks (CreditId, Type, Link) VALUES
--     (last_insert_rowid(), 'Bluesky', 'https://bsky.app/profile/imdanuki.bsky.social');

CREATE TABLE IF NOT EXISTS PostCredits (
    PostId TEXT NOT NULL,
    CreditId TEXT NOT NULL,
    Contribution TEXT NOT NULL,
    IsPrimary BOOLEAN,
    FOREIGN KEY (PostId) REFERENCES Posts(PostId) ON DELETE CASCADE,
    FOREIGN KEY (CreditId) REFERENCES Credits(CreditId) ON DELETE CASCADE,
    UNIQUE (PostId, CreditId)
);

-- INSERT INTO PostCredits (PostId, CreditId) VALUES
--     (1, 1),
--     (2, 1);

CREATE TABLE IF NOT EXISTS PostImages (
    ImageName TEXT PRIMARY KEY, 
    PostId TEXT NOT NULL,
    AltText TEXT NOT NULL,
    IsCover BOOLEAN NOT NULL CHECK (IsCover IN (0, 1)),
    FOREIGN KEY (PostId) REFERENCES Posts(PostId) ON DELETE CASCADE
);

-- INSERT INTO PostImages (PostId, ImageName, AltText, IsCover) VALUES
--     (1, 'cool-image-1.png', 'DawnWhisker doing stuff', 1),
--     (2, 'cool-img2.jpg', 'Mercurial doing stuff', 1);

CREATE TABLE IF NOT EXISTS Characters (
    CharacterId TEXT PRIMARY KEY,
    CreditId TEXT,
    Name TEXT NOT NULL,
    Color TEXT NOT NULL,
    ImageName TEXT,
    IsGuest BOOLEAN NOT NULL CHECK (IsGuest IN (0, 1)),
    FOREIGN KEY (CreditId) REFERENCES Credits(CreditId) ON DELETE CASCADE
    UNIQUE (Name)
);

-- INSERT INTO Characters (Name, Color, IsGuest) VALUES
--     ('DawnWhisker', '#1b86a7', 0),
--     ('Mercurial', '#ba0203', 0);

CREATE TABLE IF NOT EXISTS PostCharacters (
    PostId TEXT NOT NULL,
    CharacterId TEXT NOT NULL,
    FOREIGN KEY (PostId) REFERENCES Posts(PostId) ON DELETE CASCADE,
    FOREIGN KEY (CharacterId) REFERENCES Characters(CharacterId) ON DELETE CASCADE,
    UNIQUE (PostId, CharacterId)
);

-- INSERT INTO PostCharacters (PostId, CharacterId) VALUES
--     (1, 1),
--     (2, 2);