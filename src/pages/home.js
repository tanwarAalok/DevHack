import Navbar from '@/components/Navbar'
import React, { useEffect } from 'react';
import styles from "@/styles/Landing.module.css";
import Router, { useRouter } from "next/router";
import Image from 'next/image';
import Cat1 from "public/cat1.png"
import Cat2 from "public/cat2.png"
import Cat3 from "public/cat3.png"

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = sessionStorage.getItem("token");
    if (!authToken) {
      router.push("/");
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <div className={styles.landing_p1}>
        <div className={styles.landing_cover}></div>
        <h1>
          {" "}
          We got all type <br />
          of
          <br /> workers you need.
        </h1>
      </div>

      <div className={styles.landing_p2}>
        <div className={styles.cat_cont}>
          <div
            className={styles.cat_card}
            onClick={() => Router.push("workers/plumber")}
          >
            <Image src={Cat1} alt="card image" />
            <h3>Plumber</h3>
          </div>
          <div
            className={styles.cat_card}
            onClick={() => Router.push("workers/electrician")}
          >
            <Image src={Cat2} alt="card image" />
            <h3>Electricians</h3>
          </div>
          <div
            className={styles.cat_card}
            onClick={() => Router.push("workers/labourer")}
          >
            <Image src={Cat3} alt="card image" />
            <h3>Labourers</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;