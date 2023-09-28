<template>
  <div
    class="my-1 w-1/2 sm:w-1/3 sm:h-fit h-1/2 max-w-sm rounded m-2 shadlow-lg bg-white max-w-sm w-full lg:max-w-full lg:flex"
  >
    <div
      v-if="props.book && props.book.covers"
      class="h-48 m-3 lg:h-64 lg:w-44 flex-none bg-contain bg-no-repeat rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden"
      :style="{ 'background-image': 'url(' + getBookCoverUrl(props.book) + ')' }"
      title="Woman holding a mug"
    ></div>
    <div
      v-else
      class="h-48 m-3 lg:h-64 lg:w-40 pl-2 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden bg-pink-100"
      title="Woman holding a mug"
    ></div>
    <div
      class="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-start leading-normal"
    >
      <div class="flex items-start flex-col">
        <div class="text-gray-900 font-bold text-left text-xl mb-2">
          {{ props.book.title }}
        </div>

        <div class="flex items-start pb-2">
        <!-- <img class="w-10 h-10 rounded-full mr-4" src="/img/author.jpg" alt="Author"> -->
        <div class="text-sm">
          <div v-if="props.book.author && props.book.author.length > 1">
            <span
              v-for="author in props.book.author"
              :key="author"
              class="text-gray-700 text-base"
            >
              {{ author.toString() }} &nbsp;
            </span>
          </div>
          <div v-if="props.book.author && props.book.author.length === 1">
            <p class="text-gray-700 text-base">
              {{ props.book.author.toString() }}
            </p>
          </div>
        </div>
      </div>

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

const props = defineProps(['book'])

const getBookCoverUrl = (book) => {
  const coverId = book.covers[0];
  console.log(book.title);
  console.log(book);
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
