import Image from 'next/image';
import React from 'react'
import styles from "@/styles/WorkerCard.module.css"
import Avatar from "public/profile2.png";

const WorkerCard = ({worker}) => {
  return (
    <div className={styles.explore_card}>
      <div className={styles.image_rating}>
        <Image src={Avatar} alt="image" width="100" height="100" />
      </div>
      <div className={styles.card_desc}>
        <h3>{worker.name}</h3>
        <p>5+ years of Experience</p>
        <p>4 Stars | 500+ Reviews</p>
      </div>
      <button className={styles.green_btn}>Book now</button>
    </div>
  );
}

export default WorkerCard