import React from "react";
import "./aboutUs.css";

export default function AboutUs() {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <h3 className="text-center mb-4">About Us</h3>
        <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          Welcome to our innovative platform, designed to revolutionize the job and gig market. Our mission is to offer better opportunities for job seekers and gig workers, making the hiring process more efficient and user-friendly for everyone involved.
        </p>
        <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          At the heart of our application is a dedication to creating a smooth and intuitive user experience. We understand the complexities of job searching and hiring, and our goal is to simplify this process with cutting-edge technology and a seamless interface.
        </p>
        <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          Our platform is built with robust technical components including advanced body parsing, secure authentication, dynamic routing, and a comprehensive middleware stack. These features ensure that our users have a reliable and efficient experience, whether they are looking for a job, posting a gig, or hiring talent.
        </p>
        <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
          Join us in transforming the way the world works. Discover opportunities, streamline your hiring process, and enjoy a platform designed with you in mind.
        </p>
      </div>
    </div>
  );
}
