import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);
  const [uploadImg, setUploadImg] = useState(null);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=4c454d3b502f12561ffb01189899ec16",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(
        "Image uploaded successfully:",
        response?.data?.data?.display_url
      );
      setUploadImg(response?.data?.data?.display_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadImg && (
          <>
            <img style={{width: 300}} src={uploadImg} alt="" /> <br />
            <p>{uploadImg}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
