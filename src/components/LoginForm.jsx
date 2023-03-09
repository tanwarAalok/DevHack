import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import Avatar from "public/profile.png";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log(number, " ", password);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ number, password });

    try {
      const res = await axios.post("/api/login", body, config);
      localStorage.setItem("token", res.data);
      router.push("/home");
    } catch (err) {
      console.error(err.response.data);
      throw err;
    }
  };

  return (
    <form className={styles.login_form} onSubmit={loginSubmit}>
      <Image src={Avatar} alt="image" />

      <div className={styles.lable_input}>
        <label>Mobile Number*</label>
        <input
          placeholder="Mobile Number"
          value={number}
          type="text"
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className={styles.lable_input}>
        <label>Password*</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
