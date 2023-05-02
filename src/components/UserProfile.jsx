import Image from "next/image";
import React, { useState } from "react";
import Avatar from "public/profile.png";

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

const UserProfile = ({ styles }) => {
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
      <form>
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
                <FaCamera  />
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
            <input disabled type="text" required />
          </div>
          <div className={styles.labelInput}>
            <label>Mobile Number*</label>
            <input
              type="text"
              disabled
              maxLength="10"
              minLength="10"
              required
            />
          </div>
        </div>



        {/* ********************************************* */}

        <button>Submit</button>
      </form>
    </div>
  );
};

export default UserProfile;
