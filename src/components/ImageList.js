import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getImageListsApi } from "../components/Endpoints";

function ImageList({ match }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Images For The Corresponding Title
  const fetchImages = () => {
    fetch(`${getImageListsApi}${match.params["pk"]}/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImages(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading......</div>
      ) : (
        <div>
          <h3 className="my-4 text-center">Title {images[0].title}</h3>
          {images.map((image) => (
            <div
              className="d-flex flex-column align-items-center"
              key={image.id}
            >
              <a href={image.image_url}>
                <img
                  className="img-fluid"
                  style={{ width: "320px", height: "320px" }}
                  src={image.image_url}
                  alt=""
                />
              </a>
            </div>
          ))}
        </div>
      )}
      <div className="d-flex flex-column align-items-center mt-3">
        <Link to={"/"}>Go To Home</Link>
      </div>
    </>
  );
}

export default ImageList;
