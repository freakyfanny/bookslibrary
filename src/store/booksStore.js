import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooksStore = defineStore("books", () => {
  const book = ref({ title: "booktitle", isbn: "isbn" });

  const books = ref({});
  const library = ref({});
  const numberFound = ref(0);

  async function getCurrentBook(id, type) {
    console.log('getCurrentBook in pinia')
    console.log(`id ${id}`);
    console.log(`type ${type}`);
    //fetch(id,type) from server
    return "book"
  }


  async function getBooksInfo(id, type) {
    console.log('getBooksInfo in pinia')
    console.log(`id ${id}`);
    console.log(`type ${type}`);
    //fetch(id,type) from server
    return "book"
  }


  async function searchBook(searchParam) {
    console.log('searchBook in pinia')
    console.log(searchParam)
    const url= "http://localhost:3000/search?limit=20&searchParam=";
    const result = await fetch(url+searchParam.replace(/\s/g, '+'), {
        method: 'get'
    })
    .then(async(response) => { const res = await response.json(); return res;});
    console.log(`after fetch books.value:`);
    // books.value = result.docs;
    numberFound.value = result.numFound;
    // console.log(books.value);

    books.value = result.docs;
    console.log('before return in searchBook');
    console.log(books.value);
    return books.value
    //fetch(searhParam) from server
  }

  return { book, books, library, searchBook, getCurrentBook, getBooksInfo };
});

