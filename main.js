// from: https://www.youtube.com/watch?v=xJAfLdUgdc4&list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho
// also check this: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// import grass from './assets/grass.jpg'
// import universe from './assets/universe.jpeg'
const monkeyUrl = new URL('./monkey.glb', import.meta.url)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.setClearColor(0xFFEA00)

document.body.appendChild(renderer.domElement)
console.log('append');

const textureLoader = new THREE.TextureLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// there is 2 types of camera
// - perspective: the object size change by proximity
// - orthographic: the object size doesn't change ny proximity

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const orbit = new OrbitControls(camera, renderer.domElement)

const mousePosition = new THREE.Vector2()
window.addEventListener('mousemove', (e) => {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
  mousePosition.y = (e.clientY / window.innerHeight) * 2 - 1
})

const raycaster = new THREE.Raycaster()

scene.background = textureLoader.load('./universe.jpeg')

const terrainGeometry = new THREE.PlaneGeometry(20, 20, 20, 20)
const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: textureLoader.load('./grass.jpg') })
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial)
terrain.position.x = 0
terrain.position.y = 0
terrain.position.z = 0
terrain.rotation.x = Math.PI / 2
terrain.receiveShadow = true
// terrain.te

const axesHelper = new THREE.AxesHelper(5)
const gridHelper = new THREE.GridHelper(30)

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1, wireframe: true })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.x = -3
box.position.z = -3

const sphereGeometry = new THREE.SphereGeometry(1, 10, 10)
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1, wireframe: true })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.x = -1
sphere.position.z = -3

const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2)
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1, wireframe: true })
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.position.x = 1
cylinder.position.z = -3

const torusGeometry = new THREE.TorusGeometry(0.6, 0.4, 10, 10)
const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1, wireframe: true })
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.x = 3
torus.position.z = -3

const planeGeometry = new THREE.PlaneGeometry(1, 1)
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1, wireframe: true })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.x = -3
plane.position.z = 0

const circleGeometry = new THREE.CircleGeometry(0.5)
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1, wireframe: true })
const circle = new THREE.Mesh(circleGeometry, circleMaterial)
circle.position.x = -1
circle.position.z = 0

const ringGeometry = new THREE.RingGeometry(0.5, 0.3)
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x4169e1, wireframe: true, wireframeLinewidth: 6 })
const ring = new THREE.Mesh(ringGeometry, ringMaterial)
ring.position.x = 1
ring.position.z = 0


// The various standard materials progress from fastest to slowest MeshBasicMaterial ➡ MeshLambertMaterial ➡ MeshPhongMaterial ➡ MeshStandardMaterial ➡ MeshPhysicalMaterial.
// MeshBasicMaterial: dosen't affect light
const sphereGeometry1 = new THREE.SphereGeometry(1, 8, 6)
const sphereMaterial1 = new THREE.MeshBasicMaterial({ color: 0x0095DD });
const sphere1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1)
sphere1.position.set(-3, 0, 2)
sphere1.castShadow = true

// MeshLambertMaterial: calculate lighting by vertex
const sphereGeometry3 = new THREE.SphereGeometry(1, 8, 6)
const sphereMaterial3 = new THREE.MeshLambertMaterial({ color: 0x6622DD, flatShading: true });
const sphere3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3)
sphere3.position.set(-1, 0, 2)
sphere3.castShadow = true

// MeshPhongMaterial: calculate lightning by pixel
// properties: shininess
const sphereGeometry2 = new THREE.SphereGeometry(1, 8, 6)
const sphereMaterial2 = new THREE.MeshPhongMaterial({ color: 0x0095DD });
const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2)
sphere2.position.set(1, 0, 2)
sphere2.castShadow = true

// MeshStandardMaterial: calculate lightning by pixel
// properties: roughness and metalness [0,1]
const sphereGeometry22 = new THREE.SphereGeometry(1, 8, 6)
const sphereMaterial22 = new THREE.MeshStandardMaterial({ color: 0x0095DD, metalness: 1, roughness: 0.5 });
const sphere22 = new THREE.Mesh(sphereGeometry22, sphereMaterial22)
sphere22.position.set(3, 0, 2)
sphere22.castShadow = true

// MeshNormalMaterial
const sphereGeometry4 = new THREE.SphereGeometry(1, 8, 6)
const sphereMaterial4 = new THREE.MeshNormalMaterial({ color: 0x0095DD });
const sphere4 = new THREE.Mesh(sphereGeometry4, sphereMaterial4)
sphere4.position.set(5, 0, 2)
sphere4.castShadow = true

