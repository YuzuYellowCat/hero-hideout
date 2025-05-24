type PostsPOST = {
    file: File;
    name: string;
    description: string;
    isNSFW: boolean;
};

type CreditsPOST = {
    name: string;
    links: CreditLink[];
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
