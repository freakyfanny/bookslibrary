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

app.get("/bookDetails", async (request, response) => {
  const result = await getBookDetails(request.query.key);
  console.log("bookDetails result", result);
  response.send(result);
});


app.get("/isbnDetails", async (request, response) => {
  const result = await getIsbnDetails(request.query.isbn);
  console.log("IsbnDetails result", result);
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
    let updatedBook, bookDetails, isbnDetails;

    console.log('isbn');
    console.log(book.isbn);
    if (book.isbn?.length > 0) {
      updatedBook = await getBook(book.isbn[0], "isbn");
      bookDetails = await getBookDetails(book.key);
      // isbnDetails = await getIsbnDetails(book.isbn[0]);
    } else if (book.oclc?.length > 0) {
        updatedBook = await getBook(book.oclc[0], "oclc");
        bookDetails = await getBookDetails(book.key);
    }

    // console.log('isbnDetails');
    // console.log(isbnDetails);

    console.log('updatedBook');
    console.log(updatedBook);

    return {
      ...isbnDetails,
      ...bookDetails,
      ...updatedBook,
      publishDate: book.first_publish_year,
      rating: book.ratings_average,
      ratingCount: book.ratings_count,
      wantRead: book.want_to_read_count,
      currentlyReading: book.currently_reading_count,
      alreadyRead: book.already_read_count,
      pages: book.number_of_pages_median,
      key: book.key,
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
      console.log(`ERror in search: ${err}`);
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
      console.log(`Error in getBook: ${err}`);
    });

  const result = await response.json();
  return result[`${type}:${id}`];
};


const getBookDetails = async (key) => {
  const response = await fetch(
    `${url}/${key}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  )
    .then((response) => {
      console.log("inside GetBookDetails", response);

      return response;
    })
    .catch((err) => {
      console.log(`Fetch error: ${err}`);
    });

  const result = await response.json();
  return result;
};

const getIsbnDetails = async (isbn) => {
  const response = await fetch(
    `${url}/isbn/${isbn}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  )
    .then((response) => {
      console.log("inside GetIsbnDetails", response);

      return response;
    })
    .catch((err) => {
      console.log(`Error in getIsbnDetails: ${err}`);
    });

  const result = await response.json();
  return result;
};