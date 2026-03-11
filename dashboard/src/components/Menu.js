import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState("User");
  const [initials, setInitials] = useState("ZU");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.user?.name) {
          setUsername(payload.user.name);
          setInitials(
            payload.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          );
        }
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("http://localhost:3000/login");
  };

  const navLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/orders", label: "Orders" },
    { path: "/holdings", label: "Holdings" },
    { path: "/positions", label: "Positions" },
    { path: "/funds", label: "Funds" },
    { path: "/apps", label: "Apps" },
  ];

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />

      <div className="menus">
        <ul>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} style={{ textDecoration: "none" }}>
                <p className={location.pathname === path ? "menu selected" : "menu"}>
                  {label}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <hr />

        {/* ✅ FIX: profile-info and dropdown are SIBLINGS, not parent-child */}
        <div className="profile">

          <div
            className="profile-info"
            onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
          >
            <div className="avatar">{initials}</div>
            <p className="username">{username.toUpperCase()}</p>
          </div>

          {/* Dropdown is now a sibling of profile-info, not inside it */}
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Menu;