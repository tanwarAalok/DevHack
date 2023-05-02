import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Landing.module.css";
import { useRouter } from "next/router";
import WorkerHome from "@/components/WorkerHome";
import UserHome from "@/components/UserHome";

const LandingPage = () => {
  const router = useRouter();
  const [role, setRole] = useState("user");

  useEffect(() => {
    const authToken = sessionStorage.getItem("token");
    if (authToken) {
      setRole(JSON.parse(authToken).role);
    } else {
      sessionStorage.removeItem("token");
      router.push("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      {role === "worker" ? (
        <WorkerHome />
      ) : (
        <UserHome styles={styles} />
      )}
    </>
  );
};

export default LandingPage;
