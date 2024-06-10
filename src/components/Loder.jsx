import React from "react";
import { HashLoader } from "react-spinners";

const Loder = ({ state }) => {
  const style = {
    display: state ? "flex" : "none",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <HashLoader color="#d67e36" />
    </div>
  );
};

export default Loder;
