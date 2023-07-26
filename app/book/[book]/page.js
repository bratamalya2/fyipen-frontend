"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Urls from "@/config/urls";
import addToCart from "@/components/addToCart";

function Book({ params }) {
  const [bookDetails, setBookDetails] = useState({});

  const fetchBookDetails = async () => {
    try {
      const x = await fetch(
        `${Urls.BACKEND_API}getBookDetails?bookId=${params.book}`
      );
      const y = await x.json();
      setBookDetails(y);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  if (Object.keys(bookDetails).length > 0)
    return (
      <main className="mx-4 my-8 py-4 px-2 border rounded-lg !border-red-500 flex flex-col flex-nowrap items-center">
        <Image
          src={bookDetails.imgUrl}
          width={200}
          height={350}
          alt="Book"
          style={{
            height: "350px",
            width: "350px",
            marginLeft: "auto",
            marginRight: "auto",
            objectFit: "contain",
          }}
        />
        <h2 className="my-2 font-bold text-lg text-center">
          {bookDetails.title}
        </h2>
        <h4 className="my-2 font-bold text-center">
          {bookDetails.author} (Author)
        </h4>
        <p className="text-justify">{bookDetails.description}</p>
        <p className="text-justify font-bold">Rs {bookDetails.price}</p>
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={(e) => addToCart(e, bookDetails["_id"]["$oid"])}
        >
          Add To Cart
        </button>
      </main>
    );
  else return null;
}

export default Book;
