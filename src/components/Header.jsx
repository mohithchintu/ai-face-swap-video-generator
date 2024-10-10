import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row h-20 border border-b shadow-md">
      <Link to="/">Home</Link>
      <Link to="/myvideos">My videos</Link>
    </div>
  );
};

export default Header;
