import * as THREE from '/three.module.min.js';
import { OrbitControls } from "./OrbitControls.js";

// [1] Scene
const scene = new THREE.Scene();

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

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// [2] Object

// Mesh
const geometry = new THREE.BufferGeometry(1, 1, 2, 2);
const verticesArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttribute = new THREE.BufferAttribute(verticesArray, 3);
geometry.setAttribute("position", positionAttribute);
console.log(geometry);

const material = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height,);
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
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
// orbitControls.autoRotate = true;
// orbitControls.autoRotateSpeed = 6.0;
orbitControls.enableDamping = true;
// orbitControls.dampingFactor = 0.01;

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