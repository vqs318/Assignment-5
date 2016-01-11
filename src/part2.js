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

////Axes
//const axes = new THREE.AxisHelper(20);
//scene.add(axes);

//Meshes
const xPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshBasicMaterial({color: 0xff0000})
);
const yPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
);
yPlane.rotateX(Math.PI/2);
const zPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(800, 800),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
);
zPlane.rotateY(Math.PI/2);
scene.add(xPlane, yPlane, zPlane);

xPlane.material.side = THREE.DoubleSide;
yPlane.material.side = THREE.DoubleSide;
zPlane.material.side = THREE.DoubleSide;

window.xPlane = xPlane;
window.yPlane = yPlane;
window.zPlane = zPlane;

//Render loop
function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
}
render();