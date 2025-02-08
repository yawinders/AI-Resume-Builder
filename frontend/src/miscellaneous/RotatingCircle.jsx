import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const RotatingCircle = () => {
    const ringRef = useRef();

    useFrame(() => {
        ringRef.current.rotation.y += 0.02; // Rotates around the login box
    });

    return (
        <mesh ref={ringRef} position={[0, 0, 0]}>
            <torusGeometry args={[3, 0.1, 16, 100]} />
            <meshStandardMaterial color="blue" emissive="cyan" emissiveIntensity={1.5} />
        </mesh>
    );
};

const CircleCanvas = () => {
    return (
        <Canvas
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100vw",
                height: "100vh",
                zIndex: 1,
            }}
        >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <RotatingCircle />
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
};

export default CircleCanvas;
