<template>
  <HeaderNav class="p-10 flex md:flex-row md:flex-no-wrap flex-wrap flex-column">
    <div >
      <router-link to="/">
        <span class="text-blue-500 text-lg"
          >Books<span class="text-blue-300">library</span></span
        ></router-link
      >
      <router-link class="ml-2 font-bold underline" to="/readBook" v-if="currentBook && currentBook.title"
        >Read Book</router-link
      >
    </div>
    <SearchBox v-model="email" @searchInput="(e) => searchForInput(e)" />
  </HeaderNav>
  <router-view />
</template>

<script setup>
import SearchBox from "./components/SearchBox.vue";
import HeaderNav from "./components/HeaderNav.vue";
import { storeToRefs } from "pinia";
import { useBooksStore } from "../src/store/booksStore";
import { useRouter } from "vue-router";

const router = useRouter();

const booksStore = useBooksStore();

const { currentBook } = storeToRefs(booksStore);

const searchForInput = async (searchParam) => {
  router.push("/");

  await booksStore.searchBook(searchParam);
};
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
