/**
 * Header
 */
export const HeaderLinks = {
    Home: "/",
    About: "/about",
    Characters: "/characters",
};

/**
 * Gallery Types & Constants
 */
export type GalleryInfo = {
    title: string;
    placeholder: string;
};

type GalleriesType = {
    [key: string]: GalleryInfo;
};

export const Galleries: GalleriesType = {
    "fursuit-pictures": {
        title: "Fursuit Pictures",
        placeholder: "cat-placeholder.png",
    },
    drawings: {
        title: "Drawings",
        placeholder: "drawing-placeholder.jpeg",
    },
    comms: {
        title: "Commissions",
        placeholder: "comms-placeholder.jpeg",
    },
};

export type GalleryID = keyof typeof Galleries;
