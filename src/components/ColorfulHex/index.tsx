import React, { useCallback, useEffect, createRef, useState, MouseEventHandler, useMemo } from "react"
import "./index.css"

type FadePoint = {
    x: number;
    y: number;
    getColor: (opacity: number) => string;
    duration: number;
    frame: number;
    speed: number;
}

type CanvasSize = {
    width: number;
    height: number;
}

const ColorfulHex: React.FC = () => {
    const canvasRef = createRef<HTMLCanvasElement>();
    const points: FadePoint[] = useMemo(() => [], []);
    const [context, setContext] = useState<CanvasRenderingContext2D>();
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const draw = useCallback(() => {
        if (!context) { return; }
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        for (const point of points) {
            const opacity = 1 - Math.min(point.frame / point.duration, 1);
            context.fillStyle = point.getColor(opacity);
            context.beginPath()
            context.arc(point.x, point.y, point.frame * point.speed, 0, Math.PI * 2, false);
            context.fill()
            point.frame++;
        }
      }, [context, points]);

    useEffect(() => {
        const potentialContext = canvasRef.current?.getContext('2d');
        if (potentialContext) {
            setContext(potentialContext)
        }
    }, [canvasRef])

    useEffect(() => {
        let animationFrameId: number;
    
        const render = () => {
            draw()
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()
        
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw]);

    useEffect(() => {
        const resizeListener = () => {
            setCanvasSize({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    const onMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        points.push(
            {
                x: event.clientX,
                y: event.clientY,
                frame: 0,
                getColor: (opacity) => `rgba(120, 120, 0, ${opacity})`,
                duration: 50,
                speed: 1,
            }
        )
    }, [points]);

    const onClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        points.push(
            {
                x: event.clientX,
                y: event.clientY,
                frame: 0,
                getColor: (opacity) => `rgba(255, 255, 0, ${opacity})`,
                duration: 70,
                speed: 2,
            }
        )
    }, [points])

    return (
        <canvas className="hex" ref={canvasRef} width={canvasSize.width} height={canvasSize.height} onMouseMove={onMouseMove} onClick={onClick} />
    )
}

export default ColorfulHex;