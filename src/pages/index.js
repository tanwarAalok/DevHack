import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '@/components/LoginForm';

export default function Home() {
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
      <div className={styles.main_page}>
        <div className={styles.main_page_cover}></div>
        <div className={styles.mainpage_parent}>
          <div className={styles.authSection}>
            <h1>Welcome Back !</h1>
            <LoginForm />
            <Link href={"/register"}>
              <p>First time ? Sign up with us</p>
            </Link>
          </div>
          <div className={styles.quotes_section}>
            All-in-one platform <br /> providing recruiting and outreach
            services designed <br /> to help unorganized labour
          </div>
        </div>
      </div>
    </>
  );
}
