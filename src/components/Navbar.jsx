import React from 'react';
import styles from "@/styles/Navbar.module.css";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className={styles.navbar_comp}>
      <div className={styles.navbar_link_cont}>
        <Link href={"/contact"}>Contact Us</Link>
        <Link href={"/faq"}>FAQs</Link>
      </div>
    </div>
  );
}

export default Navbar