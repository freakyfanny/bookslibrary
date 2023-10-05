import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooksStore = defineStore("books", () => {
  const currentBook = ref(undefined);

  const loading = ref(false);
  const booksLibrary = ref([]);
  const numberFound = ref(0);
  const bookDetails = ref({});
  const offset = ref(0);
  const searchPhrase = ref("");

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

  function clearSearchPhrase() {
    searchPhrase.value = "";
  }

  async function searchBook(searchParam) {
    let newSearch = true;
    console.log('lollalala');
    console.log(searchParam != searchPhrase.value || searchPhrase.value == '');
    if(searchParam != searchPhrase.value || searchPhrase.value == '') {
      offset.value = 0;
      newSearch = true;
    } else {
      newSearch = false;
    }

    if (searchParam) {
      searchPhrase.value = searchParam.replace(/\s/g, "+");
    }

    const url = `http://localhost:3000/search?limit=20&offset=${offset.value}&searchParam=`;
    const result = await fetch(url + searchPhrase.value, {
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


    console.log(numberFound);
    console.log(booksLibrary);
    console.log('newSearch');
    console.log(newSearch);
    if(booksLibrary.value.length > 0 && !newSearch){
      const newValue = result ? result.docs.concat(booksLibrary.value) : [];
      console.log('newValue');
      console.log(result);
      console.log(booksLibrary.value);
      console.log(newValue);
      booksLibrary.value = newValue;
    } else {
      console.log('lol');
      booksLibrary.value = result ? result.docs : [];
    }

    setLoading(false);


    if (numberFound.value > 20 && offset.value != numberFound.value - 20) {
      offset.value += 20;
      searchPhrase.value = searchParam;
    }

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
    clearSearchPhrase,
    setLoading,
    getLoading,
    searchBook,
    setCurrentBook,
    getBookDetails,
  };
});
