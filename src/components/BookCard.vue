<template>
  <div @click="handleClickOnBook"
    class="sm:w-1/3 w-fit flex rounded m-2 shadlow-lg bg-white flex-col flex-wrap sm:flex-row sm:flex-nowrap"
  >
    <div
      v-if="props.book && props.book.covers"
      class="h-48 sm:m-3 m-4 lg:h-64 lg:w-44 flex-none bg-contain bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden"
      :style="{ 'background-image': 'url(' + getBookCoverUrl(props.book) + ')' }"
      :title="props.book.title"
    ></div>
    <div
      v-else
      class="h-48 sm:m-3 m-4 lg:h-64 lg:w-40 pl-2 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden bg-blue-100"
      :title="props.book.title"
    ></div>
    <div
      class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-start leading-normal"
    >
      <div class="flex items-start flex-col">
        <div class="text-gray-900 font-bold text-left sm:text-xl text-md mb-2 sm:mt-0 -mt-6">
          {{ props.book.title }}
        </div>

       <BookAuthor :author="props.book.author"/>

        <div class="flex flex-wrap">
          <span
            v-for="category in props.book.category"
            :key="category"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
            >{{ category }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps} from "vue";
import { useBooksStore } from "../store/booksStore";
import BookAuthor from '../components/BookAuthor.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const bookStore = useBooksStore();

const props = defineProps(['book'])

const getBookCoverUrl = (book) => {
  const coverId = book.covers[0];
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}

const handleClickOnBook = () => {
  bookStore.setLoading(true);
  bookStore.setCurrentBook(props.book);

  router.push('readBook')
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
