import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooksStore = defineStore("books", () => {
  const currentBook = ref(undefined);

  const loading = ref(false);
  const booksLibrary = ref({});
  const numberFound = ref(0);
  const bookDetails = ref({});

  function setCurrentBook(book) {
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
    setLoading(false);

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
    numberFound.value = result ? result.numFound : 0;

    booksLibrary.value = result ? result.docs : [];
    setLoading(false);
    
    return booksLibrary.value;
  }

  function setLoading(value) {
    loading.value = value;
  }

  function getLoading() {
    return loading.value;
  }

  return {
    currentBook,
    booksLibrary,
    numberFound,
    bookDetails,
    loading,
    setLoading,
    getLoading,
    searchBook,
    setCurrentBook,
    getBookDetails,
  };
});
