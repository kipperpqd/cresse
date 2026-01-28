'use client'

import { useRef, useState } from 'react'
import { Text, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MetalPlateProps {
    position: [number, number, number];
    year: string;
    president: string;
    onClick?: () => void;
}

export function MetalPlate({ position, year, president, onClick }: MetalPlateProps) {
    const mesh = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        // Subtle floating animation
        mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
    })

    return (
        <group position={position} onClick={onClick}>
            {/* Plate Body */}
            <RoundedBox
                ref={mesh}
                args={[3, 2, 0.1]} // Width, Height, Depth
                radius={0.1}
                smoothness={4}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <meshStandardMaterial
                    color={hovered ? "#FFFACD" : "#FFD700"} // LemonChiffon hover, Gold default
                    metalness={0.9}
                    roughness={0.2}
                    envMapIntensity={2}
                />
            </RoundedBox>

            {/* Engraved Text - Year */}
            <Text
                position={[position[0], position[1] + 0.5, position[2] + 0.16]}
                fontSize={0.4}
                color="#332200"
                anchorX="center"
                anchorY="middle"
            >
                {year}
            </Text>

            {/* Engraved Text - President */}
            <Text
                position={[position[0], position[1] - 0.2, position[2] + 0.16]}
                fontSize={0.2}
                color="#1a1a1a"
                anchorX="center"
                anchorY="middle"
                maxWidth={2.5}
                textAlign="center"
            >
                {president}
            </Text>

            {/* Screws/Rivets */}
            <mesh position={[position[0] - 1.3, position[1] + 0.8, position[2] + 0.05]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[position[0] + 1.3, position[1] + 0.8, position[2] + 0.05]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[position[0] - 1.3, position[1] - 0.8, position[2] + 0.05]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[position[0] + 1.3, position[1] - 0.8, position[2] + 0.05]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0.1} />
            </mesh>
        </group>
    )
}
