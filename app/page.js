"use client";
import { useState, useEffect } from "react";

import Urls from "../config/urls";
import BookCard from "@/components/bookCard";
import Pages from "@/components/pages";
import addToCart from "@/components/addToCart";
import SearchBook from "@/components/searchBook";

export default function Home() {
  const itemsPerPage = 9;
  const [debounceSearch, setDebounceSearch] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minBookIndex, setMinBookIndex] = useState(0);
  const [maxBookIndex, setMaxBookIndex] = useState(0);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((curr) => curr + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((curr) => curr - 1);
  };

  const fetchBooks = async () => {
    try {
      const x = await fetch(`${Urls.BACKEND_API}getBooks`);
      const b = await x.json();
      setBooks(b);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSearchedBooks = async () => {
    try {
      const x = await fetch(
        `${Urls.BACKEND_API}findBook?searchStr=${searchText}`
      );
      const y = await x.json();
      setBooks(y);
      setDebounceSearch(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchText.length === 0) {
      fetchBooks();
      return;
    } else if (debounceSearch !== null) {
      setDebounceSearch((curr) => {
        clearTimeout(curr);
        return null;
      });
    }
    const x = setTimeout(fetchSearchedBooks, 2500);
    setDebounceSearch(x);
  }, [searchText]);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    setMinBookIndex((currentPage - 1) * itemsPerPage);
    setMaxBookIndex((currentPage - 1) * itemsPerPage + itemsPerPage - 1);
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(Math.ceil(books.length / itemsPerPage));
  }, [books]);

  return (
    <main className="px-8 md:px-80 mb-6">
      <SearchBook searchText={searchText} setSearchText={setSearchText} />
      <section className="flex flex-wrap justify-between items-center">
        {books.map((book, i) => {
          if (i >= minBookIndex && i <= maxBookIndex)
            return (
              <BookCard
                key={book.id}
                bookId={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                price={book.price}
                imgUrl={book.imgUrl}
                addToCart={(e) => addToCart(e, book.id)}
              />
            );
        })}
      </section>
      <Pages
        currentPage={currentPage}
        totalPages={totalPages}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
