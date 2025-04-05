<template>
  <div class="inicio-retro">
    <h1 class="titulo-retro">✨ Bienvenido al Modo Retro</h1>
    <p class="subtitulo-retro">Elige una experiencia para comenzar:</p>

    <div class="botones-retro">
      <router-link to="/cruzar-rio" class="btn-retro">🛶 Jugar "Cruza el Río"</router-link>
      <router-link to="/retro" class="btn-retro">🎮 Fondo Retro</router-link>
      <router-link to="/cubo3d" class="btn-retro">🧊 Cubo 3D</router-link>
      <router-link to="/ghost" class="btn-retro">👻 Ghosts 'n Goblins</router-link> <!-- ✅ Aquí -->
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'VistaInicio' // ⬅️ Nombre multi-palabra
})
</script>

<style scoped>
.inicio-retro {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #001f2e, #051f30);
  color: #00ffff;
  min-height: 100vh;
}

.titulo-retro {
  font-size: 3rem;
  color: #ff00ff;
  text-shadow: 2px 2px 10px #0ff;
  margin-bottom: 1rem;
}

.subtitulo-retro {
  font-size: 1.3rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.botones-retro {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;
}

.btn-retro {
  background: #00ffff;
  border: 2px solid #ff00ff;
  color: #000;
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  text-shadow: 1px 1px 3px #fff;
  box-shadow: 0 0 15px #0ff;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  text-decoration: none;
}

.btn-retro:hover {
  transform: scale(1.1);
  box-shadow: 0 0 25px #f0f, 0 0 10px #0ff;
}
</style>
