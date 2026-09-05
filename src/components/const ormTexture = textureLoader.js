const ormTexture = textureLoader.load(
  "/models/default_ao_tga_559f1ac6_orm_436516294.png"
);

ormTexture.flipY = false;

scene.traverse((child) => {
  if (!child.isMesh) return;

  child.material = child.material.clone();
  child.material.aoMap = ormTexture;
  child.material.roughnessMap = ormTexture;
  child.material.metalnessMap = ormTexture;

  child.material.metalness = 1;
  child.material.roughness = 0.5;
  child.material.needsUpdate = true;
});