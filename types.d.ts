type PostType = "Commission" | "Art" | "Fursuit";

type BasePost = {
    postId: string;
    title: string;
    description?: string;
    tags?: string;
    type: PostType;
    isNSFW: boolean;
    characterIds?: string[];
    credits?: { [creditId: string]: string };
    altText: string;
};

type Post = BasePost & {
    imageName: string;
    date: Date;
    credits?: {
        [creditId: string]: {
            contribution: string;
            isPrimary?: boolean;
        };
    };
};

type PostsPOST = BasePost & {
    file: File;
    date?: number;
};

type CreditPOST = Credit & {
    createCharacter?: boolean;
    characterName?: string;
};

type Credit = {
    creditId: string;
    name: string;
    color: string;
    links: {
        [key: string]: string;
    };
    characters?: Character[];
};

type PostCredit = {
    creditId: string;
    name: string;
    contribution: string;
};

type CreditLink = {
    type: string;
    url: string;
};

type CharactersPOST = {
    characterId: string;
    name: string;
    file?: File;
    color: string;
    isGuest: boolean;
    creditId?: string;
};

type Character = {
    characterId: string;
    name: string;
    image?: string;
    color: string;
    isGuest: boolean;
};

type PostImage = {
    image: string;
    postId: string;
    altText: string;
    isCover: boolean;
};

type GalleryPost = {};
