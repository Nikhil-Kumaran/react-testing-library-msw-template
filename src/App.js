import "./App.css";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({
    status: "",
    message: ""
  });

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
          res.json().then((data) => {
            setStatus({
              status: "success",
              message: data.message
            });
          });
        } else {
          res.json().then((data) => {
            setStatus({
              status: "error",
              message: data.message
            });
          });
          setStatus("error");
        }
      })
      .catch(() => {
        console.log("network error");
      });
  };
  return (
    <div className="App">
      <main>
        {status.status === "success" ? (
          <span>Password changed successfully</span>
        ) : status.status === "error" ? (
          <span>Error: {status.message}</span>
        ) : null}

        <input type="text" value={username} aria-label="username" onChange={(e) => setUsername(e.target.value.trim())} />
        <input type="password" value={password} aria-label="password" onChange={(e) => setPassword(e.target.value.trim())} />
        <button onClick={handleSubmit}>Submit</button>
      </main>
    </div>
  );
}

export default App;
