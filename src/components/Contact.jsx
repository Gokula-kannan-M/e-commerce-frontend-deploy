import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg rounded-4">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Contact Us</h2>
              <p className="text-center text-muted mb-4">
                Have questions about your order or our products? Send us a message and our team will assist you!
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="form-control form-control-lg"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="form-control form-control-lg"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Your Message"
                    className="form-control form-control-lg"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Send Message
                </button>
              </form>

              <div className="text-center mt-4 text-muted">
                <p>📞 +91 98765 43210 | ✉️ support@minibazaar.com</p>
                <p>📍 Chennai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
