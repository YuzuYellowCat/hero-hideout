import { GalleryID, AllCharactersID } from "appConstants";
import { CreditID } from "./authors";

type Post = {
    title: string;
    description?: string;
    date: number;
    images: {
        src: string;
        altText: string;
        primary?: boolean;
    }[];
    characters: AllCharactersID[];
    gallery?: GalleryID;
    credits: CreditID[];
    tags?: string[];
    isNSFW: boolean;
};

const Posts: Post[] = [
    {
        title: "Bi Pride!",
        date: 1685668560,
        images: [
            {
                src: "images/posts/2023-6-1_tidalcats.png",
                altText:
                    "A yellow cat holding a rainbow flag, draped in a bisexual flag. He is surrounded by sparkles.",
            },
        ],
        characters: ["yuzu"],
        gallery: "comms",
        credits: ["tidalcats"],
        isNSFW: false,
    },
    {
        title: "Lemon Cat",
        date: 1691198160,
        images: [
            {
                src: "images/posts/2023-8-4_lalarke.png",
                altText:
                    "A yellow cat with a backwards teal hat smiles, tossing a lemon in his left hand.",
            },
        ],
        characters: ["yuzu"],
        gallery: "comms",
        credits: ["lalarke"],
        isNSFW: false,
    },
    {
        title: "Yuzu Badge",
        date: 1691345760,
        images: [
            {
                src: "images/posts/2023-8-6_tidalcats.png",
                altText:
                    'A yellow cat with a backwards black hat smiles, in front of a climbing carabiner and citrus fruits. The word "Yuzu" is displayed at the bottom in orange.',
            },
        ],
        characters: ["yuzu"],
        gallery: "comms",
        credits: ["tidalcats"],
        isNSFW: false,
    },
    {
        title: "Yuzu Gremlin",
        date: 1691345760,
        images: [
            {
                src: "images/posts/2023-9-4_aussiekitten_gremlin(gif).gif",
                altText:
                    "A yellow cat with a black hat vibrates, like a gremlin",
            },
        ],
        characters: ["yuzu"],
        gallery: "comms",
        credits: ["aussiekitten"],
        isNSFW: false,
    },
    {
        title: "Yuzu Popcat",
        date: 1691345760,
        images: [
            {
                src: "images/posts/2023-9-4_aussiekitten_popcat.gif",
                altText:
                    "A yellow cat with a black hat opens and closes his mouth",
            },
        ],
        characters: ["yuzu"],
        gallery: "comms",
        credits: ["aussiekitten"],
        isNSFW: false,
    },
    {
        title: "Yuzu Coffee",
        date: 1694456160,
        images: [
            {
                src: "images/posts/2023-9-11_doqqo_png.png",
                altText: "...",
            },
        ],
        characters: ["yuzu"],
        gallery: "comms",
        credits: ["doqqo"],
        isNSFW: false,
    },
];

export default Posts;
