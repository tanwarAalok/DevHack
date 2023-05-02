import React, { useEffect, useState } from 'react';
import styles from "@/styles/WorkerHome.module.css"

const WorkerHome = () => {
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

useEffect(() => {
  const authToken = sessionStorage.getItem("token");
  if (!authToken) {
    sessionStorage.removeItem("token");
    router.push("/");
  }
  setToken(authToken);
  
}, []);

useEffect(() => {
  setLoading(true);
  if (token) {
    fetch(`/api/workers/${JSON.parse(token)._id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }
}, [token]);
  
  console.log("TOKEN: ", token);
  console.log("DATA: ", data);

  return (
    <div className={styles.mainPage}>
      {isLoading ? <h1>Loading....</h1> : <h1>Welcome {data?.name}!</h1>}
    </div>
  );
}

export default WorkerHome