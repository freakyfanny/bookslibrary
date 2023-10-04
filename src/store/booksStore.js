import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooksStore = defineStore("books", () => {
  const currentBook = ref(undefined);

  const booksLibrary = ref({});
  const numberFound = ref(0);
  const bookDetails = ref({});

  function setCurrentBook(book) {
    console.log("setting current book");
    console.log(book);
    currentBook.value = book;
  }

  async function getBookDetails() {
    console.log("key");
    console.log(currentBook.value.key);
    const url = "http://localhost:3000/bookDetails?key=";
    const result = await fetch(url + currentBook.value.key, {
      method: "get",
    })
      .then(async (response) => {
        const res = await response.json();
        return res;
      })
      .catch((error) => {
        console.error("Error in booksStore getBookDetails:", error);
      });

    bookDetails.value = result;
    return bookDetails.value;
  }

  async function searchBook(searchParam) {
    const url = "http://localhost:3000/search?limit=20&searchParam=";
    const result = await fetch(url + searchParam.replace(/\s/g, "+"), {
      method: "get",
    })
      .then(async (response) => {
        const res = await response.json();
        return res;
      })
      .catch((error) => {
        console.error("Error in booksStore searchBook:", error);
      });
    numberFound.value = result.numFound;

    booksLibrary.value = result.docs;
    return booksLibrary.value;
  }

  return {
    currentBook,
    booksLibrary,
    bookDetails,
    searchBook,
    setCurrentBook,
    getBookDetails,
  };
});
