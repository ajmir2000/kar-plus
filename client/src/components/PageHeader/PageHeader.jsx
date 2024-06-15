import React from "react";

const PageHeader = ({ title, path }) => {
  return (
    <div className="py-5 mt-3 bg-light rounded d-flex align-items-center justify-content-center">
      <div>
        <h2 className="h3 text-primary font-weight-medium mb-1 text-center">
          {title}
        </h2>
        <p className="small text-center">
          {" "}
          <a href="/">Home</a> / {path}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
