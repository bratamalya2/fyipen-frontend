import { redirect } from "next/navigation";

import Urls from "@/config/urls";

const addToCart = async (e, bookId) => {
  try {
    e.stopPropagation();
    if (
      !localStorage.getItem("currentUser") ||
      localStorage.getItem("currentUser").length === 0
    )
      alert("Please login to access cart!!");
    else {
      const a = localStorage.getItem("authToken");
      const r = localStorage.getItem("refreshToken");
      const x = await fetch(`${Urls.BACKEND_API}cart/add`, {
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
      const y = await x.json();
      if (y.Error) {
        if (y.isAuthTokenExpired && y.isRefreshTokenExpired) {
          alert("Please login again");
          localStorage.removeItem("currentUser");
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          redirect("/");
        } else if (y.isAuthTokenExpired && !y.isRefreshTokenExpired) {
          localStorage.setItem("authToken", y.authToken);
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
          const tmp = await z.json();
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export default addToCart;
