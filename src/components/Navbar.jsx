import React from "react";

function Navbar({ onNavigate, currentSection }) {
  const scrollToContact = () => {
    // Find the contact section by ID and scroll to it
    document.getElementById("contact-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="navbar">
      <h2 className="logo">TrendX</h2>
      <ul>
        <li className={currentSection === "home" ? "active" : ""}>
          <button onClick={() => onNavigate("home")}>Home</button>
        </li>
        <li className={currentSection === "trending" ? "active" : ""}>
          <button onClick={() => onNavigate("trending")}>Trending</button>
        </li>
        <li>
          <button onClick={scrollToContact}>Contact</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
