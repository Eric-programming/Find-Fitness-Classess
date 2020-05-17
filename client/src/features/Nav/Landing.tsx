import React from "react";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Find your ideal personal trainer</h1>
          <p className="lead">
            Create a profile. We help you to find your ideal Client.
          </p>
          <div className="buttons">
            <button className="btn btn-primary">Sign Up</button>
            <a className="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
