//Imports
import THREE from "three";
import orbit from 'three-orbit-controls'
import chunk from 'lodash.chunk'
import flatten from 'lodash.flatten'
import PDBLoader from "./pdbRenderer"
import createTree from 'yaot';

const OrbitControls = orbit(THREE);

//Constants
const url = "/data/pdb2rh1.ent";

//Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.getElementById("part-1-3d").appendChild(renderer.domElement);

//Scene setup
const scene = new THREE.Scene();

//Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
//camera.position.set(-51.65, 70.75, 62.33);
camera.position.set(-67.41, 87.14, 50.56);
camera.rotation.set(-1.045, -0.59, -0.764);
//camera.position.z = 100;
new OrbitControls(camera, renderer.domElement);

new PDBLoader().load(url, geometryAtom => {
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 1);
    const atoms = geometryAtom.vertices.map((position, i) => {

        //Make an atom using a sphere of the right colour
        const object = new THREE.Mesh(
            sphereGeometry,
            new THREE.MeshPhongMaterial({color: geometryAtom.colors[i]})
        );

        //Place it correctly
        object.position.copy(position);
        object.scale.multiplyScalar(0.25);
        return object;
    });

    //Calculate the nearby atoms using an octree
    const octTree = createTree();
    const flattened = flatten(geometryAtom.vertices.map(pos => pos.toArray()));
    octTree.init(flattened);
    const bonds = geometryAtom.vertices.map((pos, i)=> {
        return octTree
            .intersectSphere(pos.x, pos.y, pos.z, 1.9)
            .filter(index => index != i); //Don't include self
    });

    //Draw bonds
    const bondGeometry = new THREE.BoxGeometry(1, 1, 1);
    const bondMaterial = new THREE.MeshPhongMaterial(0xffffff);
    const bondObjects = [];
    bonds.forEach((targets, i) => {
        const start = atoms[i].position;
        targets.forEach(j => {
            const index = j == 0 ? 0 : j / 3;
            const end = atoms[index].position;
            const object = new THREE.Mesh(bondGeometry, bondMaterial);
            object.position.copy(start);
            object.position.lerp(end, 0.5);
            object.lookAt(start);
            object.scale.set(0.1, 0.1, start.distanceTo(end));
            bondObjects.push(object);
        });
    });

    scene.add.apply(scene, atoms);
    scene.add.apply(scene, bondObjects);
});

//Lighting
var light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(1, 1, 1);
scene.add(light);

light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(-1, -1, 1);
scene.add(light);

window.camera = camera;

//Render loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
