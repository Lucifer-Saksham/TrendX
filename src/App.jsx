import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TrendList from "./components/TrendList";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [category, setCategory] = useState("YouTube Trends");
  const [currentSection, setCurrentSection] = useState("home");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    if (currentSection === "trending") {
      setSidebarVisible(true);
    } else if (currentSection === "home") {
      setSidebarVisible(false);
    }
  }, [currentSection]);

  const navigateToSection = (section) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-container">
      <Navbar onNavigate={navigateToSection} currentSection={currentSection} />

      <div className="main">
        {sidebarVisible && (
          <Sidebar
            category={category}
            setCategory={setCategory}
            className={sidebarVisible ? "sidebar-visible" : ""}
          />
        )}

        <div className={`main-content ${sidebarVisible ? "with-sidebar" : ""}`}>
          {currentSection === "home" && (
            <Home onExplore={() => navigateToSection("trending")} />
          )}

          {currentSection === "trending" && (
            <div className="trending-section">
              <TrendList category={category} />
            </div>
          )}
          <div id="contact-section">
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
