import React, { useState, useEffect } from "react";
import Title from "./Title";
import {imageUplaodApi, fetchImageTitleApi} from '../components/Endpoints';

export default function Home() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  // uploadKey is used to reset the form values after successful uplaod
  const [state, setState] = useState({
    title: "",
    files: [],
    uploadKey: Math.random().toString()
  });

  // Fetch Image Titles From Api & Update State
  const fetchTitles = () => {
    fetch(fetchImageTitleApi)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTitles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
      setState({...state, title: "" , uploadKey: Math.random().toString()});
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData();
    for (let file of state.files) {
      data.append("file", file);
    }
    data.append("title", state.title);
    fetch(imageUplaodApi, {
      method: "POST",
      body: data
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Update State After New Entry By Fetching Data From Api
      fetchTitles();
    })
    .catch(error => {
      console.log(error);
    })
  };
  return (
    <>
    {/* Form Section To Give Entry */}
    <div className="container">
    <div className="row justify-content-center mt-3">
    <form className="col-md-8" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={state.title}
            placeholder="Enter Title"
            onChange={(event) => setState({ ...state, title: event.target.value })}
            required={true}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            name="files"
            key={state.uploadKey}
            onChange={(event) => setState({ ...state, files: event.target.files })}
            multiple={true}
            required={true}
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
    
    {/* Title List */}
      {loading ? <div>Loading</div> : <Title data={titles} />}
    </div>
    </>
  );
}
