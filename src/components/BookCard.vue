<template>
    <div class="h-max my-1 w-1/2 sm:w-1/3 h-1/2 sm:h-1/2 max-w-sm rounded overflow-hidden m-2 shadow-lg bg-white">
  <img class="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2" >{{book.title}}</div>
    <div v-if="book.author && book.author.length > 1">
    <p  v-for="author in book.author" :key="author" class="text-gray-700 text-base">
     {{ author.toString() }}
    </p></div>
    <div v-if="book.author && book.author.length === 1 ">
    <p class="text-gray-700 text-base">
     {{ book.author.toString() }}
    </p>
    </div>
  </div>
  <div class="flex flex-wrap px-6 pt-4 pb-2">
    <span v-for="category in book.category" :key="category" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ category }}</span>
    <!-- <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> -->
  </div>
</div>

</template>


<script>
export default {
  name: 'BookCard',
  props: {
    book: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
