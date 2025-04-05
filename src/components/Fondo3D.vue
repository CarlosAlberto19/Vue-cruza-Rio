<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 6

  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // ❌ Eliminamos el cubo:
  // const geometry = new THREE.BoxGeometry(...)
  // const material = ...
  // const cube = new THREE.Mesh(...)
  // scene.add(cube)

  // 🌟 Podemos dejar la luz por si la necesitas
  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(10, 10, 10)
  scene.add(light)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>

<template>
  <canvas ref="canvas" class="fondo-3d"></canvas>
</template>

<style scoped>
.fondo-3d {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
}
</style>
