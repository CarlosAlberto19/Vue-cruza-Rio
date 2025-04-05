<!-- src/views/CruzarRetro.vue -->
<template>
  <div class="retro-wrapper">
    <!-- Fondo animado (si tienes uno tipo líneas o partículas) -->
    <RetroBackground />

    <!-- El personaje que se mueve -->
    <RetroPlayer />

    <!-- Título y enlace -->
    <div class="retro">
      <h1 class="titulo-retro">🕹️ Modo Juego Retro</h1>
      <p class="subtitulo-retro">¡Mueve al jugador y explora!</p>
      <router-link to="/inicio">⬅️ Volver</router-link>
    </div>

    <!-- Suelo retro estilo líneas -->
    <div class="suelo"></div>
  </div>
</template>

<script setup>
import RetroBackground from '../components/RetroBackground.vue'
import RetroPlayer from '../components/RetroPlayer.vue'
</script>

<style scoped>
.retro-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a23 60%, #1f1f1f 100%);
  color: #00ffff;
  font-family: 'Press Start 2P', monospace;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 0;
}

/* Nueva sección para centrar el contenido retro */
.retro {
  position: relative;
  z-index: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
}

/* Suelo tipo rejilla retro */
.suelo {
  width: 100%;
  height: 80px;
  background: repeating-linear-gradient(
    45deg,
    #333,
    #333 10px,
    #444 10px,
    #444 20px
  );
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.titulo-retro {
  font-size: 2.5rem;
  color: #00ffff;
  text-shadow: 0 0 5px #ff00ff, 0 0 15px #ff00ff, 0 0 25px #ff00ff;

}

</style>