// MeshDepthMaterial
const sphereGeometry5 = new THREE.SphereGeometry(1, 8, 6)
const sphereMaterial5 = new THREE.MeshDepthMaterial({ color: 0x0095DD });
const sphere5 = new THREE.Mesh(sphereGeometry5, sphereMaterial5)
sphere5.position.set(7, 0, 2)
sphere5.castShadow = true

// MeshToonMaterial, calculate light by gradient2
const sphereGeometry6 = new THREE.SphereGeometry(1, 8, 6)
const sphereMaterial6 = new THREE.MeshToonMaterial({ color: 0x0095DD });
const sphere6 = new THREE.Mesh(sphereGeometry6, sphereMaterial6)
sphere6.position.set(9, 0, 2)
sphere6.castShadow = true
sphere6.name = 'tmp'

const planeGeometry2 = new THREE.PlaneGeometry(1, 1, 10, 10)
const planeMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2)
plane2.position.set(3, 0, 0)

const gltfLoader = new GLTFLoader()
gltfLoader.load('./monkey.glb', (gltf) => {
  const model = gltf.scene
  model.position.set(6, 0, 0)
  scene.add(model)
})

const gui = new dat.GUI()

const options = {
  lightColor: '#fff',
  lightX: 0,
  lightY: 2,
  lightZ: 0,
  dlightX: -30,
  dlightY: 50,
  dlightZ: 0,
}

// ambient light: general light
// directional light: has parallel source light, like sun
// spot light:  from a source
const pointLight = new THREE.PointLight(options.lightColor)
pointLight.castShadow = true
// const ambientLight = new THREE.AmbientLight(0x333333)
const directionalLight = new THREE.DirectionalLight(0xeeeeee, 0.8)
directionalLight.position.set(options.dlightX, options.dlightY, options.dlightZ)
directionalLight.castShadow = true

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
const pLightHelper = new THREE.PointLightHelper(pointLight)

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)

gui.addColor(options, 'lightColor').onChange(e => { pointLight.color.set(e) })
gui.add(options, 'lightX', -10, 10)
gui.add(options, 'lightY', -10, 10)
gui.add(options, 'lightZ', -10, 10)
gui.add(options, 'dlightX', -100, 100)
gui.add(options, 'dlightY', -100, 100)
gui.add(options, 'dlightZ', -100, 100)



// plane.rotation.x = Math.PI / 2
box.rotation.y = 5

// scene.fog = new THREE.Fog(0xEEEEEE, 0, 100)
scene.fog = new THREE.FogExp2(0xEEEEEE, 0.01)


scene.add(terrain)

scene.add(axesHelper)
scene.add(gridHelper)
scene.add(box)
scene.add(sphere)
scene.add(cylinder)
scene.add(torus)
scene.add(plane)
scene.add(circle)
scene.add(ring)
// materials
// we can adjust:
// - color: 'black'
// - emissive: 'purple'
// - shininess: 0
// - flatShading
// - side

scene.add(sphere1)
scene.add(sphere2)
scene.add(sphere22)
scene.add(sphere3)
scene.add(sphere4)
scene.add(sphere5)
scene.add(sphere6)
// scene.add(ambientLight)
scene.add(directionalLight)
scene.add(pointLight)
scene.add(dLightHelper)
scene.add(pLightHelper)
scene.add(dLightShadowHelper)
scene.add(plane2)

// scene.add(sphereLight)

camera.position.set(0, 2, 5)
orbit.update()


const animate = () => {
  box.rotation.y += 0.05
  renderer.render(scene, camera)
}

const animateLight = () => {
  pointLight.position.set(options.lightX, options.lightY, options.lightZ)
  // sphereLight.position.set(options.lightX, options.lightY, options.lightZ)
  directionalLight.position.set(options.dlightX, options.dlightY, options.dlightZ)
  renderer.render(scene, camera)
  // sLightHelper.update()

  raycaster.setFromCamera(mousePosition, camera)
  const intersects = raycaster.intersectObjects(scene.children)
  intersects.forEach(cur => {
    if (cur.object.name === 'tmp') {
      console.log('found')
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      cur.object.material.color.set(`#${randomColor}`)
    }
  })
  console.log(intersects);
}

renderer.setAnimationLoop(animate)
renderer.setAnimationLoop(animateLight)

