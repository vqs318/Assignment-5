import THREE from "three";

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

//Scene setup
const scene = new THREE.Scene();

//Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);

const planeGeometry = new THREE.PlaneGeometry(60, 20);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

document.getElementById("part-2-3d").appendChild(renderer.domElement);