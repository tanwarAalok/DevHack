import React, { useState } from 'react';
import styles from "@/styles/AuthForm.module.css";
import Avatar from "public/profile.png"
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

const UserForm = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [upi, setUpi] = useState("");


  const router = useRouter();

  const registerSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const role = "user";

    const body = JSON.stringify({
      number,
      password,
      name,
      upi,
      role,
    });

    try {
      const res = await axios.post("/api/signup_user", body, config);
      localStorage.setItem("token", res.data);
      alert("Recruiter registered successfully");
      router.push("/home");
    } catch (err) {
      console.error(err.message);
      alert("Something went wrong!!");
      throw err;
    }
  };
  return (
    <form className={styles.form} onSubmit={registerSubmit}>
      <Image src={Avatar} alt="image" />

      <div className={styles.flex_cont}>
        <div className={styles.lable_input}>
          <label>Name*</label>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.lable_input}>
          <label>Mobile Number*</label>
          <input
            placeholder="Mobile Number"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.flex_cont}>
        <div className={styles.lable_input}>
          <label>UPI Id*</label>
          <input
            placeholder="UPI Id"
            onChange={(e) => setUpi(e.target.value)}
          />
        </div>
        <div className={styles.lable_input}>
          <label>Password*</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button type='submit'>Create Account</button>
    </form>
  );
}

export default UserForm