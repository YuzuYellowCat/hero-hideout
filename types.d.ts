type PostsPOST = {
    file: File;
    postId: string;
    title: string;
    date?: number;
    description?: string;
    tags?: string;
    type: "Commission" | "Art" | "Fursuit";
    isNSFW: boolean;
    characterIds?: string[];
    credits?: { [creditId: string]: string };
    altText: string;
};

type Credit = {
    creditId: string;
    name: string;
    links?: {
        [key: string]: string;
    };
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
};

type Character = {
    characterId: string;
    name: string;
    image: string;
    color: string;
    isGuest: boolean;
};

type PostImage = {
    image: string;
    postId: string;
    altText: string;
    isCover: boolean;
};
