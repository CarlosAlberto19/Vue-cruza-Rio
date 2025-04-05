<template>
  <canvas ref="canvas" class="retro-canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'

const canvas = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  const lines = []
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff })

  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.BufferGeometry()
    const points = []

    const x = (Math.random() - 0.5) * 20
    const y = (Math.random() - 0.5) * 20
    const zStart = Math.random() * -50
    const zEnd = zStart + 2

    points.push(new THREE.Vector3(x, y, zStart))
    points.push(new THREE.Vector3(x, y, zEnd))
    geometry.setFromPoints(points)

    const line = new THREE.Line(geometry, lineMaterial)
    lines.push(line)
    scene.add(line)
  }

  const animate = () => {
    requestAnimationFrame(animate)
    lines.forEach(line => {
      line.position.z += 0.1
      if (line.position.z > 10) {
        line.position.z = -50
      }
    })

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

<style scoped>
.retro-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
