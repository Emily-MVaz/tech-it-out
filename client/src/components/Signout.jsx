import React from "react";
import "../css/header.scss";
import "@fontsource/roboto";

export default function Signout() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  return (
    <div id="end" className="end">
      <button
        onClick={logout}
        className="button is-info"
      >
        SIGN OUT
      </button>
    </div>
  );
}
