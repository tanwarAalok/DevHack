import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from "react"
import styles from "@/styles/Explore.module.css";
import Avatar from "public/profile2.png"
import Image from 'next/image';

const Plumbers = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('/api/workers')
      .then((res) => res.json())
      .then((data) => {
        setData(data.workers)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No workers available</p>

  const filterData = data.filter((d) => d.category === "Plumber");

  return (
    <>
      <Navbar />
      <div className={styles.explore_page}>
        <div className={styles.explore_head}>
          <h1>Plumbers</h1>
          <div className={styles.explore_head_buttons}>
            <button className={styles.green_btn}>Filter</button>
            <button className={styles.white_btn}>Sort</button>
          </div>
        </div>

        {filterData?.map((worker) => (
          <>
            <div className={styles.explore_card}>
              <div className={styles.card_content}>
                <div className={styles.image_rating}>
                  <Image src={Avatar} alt="image" width="100" height="100" />
                  <p>4 Stars | 500+ Reviews</p>
                </div>
                <div className={styles.name_desc}>
                  <h3>{worker.name}</h3>
                  <h5>5+ years of Experience</h5>
                  <p>
                    Lorem ipsydn dandnans ookdlam xld ad a dadnoawd ad adoawd
                    oawdoahwdn awudhawduaiudw.{" "}
                  </p>
                </div>
              </div>
              <div className={styles.btn_cont}>
                <button className={styles.green_btn}>Book now</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Plumbers;