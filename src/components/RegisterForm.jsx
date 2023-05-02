import React, { useState } from "react";
import Avatar from "public/profile.png";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import Image from "next/image";


function FaCamera(props) {
  return <svg style={{ cursor: 'pointer', position: 'absolute', bottom: '0px', right: '4px'}} stroke="currentColor" fill="dark-green" strokeWidth={0} viewBox="0 0 512 512" height="1.4em" width="1.4em" {...props}><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" /></svg>;
}



const RegisterForm = ({ styles }) => {
  const [role, setRole] = useState("worker");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const uploadBtn = () => {

  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (number.length !== 10) {
      toast.error("Invalid phone number!");
      return;
    }

    const body = JSON.stringify({ name, number, password, role });
    try {
      const res = await axios.post("/api/register", body, config);
      setLoading(false);
      sessionStorage.setItem("token", JSON.stringify(res.data.data));
      alert(res.data.message);
      role === "worker" ? router.push("/profile") : router.push("/home");
    } catch (err) {
      setLoading(false);
      alert(err.response.data.message);
      console.log(err.response.data);
    }

    
  };

  return (
    <div className={styles.right}>
      <div className={styles.avatarContainer}>
        <label htmlFor="upload-button">
          {image.preview ? (
            <div style={{ position: "relative" }}>
              <Image
                style={{ borderRadius: "50%"}}
                src={image.preview}
                alt="avatar"
                width="150"
                height="150"
              />
              <FaCamera onClick={uploadBtn} />
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <Image
                style={{ borderRadius: "50%"}}
                src={Avatar}
                alt="avatar"
                width="150"
                height="150"
              />
              <FaCamera onClick={uploadBtn} />
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

      <div className={styles.formContainer}>
        <h1>Hi, there!</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.labelInput}>
            <label>Name*</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.labelInput}>
            <label>Mobile Number*</label>
            <input
              type="text"
              value={number}
              maxLength="10"
              minLength="10"
              required
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className={styles.labelInput}>
            <label>Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.labelInput}>
            <label>Role*</label>
            <div className={styles.catOption}>
              <div
                className={role === "worker" ? `${styles.select}` : ""}
                onClick={() => setRole("worker")}
              >
                Worker
              </div>
              <div
                className={role === "user" ? `${styles.select}` : ""}
                onClick={() => setRole("user")}
              >
                User
              </div>
            </div>
          </div>

          <button disabled={loading} type="submit">
            {loading ? <Spinner /> : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
