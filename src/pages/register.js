import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import styles from "@/styles/AuthPage.module.css";
import BgImg from "public/frontImg.png"
import Image from 'next/image';
import Avatar from "public/profile.png"

const Register = () => {
  const [ btnSelect, setBtnselect ] = useState("worker");

  return (
    <>
      <Navbar />
      <div className={styles.auth_main_page}>
        <div className={styles.left}>
          <Image src={BgImg} alt="bg-image" />
        </div>

        <div className={styles.right}>
          <div className={styles.avatarContainer}>
            <Image src={Avatar} alt="avatar" width="150" height="150" />
          </div>

          <div className={styles.formContainer}>
            <h1>Hi, there!</h1>
            <div className={styles.form}>
              <div className={styles.labelInput}>
                <label>Name*</label>
                <input required />
              </div>
              <div className={styles.labelInput}>
                <label>Mobile Number*</label>
                <input required />
              </div>
              <div className={styles.labelInput}>
                <label>Password*</label>
                <input required />
              </div>

              <div className={styles.labelInput}>
                <label>Categories*</label>
                <div className={styles.catOption}>
                  <button
                    className={btnSelect === "worker" ? `${styles.select}` : ""}
                    onClick={() => setBtnselect("worker")}
                  >
                    Worker
                  </button>
                  <button
                    className={btnSelect === "user" ? `${styles.select}` : ""}
                    onClick={() => setBtnselect("user")}
                  >
                    User
                  </button>
                </div>
              </div>

              <button>Create Account</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;