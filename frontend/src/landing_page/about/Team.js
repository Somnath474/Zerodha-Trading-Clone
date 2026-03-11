import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div className="container">
  <div className="row align-items-center">
    
    {/* LEFT SIDE – IMAGE */}
    <div className="col-md-6 p-3 text-center">
      <img
        src="media/somnath.png"
        alt="Somnath Gupta"
        style={{
          borderRadius: "100%",
          width: "50%",
          height: "auto"
        }}
      />
      <h4 className="mt-4">Somnath Gupta</h4>
      <h6>Founder, Full Stack Developer</h6>
    </div>

    {/* RIGHT SIDE – BIO */}
    <div className="col-md-6 p-3">
      <p>
        Somnath is a Computer Science Engineering student and a passionate Full
        Stack Developer specializing in the MERN stack. He enjoys building
        real-world applications that solve practical problems.
      </p>
      <p>
        He is currently working on projects like a Stock Trading Platform and
        Job Portal while strengthening his Data Structures and Algorithms for
        placements.
      </p>
      <p>
        His interests include backend development, system design, and fintech
        solutions.
      </p>
      <p>
        Connect on <a href="">Portfolio</a> / <a href="https://github.com/somnath474">GitHub</a> /{" "}
        <a href="https://www.linkedin.com/in/somnath474/">LinkedIn</a>
      </p>
    </div>

  </div>
</div>

    </div>
  );
}

export default Team;