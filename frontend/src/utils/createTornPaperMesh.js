// createTornPaperMesh.js
import * as THREE from "three";

export function createTornPaperMesh(texture) {
  const geo = new THREE.PlaneGeometry(0.8, 0.5, 12, 12);

  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    // Distort border vertices for torn edges
    const edge = Math.abs(v.x) > 0.35 || Math.abs(v.y) > 0.2;
    if (edge) {
      const noiseX = (Math.random() - 0.5) * 0.1;
      const noiseY = (Math.random() - 0.5) * 0.1;
      v.x += noiseX;
      v.y += noiseY;
    }

    // Slight twist / crumple
    const wave = Math.sin(v.x * 6) * 0.03 + Math.sin(v.y * 8) * 0.03;
    v.z += wave;

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    map: texture || null,
    color: 0xf5f5f0,
    roughness: 0.9,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.rotation.x = -Math.PI / 2;

  return mesh;
}
