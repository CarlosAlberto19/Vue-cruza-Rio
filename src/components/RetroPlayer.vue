<template>
  <div class="retro-player"></div>
</template>

<script setup>
</script>

<style scoped>
.retro-player {
  width: 40px;
  height: 40px;
  background-color: #00ffff;
  border: 2px solid #fff;
  border-radius: 5px;
  position: absolute;
  bottom: 50px;
  left: 50px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
