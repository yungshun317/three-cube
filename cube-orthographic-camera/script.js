import * as THREE from '/three.module.min.js';

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

// [2] Object

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000); //
// const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height,);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// [4] Renderer
// Select the `Canvas` element
const canvas = document.querySelector(".draw");
// Add the `WebGLRenderer`
const renderer = new THREE.WebGLRenderer({ canvas });
// Renderer size
renderer.setSize(aspect.width, aspect.height);

// `Clock` class
const clock = new THREE.Clock();

// Animate
const animate = () => {
    // `getElapsedTime`
    const elapsedTime = clock.getElapsedTime();

    // Renderer
    // Draw what the camera inside the scene captured
    renderer.render(scene, camera);

    // `requestAnimationFrame`
    window.requestAnimationFrame(animate);
};
animate();