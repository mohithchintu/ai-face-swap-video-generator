import React, { useEffect, useState } from "react";
import Upload from "../components/Senddata";

const Home = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="flex text-3xl font-bold justify-between">
        AI Lecture Face Swapper
      </p>

      <Upload />
    </div>
  );
};

export default Home;
