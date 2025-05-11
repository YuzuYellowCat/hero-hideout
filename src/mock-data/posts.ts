import { GalleryID, AllCharactersID } from "appConstants";
import { CreditID } from "./authors";

type Post = {
    title: string;
    description?: string;
    date: number;
    image: {
        src: string;
        altText: string;
    };
    characters: AllCharactersID[];
    gallery?: GalleryID;
    credit: CreditID[];
    tags?: string[];
};

const Posts: Post[] = [
    {
        title: "Bi Pride!",
        date: 1685668560,
        image: {
            src: "images/posts/2023-6-1_tidalcats.png",
            altText:
                "A yellow cat holding a rainbow flag, draped in a bisexual flag. He is surrounded by sparkles.",
        },
        characters: ["yuzu"],
        gallery: "comms",
        credit: ["tidalcats"],
        tags: ["bisexual"],
    },
    {
        title: "Lemon Cat",
        date: 1691198160,
        image: {
            src: "images/posts/2023-8-4_lalarke.png",
            altText:
                "A yellow cat with a backwards teal hat smiles, tossing a lemon in his left hand.",
        },
        characters: ["yuzu"],
        gallery: "comms",
        credit: ["lalarke"],
    },
];

export default Posts;
