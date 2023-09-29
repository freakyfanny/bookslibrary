import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooksStore = defineStore("books", () => {
  const currentBook = ref({ title: "booktitle", isbn: "isbn" });

  const booksLibrary = ref({});
  const numberFound = ref(0);
  const bookDetails = ref({});

  function setCurrentBook(book){
    currentBook.value = book;
  }

  async function getBookDetails() {
    console.log('key');
    console.log(currentBook.value)
    console.log(currentBook.value.key);
    const url= "http://localhost:3000/bookDetails?key=";
    const result = await fetch(url+currentBook.value.key, {
        method: 'get'
    })
    .then(async(response) => { const res = await response.json(); return res;});
    console.log(`after fetch booksdetails:`);
    console.log(bookDetails);
    bookDetails.value = result;
    return bookDetails.value;
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

    booksLibrary.value = result.docs;
    console.log('before return in searchBook');
    console.log(booksLibrary.value);
    return booksLibrary.value
    //fetch(searhParam) from server
  }

  return { currentBook, booksLibrary, bookDetails, searchBook, setCurrentBook, getBookDetails };
});

