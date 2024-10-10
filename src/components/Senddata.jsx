import React, { useState } from "react";

const Upload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadedVideo, setDownloadedVideo] = useState(null); // New state for downloaded video

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!imageFile || !videoFile) {
      setMessage("Both image and video files are required.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("video", videoFile);

      const response = await fetch(`${import.meta.env.VITE_API}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob(); // Get the video response as a blob
        const videoUrl = URL.createObjectURL(blob); // Create a local URL for the blob
        setDownloadedVideo(videoUrl); // Set the video URL to state for display
        setMessage("Upload successful! Video downloaded.");
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      setMessage(`Error uploading: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-10">Upload Files</h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <p className="text-xl font-semibold">Image: </p>
        <input
          type="file"
          accept="image/*"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Image"
          onChange={handleImageChange}
        />
        <p className="text-xl font-semibold">Video: </p>
        <input
          type="file"
          accept="video/*"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Video"
          onChange={handleVideoChange}
        />
      </div>

      <div className="flex flex-wrap justify-center items-center mt-6 gap-6">
        {imagePreview && (
          <div className="p-2 shadow-md rounded-md bg-white">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-40 h-40 object-cover rounded-md"
            />
          </div>
        )}
        {videoPreview && (
          <div className="p-2 shadow-md rounded-md bg-white">
            <video controls className="w-40 h-40 rounded-md">
              <source src={videoPreview} type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="mt-6 flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <span className="text-blue-500 font-medium">
            Generating the video please wait ...
          </span>
        </div>
      ) : (
        <button
          onClick={handleUpload}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Upload
        </button>
      )}

      {message && (
        <div
          className={`mt-4 ${
            message.includes("successful") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}

      {downloadedVideo && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Downloaded Video:
          </h2>
          <video controls className="w-80 h-80 rounded-md mt-4">
            <source src={downloadedVideo} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Upload;
