import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar';
import Avatar from "public/profile.png"
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.main_page}>
        <div className={styles.main_page_cover}></div>
        <div className={styles.mainpage_parent}>
          <div className={styles.authSection}>
            <Image src={Avatar} alt="avatar" />
            <Link href={"/login"}>
              <button>Login</button>
            </Link>
            <Link href="/signup_worker">
              <button className={styles.user_btn}>Signup as Worker</button>
            </Link>
            <Link href="/signup_user">
              <button className={styles.user_btn}>Signup as Recruiter</button>
            </Link>
          </div>
          <div className={styles.quotes_section}>
            All-in-one platform <br/> providing recruiting and outreach services
            designed <br/> to help unorganized labor
          </div>
        </div>
      </div>
    </>
  );
}
