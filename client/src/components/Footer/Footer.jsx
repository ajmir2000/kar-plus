import React, { useState } from "react";
import "./Footer.css";
import { Container } from "react-bootstrap";
import { IoMdMail } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Footer() {
  const { currentUser } = useSelector((state) => state.user);
  const [report, setReport] = useState("");

  // Declare userID outside of the if-else block
  const userID = currentUser ? currentUser._id : "Not Registered";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (report === "") {
      return alert("write your report");
    }
    try {
      const response = await fetch("/api/application/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report, userID }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Clear the textarea
      setReport("");
      alert("Report sent successfully");
    } catch (error) {
      console.error("Error sending report:", error);
      alert("Failed to send report");
    }
  };

  return (
    <Container className="py-5 d-block">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 ">
          <div className="custom-mail-icon">
            <div className="d-flex align-items-center">
              <span className="bg-white px-3 py-1 rounded me-3">
                <IoMdMail />
              </span>
              <div>
                <p className="custom-title-news mb-1">Send Report</p>
                <p className="custom-spam mb-0">
                  We'll make a better platform. :)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <form
            className="d-flex justify-content-center justify-content-md-end"
            onSubmit={handleSubmit}>
            <textarea
              placeholder="write your report and make a good changes"
              className="form-control me-2 bg-transparent rounded-3 custom-placeholder my-2 px-3 me-3"
              aria-label="Report"
              value={report}
              onChange={(e) => setReport(e.target.value)}
            />
            <button
              type="submit"
              className="btn bg-white border-0 custom-button-color my-2 px-4 rounded-3">
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="custom-footer-line bg-white w-100 mt-4"></div>
      <div className="d-flex justify-content-center text-white mt-3">
        <span className="px-3">&copy; {new Date().getFullYear()} KarPlus</span>
        <span className="px-3">Term</span>
        <span className="px-3">Privacy</span>
        <span className="px-3">Cookies</span>
      </div>
    </Container>
  );
}
