import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
import styles from "@/styles/AuthPage.module.css";
import Image from "next/image";
import BgImg from "public/frontImg.png";
import { useRouter } from "next/router";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  const router = useRouter();
  useEffect(() => {
    const authToken = sessionStorage.getItem("token");
    if (authToken) {
      router.push("/home");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.auth_main_page}>
        <div className={styles.left}>
          <Image src={BgImg} alt="bg-image" />
        </div>
        <RegisterForm styles={styles}/>
        
      </div>
    </>
  );
};

export default Register;
