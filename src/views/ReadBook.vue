<template>
    <div
      class="book-details max-h-full sm:max-h-screen max-w-full sm:max-w-screen"
    >
    <div
      v-if="currentBook && currentBook.covers"
      class="h-48 m-3 lg:h-80 lg:w-48 flex-none bg-contain bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden"
      :style="{ 'background-image': 'url(' + getBookCoverUrl(currentBook) + ')' }"
      :title="currentBook.title"
    ></div>
    <div
      v-else
      class="h-48 m-3 lg:h-80 lg:w-48 pl-2 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden bg-pink-100"
      :title="currentBook.title"
    ></div>
      <p class="">Read more here hihi</p>
      <p>{{ bookDetails }}</p>
      <p v-if="bookDetails">{{  bookDetails.description.replace(/(\\r)*\\n/g, '<br>') }}</p>
    </div>
  </template>
  
  <script setup>
import { useBooksStore } from "../store/booksStore";
import { storeToRefs } from "pinia";
import {onBeforeMount } from 'vue'



const bookStore = useBooksStore();

const { currentBook, bookDetails } = storeToRefs(bookStore);


onBeforeMount(async () => {
    console.log('currentBook');
    console.log(currentBook.value);
    bookDetails.value = await bookStore.getBookDetails();
})

const getBookCoverUrl = (book) => {
  const coverId = book.covers[0];
  console.log(book.title);
  console.log(book);
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}

  </script>
  
  <style>
  
  </style>
  