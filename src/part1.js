import THREE from "three";
import orbit from 'three-orbit-controls'
const OrbitControls = orbit(THREE);

//Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.getElementById("part-1-3d").appendChild(renderer.domElement);

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;
const controls = new OrbitControls(camera, renderer.domElement);

//Scene setup
const scene = new THREE.Scene();

//Meshes
var coordinates = new THREE.Vector3(0, 0, 0)
var element = "C"


const sphereGeo = new THREE.SphereGeometry(100);
var sphereMaterial;
switch (element) {
    case "C":
        sphereMaterial = new THREE.MeshBasicMaterial({color: "gray"});
        break;
    case "N":
        sphereMaterial = new THREE.MeshBasicMaterial({color: "blue"});
        break;
    case "O":
        sphereMaterial = new THREE.MeshBasicMaterial({color: "red"});
        break;
    case "S":
        sphereMaterial = new THREE.MeshBasicMaterial({color: "yellow"});
        break;
    case "H":
        sphereMaterial = new THREE.MeshBasicMaterial({color: "white"});
        break;
    default:
        sphereMaterial = new THREE.MeshBasicMaterial({color: "green"});
        break;
}
const sphereObj = new THREE.Mesh(sphereGeo, sphereMaterial);
window.sphere = sphereObj;
scene.add(sphereObj);

//Render loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();