"use client";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";

import Header from "./header";
import Footer from "./footer";
import Login from "../components/login";
import Signup from "../components/signup";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  useEffect(() => {
    const a = localStorage.getItem("authToken");
    if (a) setAuthToken(a);
    const r = localStorage.getItem("refreshToken");
    if (r) setRefreshToken(r);
    const u = localStorage.getItem("currentUser");
    if (u) setCurrentUser(u);
  }, []);

  useEffect(() => {
    if (authToken.length > 0) localStorage.setItem("authToken", authToken);
    if (refreshToken.length > 0)
      localStorage.setItem("refreshToken", refreshToken);
  }, [authToken, refreshToken]);

  useEffect(() => {
    if (currentUser.length > 0)
      localStorage.setItem("currentUser", currentUser);
  }, [currentUser]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setAuthToken={setAuthToken}
          setRefreshToken={setRefreshToken}
          handleShowLogin={handleShowLogin}
          handleShowSignup={handleShowSignup}
        />
        {children}
        <Footer />
        <Login
          showLogin={showLogin}
          handleCloseLogin={handleCloseLogin}
          setCurrentUser={setCurrentUser}
          setAuthToken={setAuthToken}
          setRefreshToken={setRefreshToken}
        />
        <Signup showSignup={showSignup} handleCloseSignup={handleCloseSignup} />
        <script
          src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
          crossorigin
        ></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
          crossorigin
        ></script>

        <script
          src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        ></script>
      </body>
    </html>
  );
}
