import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.main_page}>
        <div className={styles.main_page_cover}></div>
        <div className={styles.mainpage_parent}>
          <div className={styles.authSection}>
            <h1>Welcome Back !</h1>
            <input required type="number" placeholder="Mobile Number" />
            <input required type="password" placeholder="Password" />
            <Link href={"/login"}>
              <button>Login</button>
            </Link>
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
