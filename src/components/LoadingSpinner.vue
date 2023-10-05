<template>
  <div class="flex justify-center items-center px-2">
    <div class="loader bg-white p-4 rounded-full flex space-x-3">
      <div class="w-3 h-3 bg-blue-700 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-blue-300 rounded-full animate-bounce"></div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.loader div {
  animation-duration: 0.5s;
}

.loader div:first-child {
  animation-delay: 0.1s;
}

.loader div:nth-child(2) {
  animation-delay: 0.3s;
}

.loader div:nth-child(3) {
  animation-delay: 0.6s;
}

.loader div:nth-child(4) {
  animation-delay: 0.9s;
}

.loader div:nth-child(5) {
  animation-delay: 0.12s;
}
</style>
