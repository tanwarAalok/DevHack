import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Home() {

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginSubmit = async (e) => {
    e.preventDefault();
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
      console.error(err.message);
      throw err;
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.main_page}>
        <div className={styles.main_page_cover}></div>
        <div className={styles.mainpage_parent}>
          <div className={styles.authSection}>
            <h1>Welcome Back !</h1>
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
            <button onClick={loginSubmit}>Login</button>
            <Link href={"/register"}>
              <p>First time ? Sign up with us</p>
            </Link>
          </div>
          <div className={styles.quotes_section}>
            All-in-one platform <br /> providing recruiting and outreach
            services designed <br /> to help unorganized labor
          </div>
        </div>
      </div>
    </>
  );
}
