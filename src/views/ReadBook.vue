<template>
  <div>
    <div
    v-if="loadingState === true"
      class="book-details shadow-md m-4 p-4 h-fit bg-blue-100 max-h-full flex text-left sm:max-h-screen max-w-full sm:max-w-screen"
    >
      <LoadingSpinner />
    </div>
    <div
      v-else
      class="book-details shadow-md m-4 p-4 h-fit bg-blue-100 max-h-full flex text-left sm:max-h-screen max-w-full sm:max-w-screen"
    >
      <div
        v-if="currentBook && currentBook.covers"
        class="lg:w-48 flex-none bg-contain bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden"
        :style="{
          'background-image': 'url(' + getBookCoverUrl(currentBook) + ')',
        }"
        :title="currentBook.title"
      ></div>
      <div
        v-else
        class="lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden bg-blue-100"
        :title="currentBook.title"
      ></div>

      <div class="w-1/3 flex flex-col mx-2 pl-2">
        <h3 class="text-gray-900 font-bold text-left text-xl mt-2">
          {{ currentBook.title }}
        </h3>
        <div v-if="currentBook.author">
          <BookAuthor :author="currentBook.author" />
        </div>
        <div class="flex flex-row items-center p-2 mt-4">
          <div v-for="num in parseInt(currentBook.rating, 10)" :key="num">
            <StarRating />
          </div>
          <p class="pl-4">
            <b> {{ currentBook.rating }}</b> ({{ currentBook.ratingCount }})
          </p>
        </div>
      </div>
      <div class="w-1/3 flex flex-col mx-2" v-if="bookDetails.description">
        <p><b>Description: </b></p>
        <p v-if="bookDetails.description.value">
          {{ showCorrectDescription(bookDetails.description.value) }}
        </p>
        <p v-else>{{ showCorrectDescription(bookDetails.description) }}</p>
      </div>

      <div class="w-1/3 flex flex-col mx-2">
        <p class="pt-2"><b>When was this book published?</b></p>
        <p class="pt-2">{{ currentBook.publishDate }}</p>
        <p class="pt-2">
          <b>How many wants to read this book?</b><br />
          {{ currentBook.wantRead }}
        </p>
        <p class="pt-2">
          <b>How many are currently reading this book?</b><br />
          {{ currentBook.currentlyReading }}
        </p>
        <p class="pt-2">
          <b>How many have read this book?</b><br />
          {{ currentBook.alreadyRead }}
        </p>
        <p class="pt-2">
          <b>Total pages</b> <br />
          {{ currentBook.pages }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBooksStore } from "../store/booksStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, watch, ref } from "vue";
import BookAuthor from "../components/BookAuthor.vue";
import StarRating from "../components/StarRating.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const bookStore = useBooksStore();

const { currentBook, bookDetails, loading } = storeToRefs(bookStore);
const loadingState = ref(false);


watch(loading, () => {
  getLoadingState();
});

watch(bookDetails, () => {
  getLoadingState();
});

const getLoadingState = () => {
  loadingState.value = bookStore.getLoading();
};

onBeforeMount(async () => {
  if (!currentBook) {
    router.push("/");
  }

  try {
    bookDetails.value = await bookStore.getBookDetails();
  } catch (err) {
    // Handle the error here
    console.error("Error in ReadBook onBeforeMount:", err);
  }
});

const showCorrectDescription = (bookDescription) => {
  let newDescription = bookDescription.replace(/(\\r)*\\n/g, "</br></br>");

  if (bookDescription.includes("(")) {
    newDescription = newDescription.substring(0, newDescription.indexOf("("));
  } else if (bookDescription.includes("[")) {
    newDescription = newDescription.substring(0, newDescription.indexOf("["));
  }

  console.log(newDescription);
  console.log(bookDescription);

  return newDescription;
};

const getBookCoverUrl = (book) => {
  const coverId = book.covers[0];
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
};
</script>

<style></style>
