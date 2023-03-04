import * as THREE from '/three.module.min.js';

// [1] Scene
const scene = new THREE.Scene();

// [2] Object

// Mesh
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ color: "purple" });
const purpleMesh = new THREE.Mesh(geometry, material);
purpleMesh.position.x = 1;

const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material2 = new THREE.MeshBasicMaterial({ color: "yellow" });
const yellowMesh = new THREE.Mesh(geometry2, material2);
yellowMesh.position.x = -1;

const geometry3 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material3 = new THREE.MeshBasicMaterial({ color: "green" });
const greenMesh = new THREE.Mesh(geometry3, material3);

const geometry4 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material4 = new THREE.MeshBasicMaterial({ color: "white" });
const whiteMesh = new THREE.Mesh(geometry4, material4);
whiteMesh.position.set(1, 1, 0);
// whiteMesh.position.x = 1;
// whiteMesh.position.y = 1;
// whiteMesh.position.z = 0;

const geomtery5 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material5 = new THREE.MeshBasicMaterial({ color: "pink" });
const pinkMesh = new THREE.Mesh(geomtery5, material5);
pinkMesh.position.set(-1, 1, 0);

const geomtery6 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material6 = new THREE.MeshBasicMaterial({ color: "blue" });
const blueMesh = new THREE.Mesh(geomtery6, material6);
blueMesh.position.y = 1;

scene.add(purpleMesh, yellowMesh, greenMesh, whiteMesh, pinkMesh, blueMesh);

yellowMesh.lookAt(whiteMesh.position);
purpleMesh.lookAt(pinkMesh.position);
pinkMesh.lookAt(greenMesh.position);

const cursor = {
    x: 0,
    y: 0,
};
window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5;
    cursor.y = event.clientY / window.innerHeight - 0.5;
    console.log(cursor.x, cursor.y);
});

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height,);
camera.position.z = 3;
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

    // `lookAt`
    greenMesh.lookAt(new THREE.Vector3(cursor.x, -cursor.y, 1));

    // Renderer
    // Draw what the camera inside the scene captured
    renderer.render(scene, camera);

    // `requestAnimationFrame`
    window.requestAnimationFrame(animate);
};
animate();