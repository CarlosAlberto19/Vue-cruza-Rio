<script setup>
// Ya no necesitas importar Cubo3D aquí
</script>

<template>
  <main>
    <!-- Logos (puedes quitarlos si quieres) -->
    <div>
  <a href="https://vite.dev" target="_blank">
    <img src="/vite.svg" class="logo" alt="Vite logo" />
  </a>
  <a href="https://vuejs.org/" target="_blank">
    <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  </a>
</div>


    <!-- Aquí va la magia del enrutamiento -->
    <router-view />
  </main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
main {
  height: 100vh;
  background: rgba(17, 17, 17, 0.6); /* fondo oscuro translúcido */
}


canvas {
  display: block;
  width: 100%;
  height: 100vh;
}
</style>
