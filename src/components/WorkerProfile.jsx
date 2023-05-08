import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "public/profile.png";
import { useRouter } from "next/router";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function FaCamera(props) {
  return (
    <svg
      style={{
        cursor: "pointer",
        position: "absolute",
        bottom: "0px",
        right: "4px",
      }}
      stroke="currentColor"
      fill="dark-green"
      strokeWidth={0}
      viewBox="0 0 512 512"
      height="1.4em"
      width="1.4em"
      {...props}
    >
      <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
    </svg>
  );
}

const WorkerProfile = ({ styles }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const [data, setData] = useState(null);
  const [wage, setWage] = useState(data?.wage || "");
  const [category, setCategory] = useState(data?.category || "");
  const [upi, setUpi] = useState(data?.upi || "");

  useEffect(() => {
    const authToken = sessionStorage.getItem("token");
    if (!authToken) {
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

  useEffect(() => {
    if (data) {
      setWage(data.wage);
      setUpi(data.upi);
      setCategory(data.category);
    }
  }, [data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/workers/${JSON.parse(token)._id}`, {
        wage,
        upi,
        category,
      });
      alert("Profile Updated !");
      router.push("/home");
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  const [image, setImage] = useState({ preview: "", raw: "" });
  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  return (
    <div className={styles.mainPage}>
      <form onSubmit={onSubmit}>
        <div className={styles.imgWrapper}>
          <label htmlFor="upload-button">
            {image.preview ? (
              <div style={{ position: "relative" }}>
                <Image
                  style={{ borderRadius: "50%" }}
                  src={image.preview}
                  alt="avatar"
                  width="150"
                  height="150"
                />
                <FaCamera />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <Image
                  style={{ borderRadius: "50%" }}
                  src={Avatar}
                  alt="avatar"
                  width="150"
                  height="150"
                />
                <FaCamera />
              </div>
            )}
          </label>

          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {/* ********************************************* */}

        <div className="d-flex justify-content-between gap-5">
          <div className={styles.labelInput}>
            <label>Name*</label>
            <input disabled type="text" required value={data?.name} />
          </div>
          <div className={styles.labelInput}>
            <label>Mobile Number*</label>
            <input
              type="text"
              disabled
              maxLength="10"
              minLength="10"
              required
              value={data?.number}
            />
          </div>
        </div>

        {/* ********************************************* */}

        <div className="d-flex justify-content-between gap-5">
          <div className={styles.labelInput}>
            <label>Enter UPI Id*</label>
            <input
              type="text"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              required
            />
          </div>
          <div className={styles.labelInput}>
            <label>Expected Wage*</label>
            <input
              type="number"
              value={wage}
              onChange={(e) => setWage(e.target.value)}
              required
            />
          </div>
        </div>

        {/* ********************************************* */}

        <div className={styles.labelInput}>
          <select
            value={category || "null"}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="null">--Select Work Type--</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="labourer">Labourer</option>
          </select>
        </div>

        {/* ********************************************* */}

        <button disabled={isLoading} type="submit">
          {isLoading ? <Spinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default WorkerProfile;
