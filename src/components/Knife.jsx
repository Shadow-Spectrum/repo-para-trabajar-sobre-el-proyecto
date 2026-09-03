import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Knife() {
  const groupRef = useRef();
  const { scene } = useGLTF("/models/weapon_knife_karambit.glb");

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const gammaTexture = textureLoader.load(
      "/models/karambit_black_laminate_rough_psd_2e010018.png" 
    );

    gammaTexture.flipY = false;
    gammaTexture.colorSpace = THREE.SRGBColorSpace;

    scene.traverse((child) => {
      if (!child.isMesh) return;

      if (child.material) {
        child.material = child.material.clone();
        child.material.map = gammaTexture;
        child.material.metalness = 1;
        child.material.roughness = 0.18;
        child.material.envMapIntensity = 3.5;
        child.material.clearcoat = 1.2;
        child.material.clearcoatRoughness = 0.08;
        child.material.emissive = new THREE.Color("#0a1526");
        child.material.emissiveIntensity = 0.6;
        child.material.normalScale = new THREE.Vector2(1.2, 1.2);
      }

      child.material.needsUpdate = true;
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.7 + Math.PI;
    groupRef.current.rotation.x = -0.32;
    groupRef.current.rotation.z = -0.1;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
  });

  return (
    <group ref={groupRef} scale={1.35} position={[0, -0.05, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/weapon_knife_karambit.glb");