import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import './jobBox.css'

export default function JobBox() {
  return (
    
        <div className="col-9 custom-talent-box-container  d-flex m-2 ">
          <div className="custom-talent-box-skill-pic m-4">
            <img
              src="./asset-folder/talent-pics/download.jpeg"
              alt="talent pic"
            />
          </div>

          <div className="d-flex justify-content-center mt-3 flex-column">
            <div className="d-flex justify-content-around custom-talent-box-container">
              <div></div>
              <div className="custom-talent-box-profile-picture">
                {" "}
                <img
                  className="rounded-peal"
                  src="./asset-folder/talent-pics/download (1).jpeg"
                  alt="Wasi Noori"
                />
              </div>

              <div className="custom-talent-box-profile-details m-2">
                <h5 className="fw-bold">
                  Wasi Noori. <span className="text-muted ms-2">panjshir</span>{" "}
                </h5>

                <h5 className="fw-bold">
                  Expert Graphic Designer and Brand Strategist
                </h5>

                <div className=" custom-talent-card-sub-menus d-flex justify-cotent-between text-muted">
                  <p>$43.33/hr</p>
                  <p>87% job sucess</p>
                  <p>$250k * earned</p>
                </div>
              </div>

              <button className="btn btn-outline-success h-2 mx-4">
                View Profile
              </button>
            </div>

            <div className="d-flex flex-row custom-talent-box-talent-category-container mt-2">
              <div>Flayer Design</div>
              <div>Logo Design</div>
              <div>Canva Design</div>
              <div>Ms PowerPoint</div>
              <div>Graphic Design</div>
            </div>

            <div className="m-4 custom-talent-box-text-body  ">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                dolores est autem nobis earum saepe architecto optio enim
                assumenda nulla perferendis ad, beatae animi repellat dicta sed
                ipsam aspernatur hic! Lorem ipsum dolor sit
              </p>

              <h5 className="fw-bold mt-3">
                Wasi Nori has worked{" "}
                <span className="text-success me-2">
                  54 jobs related to your Search
                </span>
              </h5>
            </div>
          </div>
        </div>
      
    
  );
}
