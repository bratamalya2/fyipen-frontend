import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import Urls from "../config/urls";

function Login({
  showLogin,
  handleCloseLogin,
  setCurrentUser,
  setAuthToken,
  setRefreshToken,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitLoginDetails = async (e) => {
    try {
      e.preventDefault();
      if (username.length > 0 && password.length > 0) {
        const x = await fetch(`${Urls.BACKEND_API}login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            name: username,
            password: password,
          }),
        });
        const res = await x.json();
        if (res.Success) {
          setCurrentUser(username);
          setAuthToken(res.jwtToken);
          setRefreshToken(res.refreshToken);
        } else alert(res.Error);
      } else {
        alert("Please fill login info!");
      }
      handleCloseLogin();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal size="sm" show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <label style={{ marginRight: "4px" }}>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                onInput={(e) => setUsername(e.target.value)}
                style={{ minWidth: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ marginRight: "8px" }}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                onInput={(e) => setPassword(e.target.value)}
                style={{ minWidth: "100%" }}
              />
            </div>
            <button
              className="p-2 border-2 border-solid rounded"
              onClick={(e) => submitLoginDetails(e)}
            >
              Login
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleCloseLogin}
            style={{
              borderColor: "rgb(239, 68, 68)",
              color: "rgb(239, 68, 68)",
            }}
            className="p-2 border-2 border-solid rounded"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
