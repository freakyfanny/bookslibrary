<template>
  <div
    class="book-lirary max-h-full sm:max-h-screen max-w-full sm:max-w-screen"
  >
    <div
      class="books-container flex flex-wrap justify-center -mx-1 w-screen sm:w-full min-h-screen h-fit p-10 bg-blue-200"
    >
      <BookCard v-for="book in booksLibrary" :book="book" :key="book.lccn" />
    </div>
  </div>
</template>

<script setup>
import BookCard from "../components/BookCard.vue";
import { useBooksStore } from "../store/booksStore";
import { storeToRefs } from "pinia";

const bookStore = useBooksStore();

const { booksLibrary } = storeToRefs(bookStore);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  color: #2c3e50;
}
.book-library {
  max-width: 1400px;
  height: 100vh;
  background-color: var(--page-bg-color);
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0px 2px 50px 10px rgba(0, 0, 0, 0.21);
}
</style>
