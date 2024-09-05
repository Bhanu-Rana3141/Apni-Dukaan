import React, { useState } from "react";
import styles from "./Contact.module.css";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      alert(response.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>

        <h2 className={styles.formHeading}>Send us a message</h2>

        <div className={styles.rows}>
          <div className={styles.row1}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row2}>
            <label className={styles.label} htmlFor="phone">
              Phone:
            </label>
            <input
              className={styles.input}
              type="tel"
              id="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label className={styles.label} htmlFor="description">
              Description:
            </label>
            <textarea
              className={styles.input}
              id="description"
              placeholder="Enter you message"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
