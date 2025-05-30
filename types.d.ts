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
    creditIds?: string[];
    altText: string;
};

type CreditsPOST = {
    creditId: string;
    name: string;
    links: {
        [key: string]: string;
    };
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
