import React, { useEffect, useState } from "react";
import styles from "@/styles/Explore.module.css";
import WorkerCard from "@/components/WorkerCard";
import { useRouter } from "next/router";
import { WORKER_TYPES } from "@/utils/workerTypes";

const Workers = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);


//*TODO: let user go back, currently showing 404 , can't go back
  // useEffect(() => {
  //   if (!Object.values(WORKER_TYPES).includes(router.query.worker)) {
  //     router.push("/404");
  //   }
  // }, [router])

  useEffect(() => {
    setLoading(true);
    fetch("/api/workers")
      .then((res) => res.json())
      .then((data) => {
        setData(data.workers);
        setLoading(false);
      });
  }, []);

  const filterData = data.filter((d) => d.verified && d.category === router.query.worker);

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.explore_page}>
        <div className={styles.explore_head}>
          <h1>{router.query.worker}</h1>
          <div className={styles.explore_head_buttons}>
            <button className={styles.green_btn}>Filter</button>
            <button className={styles.white_btn}>Sort</button>
          </div>
        </div>

        <div className={styles.cardParent}>
          {isLoading ? (
            <h3>Loading...</h3>
          ) : !filterData || filterData.length == 0 ? (
            <h3>No workers available !!</h3>
          ) : (
            filterData?.map((worker) => (
              <>
                <WorkerCard worker={worker} />
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Workers;
