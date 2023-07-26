"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

import Urls from "@/config/urls";
import addToCart from "@/components/addToCart";
import reduceFromCart from "@/components/reduceFromCart";

function Cart() {
  const [totalCost, setTotalCost] = useState(0);
  const [authToken, setAuthToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  const fetchCart = async () => {
    try {
      setIsCartUpdated(false);
      if (authToken.length > 0 && refreshToken.length > 0) {
        const x = await fetch(
          `${Urls.BACKEND_API}cart/getAll?authToken=${authToken}&refreshToken=${refreshToken}`
        );
        const y = await x.json();
        if (y.Error) {
          if (y.isAuthTokenExpired && y.isRefreshTokenExpired) {
            alert("Please login again");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            redirect("/");
          } else {
            localStorage.setItem("authToken", y.authToken);
            setAuthToken(y.authToken);
            // fetch again using new token
            const z = await fetch(`${Urls.BACKEND_API}cart/add`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                bookId: bookId,
                authToken: a,
                refreshToken: r,
                qty: 1,
              }),
            });
            const y2 = await z.json();
            if (y2.Error) redirect("/");
            else setCart(y2.items);
          }
        } else setCart(y.items);
      } else setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let total = cart.reduce((acc, cartItem) => {
      return acc + cartItem.item.price * cartItem.qty;
    }, 0);
    setTotalCost(total);
  }, [cart]);

  useEffect(() => {
    const a = localStorage.getItem("authToken");
    const r = localStorage.getItem("refreshToken");
    if (!a && !r) redirect("/");
    else {
      setIsCartUpdated(true);
      setAuthToken(a);
      setRefreshToken(r);
    }
  }, []);

  useEffect(() => {
    if (isCartUpdated) fetchCart();
  }, [authToken, refreshToken, isCartUpdated]);

  return (
    <main className="min-h-[400px] w-[50%] mx-auto mt-6 mb-16">
      <h2 className="text-center text-3xl pb-3 border-b-2 border-sky-600">
        Cart
      </h2>
      {cart.map((item, i) => (
        <div key={i} className="mb-4 py-2 border-b border-red-500 text-center">
          <div className="text-xl font-bold">{item.item.title}</div>
          <div className="text-xl">{item.item.author}</div>
          <div className="text-xl font-bold">Rs {item.item.price}</div>
          <div className="text-xl justify-center flex flex-nowrap font-bold my-3">
            <button
              onClick={(e) => {
                reduceFromCart(e, item.item["_id"]["$oid"]);
                setIsCartUpdated(true);
              }}
              className="rounded-full border-red-500 text-white bg-red-500 w-8 h-8 mx-3"
            >
              -
            </button>
            {item.qty}
            <button
              onClick={(e) => {
                addToCart(e, item.item["_id"]["$oid"]);
                setIsCartUpdated(true);
              }}
              className="rounded-full border-red-500 text-white bg-red-500 w-8 h-8 mx-3"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <h2 className="text-center text-3xl pb-3">Total Cost: Rs {totalCost}</h2>
    </main>
  );
}

export default Cart;
