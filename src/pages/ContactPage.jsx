import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function ContactPage() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "508b457a-6fa1-49fa-ad13-5c7b3dc62393"); 
    formData.append("to_email", "shishyodya@gmail.com"); 

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Contact Us</h1>
      <div className="contact-info-grid">
        <div className="contact-card">
          <div className="contact-icon"><FontAwesomeIcon icon={faSquareEnvelope} color="blue" /></div>
          <h3>Email Us</h3>
          <p className="contact-detail">support@travelplanner.com</p>
          <p className="contact-note">We'll respond within 24 hours</p>
        </div>
        <div className="contact-card">
          <div className="contact-icon"><FontAwesomeIcon icon={faPhone} color="blue" /></div>
          <h3>Call Us</h3>
          <p className="contact-detail">+91 9368809698</p>
          <p className="contact-note">Mon-Fri 9AM-6PM EST</p>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Send us a Message</h2>
          <p>Have a question or suggestion? We'd love to hear from you!</p>
        </div>
        <div className="card-content">
          <form onSubmit={onSubmit} className="form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Name *</label>
                <input id="contact-name" type="text" name="name" required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email *</label>
                <input id="contact-email" type="email" name="email" required className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message *</label>
              <textarea id="contact-message" name="message" rows={5} required className="form-textarea" />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Submit Form</button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </div>
  );
}