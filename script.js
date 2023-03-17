import * as THREE from '/three.module.min.js';
import { OrbitControls } from "./OrbitControls.js";
import * as dat from "/node_modules/dat.gui/build/dat.gui.module.js";

// [1] Scene
const scene = new THREE.Scene();

const gui = new dat.GUI();

const materialColor = {
    color: 0xffffff,
};

// Lights

// AmbientLight
// const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
// scene.add(ambientLight);
// gui.add(ambientLight, "intensity", 0, 1, 0.01);

// DirectionalLight
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
directionalLight.position.set(0, 5, 5);
scene.add(directionalLight);
gui.add(directionalLight, "intensity", 0, 1, 0.01);
gui.add(directionalLight.position, "x", -3, 3, 0.01);
gui.add(directionalLight.position, "y", -3, 3, 0.01);

// Responsive
window.addEventListener("resize", () => {
    // New size
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    // New aspect ratio
    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    // New render size
    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// [2] Object

// Mesh
const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
console.log(geometry);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 10;
scene.add(camera);

// [4] Renderer
// Select the `Canvas` element
const canvas = document.querySelector(".draw");
// Add the `WebGLRenderer`
const renderer = new THREE.WebGLRenderer({ canvas });
// Renderer size
renderer.setSize(aspect.width, aspect.height);

// `OrbitControls`
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// `Clock` class
const clock = new THREE.Clock();

// Animate
const animate = () => {
    // `getElapsedTime`
    const elapsedTime = clock.getElapsedTime();

    // Update `OrbitControls`
    orbitControls.update();

    // Renderer
    // Draw what the camera inside the scene captured
    renderer.render(scene, camera);

    // `requestAnimationFrame`
    window.requestAnimationFrame(animate);
};
animate();