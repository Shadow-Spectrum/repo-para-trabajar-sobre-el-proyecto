import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Knife() {
  const { scene } = useGLTF("/models/weapon_knife_karambit.glb");

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    const gammaTexture = textureLoader.load(
      "/models/weapon_knife_karambit_am_gamma_doppler_phase2_heavy.png"
    );

    gammaTexture.flipY = false;
    gammaTexture.colorSpace = THREE.SRGBColorSpace;

    scene.traverse((child) => {
      if (!child.isMesh) return;

      console.log("Mesh:", child.name);
      console.log({
        map: child.material.map,
        normalMap: child.material.normalMap,
        roughnessMap: child.material.roughnessMap,
        metalnessMap: child.material.metalnessMap,
        aoMap: child.material.aoMap,
      });

      child.material.map = gammaTexture;
      child.material.needsUpdate = true;
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      rotation={[0, Math.PI, 0]}
    />
  );
}

useGLTF.preload("/models/weapon_knife_karambit.glb");