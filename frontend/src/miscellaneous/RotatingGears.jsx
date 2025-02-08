import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const Gear = ({ position, rotationSpeed, size }) => {
    const gearRef = useRef();

    useFrame(() => {
        gearRef.current.rotation.z += rotationSpeed; // Rotate like a machine gear
    });

    return (
        <mesh ref={gearRef} position={position}>
            <torusGeometry args={size} />
            <meshStandardMaterial color="gray" metalness={1} roughness={0.3} />
        </mesh>
    );
};

const RotatingGears = () => {
    return (
        <Canvas
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100vw",
                height: "100vh",
                zIndex: 2,
            }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Large Gear */}
            <Gear position={[0, 0, 0]} rotationSpeed={0.02} size={[3, 0.3, 16, 100]} />

            {/* Small Gear attached to Large Gear */}
            <Gear position={[2, 2, 0]} rotationSpeed={-0.04} size={[1.5, 0.2, 16, 100]} />

            <OrbitControls enableZoom={false} />
        </Canvas>
    );
};

export default RotatingGears;
