<template>
  <div
    class="book-details max-h-full flex text-left sm:max-h-screen max-w-full sm:max-w-screen"
  >
    <div
      v-if="currentBook && currentBook.covers"
      class="h-48 m-3 lg:h-80 lg:w-48 flex-none bg-contain bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden"
      :style="{
        'background-image': 'url(' + getBookCoverUrl(currentBook) + ')',
      }"
      :title="currentBook.title"
    ></div>
    <div
      v-else
      class="h-48 m-3 lg:h-80 lg:w-48 pl-2 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden bg-pink-100"
      :title="currentBook.title"
    ></div>

    <div class="w-1/3">
      <h3 class="text-gray-900 font-bold text-left text-xl mt-2">
        {{ currentBook.title }}
      </h3>
      <div v-if="currentBook.author">
        <BookAuthor :author="currentBook.author" />
      </div>
      <div v-if="bookDetails.description">
        <p v-if="bookDetails.description.value">
          {{ showCorrectDescription(bookDetails.description.value) }}
        </p>
        <p v-else>{{ showCorrectDescription(bookDetails.description) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBooksStore } from "../store/booksStore";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import BookAuthor from "../components/BookAuthor.vue";

const bookStore = useBooksStore();

const { currentBook, bookDetails } = storeToRefs(bookStore);

onBeforeMount(async () => {
  bookDetails.value = await bookStore.getBookDetails();
  console.log(bookDetails);
});

const showCorrectDescription = (bookDescription) => {
  let newDescription = bookDescription.replace(/(\\r)*\\n/g, "</br></br>");
  newDescription = newDescription.substring(0, newDescription.indexOf("("));
  return newDescription;
};

const getBookCoverUrl = (book) => {
  const coverId = book.covers[0];
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
};
</script>

<style></style>
