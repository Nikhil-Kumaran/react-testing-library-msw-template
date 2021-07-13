import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:3001/changePassword", {
      method: "POST",
      body: {
        username,
        password
      }
    })
      .then((res) => {
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        console.log("network error");
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>

      <main>
        {status === "success" ? <span>Password changed successfully</span> : status === "error" ? <span>Error in changing password</span> : null}

        <input type="text" value={username} aria-label="username" onChange={(e) => setUsername(e.target.value.trim())} />
        <input type="password" value={password} aria-label="password" onChange={(e) => setPassword(e.target.value.trim())} />
        <button onClick={handleSubmit}>Submit</button>
      </main>
    </div>
  );
}

export default App;
