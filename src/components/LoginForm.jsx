import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

const LoginForm = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ number, password });

    try {
      const res = await axios.post("/api/login", body, config);
      sessionStorage.setItem("token", JSON.stringify(res.data.data));
      setLoading(false);
      alert(res.data.message);
      router.push("/home");
    } catch (err) {
      console.error(err.message);
      setLoading(false);
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={loginSubmit}>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
        type="number"
        placeholder="Mobile Number"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        type="password"
        placeholder="Password"
      />
      <button disabled={loading} type="submit">
        {loading ? <Spinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
