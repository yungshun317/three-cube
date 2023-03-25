import * as THREE from '/three.module.min.js';
import { OrbitControls } from "./OrbitControls.js";
import * as dat from "/node_modules/dat.gui/build/dat.gui.module.js";

// [1] Scene
const scene = new THREE.Scene();

// const gui = new dat.GUI();

// `TextureLoader`
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/alphaSnow.jpg");

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
// Particle
const geometry = new THREE.BufferGeometry();
const verticesAmount = 1000;
const positionArray = new Float32Array(verticesAmount * 3);
for (let i = 0; i < verticesAmount * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 4;
}
geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
const material = new THREE.PointsMaterial();
material.size = 0.02;
material.transparent = true;
material.alphaMap = particleTexture;
material.depthTest = false;
const points = new THREE.Points(geometry, material);
scene.add(points);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height, 0.01, 100);
camera.position.z = 2;
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
orbitControls.enableZoom = false;
orbitControls.enableRotate = false;
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 0.2;

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