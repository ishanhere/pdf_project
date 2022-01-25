import React from "react";

const LandingPage = (props) => {
  return (
    <main>
      <AdComponent />
      <div className={props.landingPage}>
        <img
          src="./Add_files.png"
          style={{ height: "300px", width: "300px" }}
        ></img>
        <img
          src="./right_arrow.png"
          style={{ height: "40px", width: "40px" }}
        ></img>
        <img
          src="./Working.png"
          style={{ height: "300px", width: "300px" }}
        ></img>
        <img
          src="./right_arrow.png"
          style={{ height: "40px", width: "40px" }}
        ></img>
        <img src="./Done.png" style={{ height: "300px", width: "300px" }}></img>
      </div>
    </main>
  );
};

export default LandingPage;
