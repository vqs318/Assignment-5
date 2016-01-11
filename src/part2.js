import THREE from "three";
import orbit from 'three-orbit-controls'
const OrbitControls = orbit(THREE);

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;
const controls = new OrbitControls(camera);

//Scene setup
const scene = new THREE.Scene();

//Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.getElementById("part-2-3d").appendChild(renderer.domElement);

//Meshes
const planeGeometry = new THREE.PlaneGeometry(800, 800);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

//Render loop
function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();