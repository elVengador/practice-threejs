// from: https://www.youtube.com/watch?v=xJAfLdUgdc4&list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho
// also check this: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
console.log('append');

// there is 2 types of camera
// - perspective: the object size change by proximity
// - orthographic: the object size dosen't change ny proximity

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const orbit = new OrbitControls(camera, renderer.domElement)
const axesHelper = new THREE.AxesHelper(5)

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.rotation.y = 5
scene.add(axesHelper)
scene.add(box)

camera.position.set(0, 2, 5)
orbit.update()

const animate = () => {
  box.rotation.y += 0.05
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

