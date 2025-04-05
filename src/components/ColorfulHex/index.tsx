import React, {
    useCallback,
    useEffect,
    createRef,
    useState,
    useMemo,
} from "react";
import "./index.css";

type FadePoint = {
    x: number;
    y: number;
    getColor: (opacity: number) => string;
    duration: number;
    frame: number;
    speed: number;
};

type CanvasSize = {
    width: number;
    height: number;
};

const ColorfulHex: React.FC = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const points: FadePoint[] = useMemo(() => [], []);
    const [context, setContext] = useState<CanvasRenderingContext2D>();
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const draw = useCallback(() => {
        if (!context) {
            return;
        }
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        for (const point of points) {
            const opacity = 1 - Math.min(point.frame / point.duration, 1);
            context.fillStyle = point.getColor(opacity);
            context.beginPath();
            context.arc(
                point.x,
                point.y,
                point.frame * point.speed,
                0,
                Math.PI * 2,
                false
            );
            context.fill();
            point.frame++;
        }
    }, [context, points]);

    const onMouseMove = useCallback(
        (event: MouseEvent) => {
            points.push({
                x: event.clientX,
                y: event.clientY,
                frame: 0,
                getColor: (opacity) => `rgba(0, 120, 120, ${opacity})`,
                duration: 50,
                speed: 1,
            });
        },
        [points]
    );

    const onClick = useCallback(
        (event: MouseEvent) => {
            points.push({
                x: event.clientX,
                y: event.clientY,
                frame: 0,
                getColor: (opacity) => `rgba(0, 255, 255, ${opacity})`,
                duration: 70,
                speed: 2,
            });
        },
        [points]
    );

    useEffect(() => {
        const potentialContext = canvasRef.current?.getContext("2d");
        if (potentialContext) {
            setContext(potentialContext);
        }
    }, [canvasRef]);

    useEffect(() => {
        let animationFrameId: number;

        const render = () => {
            draw();
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    useEffect(() => {
        const resizeListener = () => {
            setCanvasSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", resizeListener);
        window.addEventListener("click", onClick);
        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("resize", resizeListener);
            window.removeEventListener("click", onClick);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [onMouseMove, onClick]);

    return (
        <canvas
            className="hex"
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
        />
    );
};

export default ColorfulHex;
