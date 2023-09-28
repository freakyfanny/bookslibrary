const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const url = "https://openlibrary.org";

const app = express();
app.use(cors());

app.listen(3000, () => {
  console.log("Server Listening on PORT:", 3000);
});

app.get("/books", async (request, response) => {
  const result = await getBook(request.query.id, request.query.type);
  console.log("books result", result);
  response.send(result);
});

app.get(`/search`, async (request, response) => {
  const result = await search(request.query.searchParam);

  //TODO: hämta enligt limit och start
  console.log(request.query.limit);
  console.log(request.query.start);
  console.log("before");
  console.log(result.docs);
  let sliced = Object.values(result.docs).slice(0, request.query.limit);

  const updatedBooks = await mapToBookStructure(sliced);
  result.docs = updatedBooks;
  console.log("after");
  console.log(updatedBooks);
  response.send(result);
});

const mapToBookStructure = (books) => {
  const mapresult = books.map( function (book) {
    console.log('current book in map');
    console.log(book);
    let updatedBook;

    if (book.oclc?.length > 0) {
      updatedBook = getBook(book.oclc[0], "oclc");
    } else if (book.isbn?.length > 0) {
      updatedBook = getBook(book.isbn[0], "isbn");
    }
    console.log("fetched book in map");
    console.log(updatedBook);
    return {
      ...updatedBook,
      title: book.title,
      oclc: book.oclc,
      isbn: book.isbn,
      author: book.author_name,
      authorKey: book.author_key,
      category: book.subject_facet?.slice(0, 5),
    };
  });
  console.log('----------result from map-------');
  console.log(mapresult);
  return mapresult;
  //return books.map(book => ({ title: book.title, oclc: book.oclc, isbn: book.isbn, author: book.author_name, authorKey: book.author_key, category: book.subject_facet?.slice(0,5)}));
};

const search = (query) => {
  return fetch(`${url}/search.json?q=${query}`, {
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => {
      console.log("inside Search", response);
      return response.json();
    })
    .catch((err) => {
      console.log(`Fetch error: ${err}`);
    });
};

const getBook = (id, type) => {
  return fetch(
    `${url}/api/books?bibkeys=${type}%3A${id}&format=json&jscmd=viewapi`,
    {
      headers: {
        accept: "application/json",
      },
    }
  )
    .then(async (response) => {
      const result = await response.json();
      console.log("inside Get Book", result);

      return result;
    })
    .catch((err) => {
      console.log(`Fetch error: ${err}`);
    });
};
