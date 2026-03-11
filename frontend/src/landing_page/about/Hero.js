import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="home-hero">
      <div className="home-hero__bg-shape"></div>

      <div className="container">
        <div className="home-hero__inner">

          <div className="home-hero__badge reveal">
            🇮🇳 India's No. 1 Stock Broker
          </div>

          <h1 className="home-hero__title reveal reveal-delay-1">
            Invest in <span className="home-hero__accent">everything</span><br />
            that matters.
          </h1>

          <p className="home-hero__subtitle reveal reveal-delay-2">
            Stocks, derivatives, mutual funds, ETFs, bonds and more —<br />
            all on one lightning-fast platform.
          </p>

          <div className="home-hero__cta reveal reveal-delay-3">
            <Link to="/signup" className="btn-primary">
              Open Free Account
            </Link>
            <a href="/products" className="btn-outline">
              Explore Products
            </a>
          </div>

          <div className="home-hero__stats reveal reveal-delay-4">
            <div className="home-hero__stat">
              <strong>1 Cr+</strong>
              <span>Active clients</span>
            </div>
            <div className="home-hero__stat-divider"></div>
            <div className="home-hero__stat">
              <strong>₹4.5L Cr</strong>
              <span>Assets under management</span>
            </div>
            <div className="home-hero__stat-divider"></div>
            <div className="home-hero__stat">
              <strong>15%</strong>
              <span>Of Indian retail volume</span>
            </div>
          </div>

        </div>

        <div className="home-hero__image reveal reveal-delay-2">
          <img src="media/homeHero.png" alt="Zerodha Platform" />
        </div>
      </div>
    </section>
  );
}

export default Hero;