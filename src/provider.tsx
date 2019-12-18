import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { VFXContext } from "./context";
import VFXPlayer from "./vfx-player";

const canvasStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    pointerEvents: "none"
};

export interface VFXProviderProps {
    children?: any; // 😣 https://github.com/DefinitelyTyped/DefinitelyTyped/issues/27805
}

export const VFXProvider: React.FC<VFXProviderProps> = props => {
    const [player, setPlayer] = useState<VFXPlayer | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current == null) {
            return;
        }

        const player = new VFXPlayer(canvasRef.current);
        setPlayer(player);

        player.play();

        return () => {
            player.stop();
        };
    }, [canvasRef]);

    return (
        <>
            <canvas ref={canvasRef} style={canvasStyle as any} />
            <VFXContext.Provider value={player}>
                {props.children}
            </VFXContext.Provider>
        </>
    );
};

export default VFXProvider;