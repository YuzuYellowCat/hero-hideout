import DawnWhiskerRefContents from "ref-contents/DawnWhisker";
import MercurialRefContents from "ref-contents/Mercurial";
import YuzuRefContents from "ref-contents/Yuzu";

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
    color: string;
};

export type MyCharacterInfo = CharacterInfo & {
    RefContents: React.ComponentType;
};

type MyCharactersType = {
    [key: string]: MyCharacterInfo;
};

export const MyCharacters: MyCharactersType = {
    yuzu: {
        name: "Yuzu",
        color: "#ffe76b",
        RefContents: YuzuRefContents,
    },
    dawnwhisker: {
        name: "DawnWhisker",
        color: "#1b86a7",
        RefContents: DawnWhiskerRefContents,
    },
    mercurial: {
        name: "Mercurial",
        color: "#ba0203",
        RefContents: MercurialRefContents,
    },
    // For testing the placeholder img
    // placeholder: {
    //     name: "Placeholder",
    //     RefContents: MercurialRefContents,
    //     color: "#b4db3d",
    // },
};

type GuestCharactersType = {
    [key: string]: CharacterInfo;
};

export const GuestCharacters: GuestCharactersType = {
    turbo_wolf: {
        name: "Turbo Wolf",
        color: "#28334a",
    },
};

export const AllCharacters = {
    ...GuestCharacters,
    ...MyCharacters,
};

export type MyCharacterID = keyof typeof MyCharacters;

export type AllCharactersID = keyof typeof AllCharacters;
