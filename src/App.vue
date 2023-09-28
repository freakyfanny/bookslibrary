<template>
  <div
    class="book-lirary max-h-full sm:max-h-screen max-w-full sm:max-w-screen"
  >
    <HeaderNav class="p-10">
      <SearchBox v-model="email" @searchInput="(e) => searchForInput(e)"
    /></HeaderNav>
    <div
      class="books-container flex flex-wrap items-center justify-center -mx-1 w-screen sm:w-full h-screen sm:h-full p-10 bg-pink-200"
    >
      <BookCard v-for="book in booksLibrary" :book="book" :key="book.lccn"/>
    </div>
  </div>
</template>

<script setup>
import SearchBox from "./components/SearchBox.vue";
import HeaderNav from "./components/HeaderNav.vue";
import BookCard from "./components/BookCard.vue";
import { ref } from "vue";
import {useBooksStore} from '../src/store/booksStore';

const booksStore = useBooksStore()

const booksLibrary = ref([]);


const searchForInput = async (searchParam) => {
  const ladida = await booksStore.searchBook(searchParam);
  console.log(ladida);
  booksLibrary.value = booksStore.books;
}
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
