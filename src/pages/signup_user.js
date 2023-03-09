import Navbar from '@/components/Navbar'
import UserForm from '@/components/UserForm'
import React from 'react'
import styles from "@/styles/AuthPage.module.css";

const Signup_user = () => {
  return (
      <>
        <Navbar/>
        <div className={styles.auth_main_page}>
            <UserForm/>
        </div>
      </>
  )
}

export default Signup_user;