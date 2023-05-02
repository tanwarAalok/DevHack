import Image from 'next/image';
import React from 'react'
import Cat1 from "public/cat1.png";
import Cat2 from "public/cat2.png";
import Cat3 from "public/cat3.png";
import { useRouter } from 'next/router';

const UserHome = ({ styles }) => {
  const Router = useRouter();
    return (
      <>
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

export default UserHome;