import * as THREE from '/three.module.min.js';

// [1] Scene
const scene = new THREE.Scene();

// [2] Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(
    75,
    aspect.width / aspect.height,
    1,
    2000
);
camera.position.z = 3;
scene.add(camera);

// [4] Renderer
// Select the `Canvas` element
const canvas = document.querySelector(".draw");
// Add the `WebGLRenderer`
const renderer = new THREE.WebGLRenderer({ canvas });
// Renderer size
renderer.setSize(aspect.width, aspect.height);
// Display what the camera in the scene captured
renderer.render(scene, camera);