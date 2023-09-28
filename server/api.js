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

const mapToBookStructure = async (books) => {
  const mapResult = await Promise.all(books.map( async function (book) {
    console.log("current book in map");
    console.log(book);
    let updatedBook;

    if (book.oclc?.length > 0) {
        updatedBook = await getBook(book.oclc[0], "oclc");
    } else if (book.isbn?.length > 0) {
        updatedBook = await getBook(book.isbn[0], "isbn");
    }

    console.log('updatedBook');
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
  }));

  console.log("mapResult");
  console.log(mapResult);

  return mapResult;
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

const getBook = async (id, type) => {
  const response = await fetch(
    `${url}/api/books?bibkeys=${type}%3A${id}&format=json&jscmd=viewapi`,
    {
      headers: {
        accept: "application/json",
      },
    }
  )
    .then((response) => {
      console.log("inside Get Book", response);

      return response;
    })
    .catch((err) => {
      console.log(`Fetch error: ${err}`);
    });

  const result = await response.json();
  console.log('--- get book ---')
  console.log(result);
  return result[`${type}:${id}`];
};
