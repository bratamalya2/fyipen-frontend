import Link from "next/link";

export default function Header({
  currentUser,
  handleShowLogin,
  handleShowSignup,
  setCurrentUser,
  setAuthToken,
  setRefreshToken,
}) {
  const clickLogout = () => {
    setCurrentUser("");
    setAuthToken("");
    setRefreshToken("");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <header className="bg-red-600 px-1 h-16 flex flex-nowrap items-center md:px-5 sticky top-0">
      <h3 className="text-white text-lg md:text-3xl font-bold mr-6">
        BooksCart
      </h3>
      <Link href="/">
        <h5 className="text-white cursor-pointer md:text-lg hover:text-sky-500 mx-3">
          Home
        </h5>
      </Link>
      {currentUser.length > 0 && (
        <Link href="/cart">
          <h5 className="text-white cursor-pointer md:text-lg hover:text-sky-500 mx-3">
            Cart
          </h5>
        </Link>
      )}
      {currentUser.length > 0 ? (
        <h5
          className="text-white md:text-lg hover:text-sky-500 ml-auto mr-3"
          onClick={() => {
            if (currentUser.length === 0) handleShowLogin();
          }}
        >
          {currentUser}
        </h5>
      ) : (
        <h5
          className="text-white cursor-pointer md:text-lg hover:text-sky-500 ml-auto mr-3"
          onClick={() => {
            if (currentUser.length === 0) handleShowLogin();
          }}
        >
          Login
        </h5>
      )}
      {currentUser.length === 0 && (
        <h5
          className="text-white cursor-pointer md:text-lg hover:text-sky-500 mr-3"
          onClick={handleShowSignup}
        >
          SignUp
        </h5>
      )}
      {currentUser.length > 0 && (
        <Link href="/">
          <h5
            className="text-white cursor-pointer md:text-lg hover:text-sky-500 mr-0"
            onClick={clickLogout}
          >
            LogOut
          </h5>
        </Link>
      )}
    </header>
  );
}
