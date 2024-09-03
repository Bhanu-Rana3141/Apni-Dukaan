import React, { useState } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

const Modal = ({ closeModal, modalType, setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

    try {
      const url = modalType === "login" ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(`http://localhost:5000${url}`,formData);

      if (modalType === "login") {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsLoggedIn(true);
      }

      alert(response.data.message);
      closeModal();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${styles.active}`} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeModal}>
          &times;
        </button>
        <h2>{modalType === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {modalType === "register" && (
            <>
              <label htmlFor="name">Enter your name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />

              <label htmlFor="phone">Enter your phone number</label>
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </>
          )}

          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Enter password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            {modalType === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;