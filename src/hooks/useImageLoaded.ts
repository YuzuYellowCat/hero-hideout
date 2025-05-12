import React from "react";

type UseImageLoadedType = () => [
    React.RefObject<HTMLImageElement | null>,
    boolean,
    () => void
];

const useImageLoaded: UseImageLoadedType = () => {
    const [loaded, setLoaded] = React.useState(false);
    const ref = React.useRef<HTMLImageElement>(null);

    const onLoad = () => {
        setLoaded(true);
    };

    React.useEffect(() => {
        if (ref.current && ref.current.complete) {
            onLoad();
        }
    });

    return [ref, loaded, onLoad];
};

export default useImageLoaded;
