import Image from 'next/image';
import React, { useState } from 'react'
import styles from "@/styles/WorkerCard.module.css"
import Avatar from "public/profile2.png";
import WorkerBooked from './WorkerBookModal';

const WorkerCard = ({ worker }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className={styles.explore_card}>
      <div className={styles.image_rating}>
        <Image src={Avatar} alt="image" width="140" height="140" />
      </div>
      <div className={styles.card_desc}>
        <h3>{worker.name}</h3>
        <div className={styles.workerData}>
          <div>
            <h5>100</h5>
            <p>Bookings</p>
          </div>
          <div>
            <h5>4.5⭐</h5>
            <p>Ratings</p>
          </div>
          <div>
            <h5>2</h5>
            <p>Year</p>
          </div>
        </div>
      </div>
      <button onClick={() => setModalShow(true)} className={styles.green_btn}>
        Book now
      </button>
      <WorkerBooked show={modalShow} onHide={() => setModalShow(false)} workerid={worker._id} />
    </div>
  );
}

export default WorkerCard