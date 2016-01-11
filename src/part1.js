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
document.getElementById("part-1-3d").appendChild(renderer.domElement);

//Meshes
var coordinates = new THREE.Vector3(0,0,0)
var element = "C"

var sphereMaterial;

const sphereGeo = new THREE.Sphere(coordinates, 1);
switch (element){
	case "C":
		sphereMaterial = new THREE.MeshBasicMaterial({color: 0x808080});
		break;
	case "N":
		sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
		break;
	case "O":
		sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
		break;
	case "S":
		sphereMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00});
		break;
	case "H":
		sphereMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
		break;
	default:
		sphereMaterial = new THREE.MeshBasicMaterial({color: 0x008000});
		break;
}
const sphereObj = new THREE.Mesh(sphereGeo, sphereMaterial);
scene.add(sphereObj);

//Render loop
function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();