<template>
  <div class="search-box flex">
    <input
    type="search"
      v-model="searchValue"
      @keyup.enter="handleSearchInput"
      placeholder="Search for a book..."
    />
    <button
    @click="handleSearchInput"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      Search
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const searchValue = ref("");
const emit = defineEmits(["searchInput"])

function handleSearchInput() {
    emit('searchInput', searchValue.value)
}
</script>

<style scoped>
.search-box {
  position: relative;
}

.search-box > input {
  background-color: transparent;
  border: none;
  font-weight: 600;
  padding: 0 10px 0 40px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%238b939c' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' class='feather feather-search'%3e%3ccircle cx='11' cy='11' r='8'/%3e%3cpath d='M21 21l-4.35-4.35'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 15px;
  background-position: 15px 50%;
  color: var(--body-color);
  font-family: var(--body-font);
  &::placeholder {
    color: var(--placeholder);
  }
}
</style>
