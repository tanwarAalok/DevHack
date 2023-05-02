import UserProfile from "@/components/UserProfile";
import WorkerProfile from "@/components/WorkerProfile";
import React, { useEffect, useState } from "react";
import styles from "@/styles/ProfilePage.module.css";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const [role, setRole] = useState("user");
  const router = useRouter();

  useEffect(() => {
    const authToken = sessionStorage.getItem('token');
    if (authToken) setRole(JSON.parse(authToken).role);
    else router.push("/");
  }, []);

  return (
    <>
      <Navbar />
      {role === "worker" ? (
        <WorkerProfile styles={styles} />
      ) : (
        <UserProfile styles={styles} />
      )}
    </>
  );
};

export default ProfilePage;
