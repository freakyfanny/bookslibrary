<template>
  <div class="flex items-start pb-2">
        <!-- <img class="w-10 h-10 rounded-full mr-4" src="/img/author.jpg" alt="Author"> -->

    <div class="text-sm text-left">
      <div v-if="props.author && props.author.length > 1">
        <span
          v-for="author in props.author"
          :key="author"
          class="text-gray-700 text-base"
        >
          {{ author.toString() }} &nbsp;
        </span>
      </div>
      <div v-if="props.author && props.author.length === 1">
        <p class="text-gray-700 text-base">
          {{ props.author.toString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(['author']);
</script>

<style scoped></style>
