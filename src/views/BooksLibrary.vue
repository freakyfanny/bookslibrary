<template>
  <div
    class="book-lirary max-h-full sm:max-h-screen max-w-full sm:max-w-screen bg-blue-200"
  >
    <div
      class="justify-center -mx-1 w-screen sm:w-full min-h-screen h-fit p-10 bg-blue-200"
      v-if="loadingState === true && booksLibrary.length < 1"
    >
      <LoadingSpinner />
    </div>
    <div
      v-else
      class="books-container flex flex-wrap justify-center -mx-1 w-screen sm:w-full min-h-screen h-fit p-10 bg-blue-200"
    >
      <div v-if="numFound < 1">No results found</div>
      <BookCard v-for="book in booksLibrary" :book="book" :key="book.lccn" />
    </div>
    <div class="flex justify-center bg-blue-200 pb-12" v-if="loadingState === true && booksLibrary.length > 1"><LoadingSpinner/></div>
  </div>
</template>

<script setup>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import BookCard from "../components/BookCard.vue";
import { ref, watch, onMounted } from "vue";
import { useBooksStore } from "../store/booksStore";
import { storeToRefs } from "pinia";

const bookStore = useBooksStore();

const { booksLibrary, numFound, loading } = storeToRefs(bookStore);
const loadingState = ref(false);

watch(loading, () => {
  getLoadingState();
});

watch(booksLibrary, () => {
  getLoadingState();
});

const getLoadingState = () => {
  loadingState.value = bookStore.getLoading();
};

const getNextSearchResults = () => {
  window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      bookStore.setLoading(true);
      bookStore.searchBook();
    }
  };
};

onMounted(() => {
  getNextSearchResults();
});
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
