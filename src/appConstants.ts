import DawnWhiskerRefContents from "ref-contents/DawnWhisker";
import MercurialRefContents from "ref-contents/Mercurial";

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

/**
 * Character Types & Constants
 */

export type CharacterInfo = {
    name: string;
    RefContents: React.ComponentType;
    color: string;
};

type CharactersType = {
    [key: string]: CharacterInfo;
};

export const Characters: CharactersType = {
    dawnwhisker: {
        name: "DawnWhisker",
        RefContents: DawnWhiskerRefContents,
        color: "#1b86a7",
    },
    mercurial: {
        name: "Mercurial",
        RefContents: MercurialRefContents,
        color: "#ba0203",
    },
    // For testing the placeholder img
    // placeholder: {
    //     name: "Placeholder",
    //     RefContents: MercurialRefContents,
    //     color: "#b4db3d",
    // },
};

export type CharacterID = keyof typeof Characters;
