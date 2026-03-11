import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">The Zerodha Universe</h1>
        <p className="text-muted">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>

      <div className="row text-center">
        {/* Item 1 */}
        <div className="col-lg-4 col-md-6 col-sm-12 p-4">
          <img src="media/zerodhafundhouse.png" className="universe-img" />
          <p className="text-muted small mt-3">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        {/* Item 2 */}
        <div className="col-lg-4 col-md-6 col-sm-12 p-4">
          <img src="media/sensibullLogo.svg" className="universe-img" />
          <p className="text-muted small mt-3">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        {/* Item 3 */}
        <div className="col-lg-4 col-md-6 col-sm-12 p-4">
          <img src="media/tijori.svg" className="universe-img" />
          <p className="text-muted small mt-3">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>

        {/* Item 4 */}
        <div className="col-lg-4 col-md-6 col-sm-12 p-4">
          <img src="media/streakLogo.png" className="universe-img" />
          <p className="text-muted small mt-3">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>

        {/* Item 5 */}
        <div className="col-lg-4 col-md-6 col-sm-12 p-4">
          <img src="media/smallcaseLogo.png" className="universe-img" />
          <p className="text-muted small mt-3">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>

        {/* Item 6 */}
        <div className="col-lg-4 col-md-6 col-sm-12 p-4">
          <img src="media/ditto-logo.png" className="universe-img" />
          <p className="text-muted small mt-3">
            Personalized advice on life and health insurance. No spam and no
            mis-selling
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary px-4 py-2 fs-5">Signup Now</button>
      </div>
    </div>
  );
}

export default Universe;
