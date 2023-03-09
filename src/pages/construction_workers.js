import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Explore.module.css";
import Avatar from "public/profile2.png";
import Image from "next/image";
import WorkerCard from "@/components/WorkerCard";

const Constructers = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/workers")
      .then((res) => res.json())
      .then((data) => {
        setData(data.workers);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No workers available</p>;

  const filterData = data.filter((d) => d.category === "Construction Workers");

  return (
    <>
      <Navbar />
      <div className={styles.explore_page}>
        <div className={styles.explore_head}>
          <h1>Construction workers</h1>
          <div className={styles.explore_head_buttons}>
            <button className={styles.green_btn}>Filter</button>
            <button className={styles.white_btn}>Sort</button>
          </div>
        </div>

        <div className={styles.cardParent}>
          {filterData?.map((worker) => (
            <>
              <WorkerCard worker={worker} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Constructers;
