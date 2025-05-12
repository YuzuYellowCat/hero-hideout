export type Credit = {
    name: string;
    link: string;
};

type CreditsType = {
    [key: string]: Credit;
};

export const CreditList: CreditsType = {
    tidalcats: {
        name: "tidalcats",
        link: "https://x.com/tidalcats",
    },
    lalarke: {
        name: "lalarke",
        link: "https://bsky.app/profile/larke.bsky.social",
    },
    imdanuki: {
        name: "imdanuki",
        link: "https://bsky.app/profile/imdanuki.bsky.social",
    },
    aussiekitten: {
        name: "AussieKitten",
        link: "https://bsky.app/profile/aussiekitten.com",
    },
};

export type CreditID = keyof typeof CreditList;
