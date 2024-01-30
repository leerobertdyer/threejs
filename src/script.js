import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
// import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// ENVIRONMENT

// const loader = new EXRLoader()
// loader.load('./sunset.exr', (texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping
//     scene.background = texture
// })

// textures
const textureLoader = new THREE.TextureLoader()
let matcap = textureLoader.load('./textures/matcaps/8.png')
const matcap1 = textureLoader.load('./textures/matcaps/1.png')
const matcap2 = textureLoader.load('./textures/matcaps/2.png')
const matcap3 = textureLoader.load('./textures/matcaps/3.png')
const matcap4 = textureLoader.load('./textures/matcaps/4.png')
const matcap5 = textureLoader.load('./textures/matcaps/5.png')
const matcap6 = textureLoader.load('./textures/matcaps/6.png')
const matcap7 = textureLoader.load('./textures/matcaps/7.png')
const matcap8 = textureLoader.load('./textures/matcaps/av.png')
const myMatcaps = [
    new THREE.MeshMatcapMaterial({ matcap: matcap }), 
    new THREE.MeshMatcapMaterial({ matcap: matcap1 }), 
    new THREE.MeshMatcapMaterial({ matcap: matcap2 }), 
    new THREE.MeshMatcapMaterial({ matcap: matcap3 }), 
    new THREE.MeshMatcapMaterial({ matcap: matcap4 }), 
    new THREE.MeshMatcapMaterial({ matcap: matcap5 }), 
    new THREE.MeshMatcapMaterial({ matcap: matcap6 }), 
    new THREE.MeshMatcapMaterial({ matcap: matcap7 }), 
    new THREE.MeshMatcapMaterial({ matcap: matcap8 })
]

// Fonts
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => 
    {
        const textGeometry = new TextGeometry(
            "Holy Donuts!",
            {
                font: font,
                size: 0.5,
                height: .2,
                curveSegments: 3,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        ) 
        textGeometry.center()

        const material = new THREE.MeshMatcapMaterial({ matcap })
        const text = new THREE.Mesh(textGeometry, material)

        scene.add(text)

            const donutGeometry = new THREE.TorusGeometry(1)
        const donuts = []

        for (let i = 0; i < 1250; i++) {
        const donutMaterial = myMatcaps[Math.floor(Math.random()*myMatcaps.length)]
              const donut = new THREE.Mesh(
                donutGeometry,
                donutMaterial
               )

       donut.position.x = (Math.random() - .5) * 100
       donut.position.y = (Math.random() - .5) * 100
       donut.position.z = (Math.random() - .5) * 100

       donut.rotation.x = Math.random() * Math.PI
       donut.rotation.y = Math.random() * Math.PI
    
       const scale = Math.random()
       donut.scale.set(scale, scale, scale)

       scene.add(donut)
       donuts.push(donut)
        }

        const loop = () => {
            text.rotation.x += .01
            text.rotation.y += .01
            for(const donut of donuts) {
                donut.rotation.y += .01
                donut.rotation.x += .1
            }
            window.requestAnimationFrame(loop)
        }
        loop()

    }
)


//environment



const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate

const loop = () =>
{
    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(loop)
}

loop()