import { CharacterID, GalleryID } from "appConstants";

type Post = {
    title: string;
    description: string;
    date: number;
    image: {
        src: string;
        altText: string;
    };
    characters: CharacterID[];
    gallery?: GalleryID;
    tags: string[];
};

const Posts: Post[] = [
    {
        title: "Test Post",
        description: "Posing like a cool cat",
        date: 1746846790,
        image: { src: "images/cat-placeholder.png", altText: "" },
        characters: ["dawnwhisker"],
        gallery: "fursuit-pictures",
        tags: [],
    },
];

export default Posts;
