import React, { useEffect, useRef } from "react";

function Sidebar({ category, setCategory, className }) {
  const sidebarRef = useRef(null);

  const categories = [
    "YouTube Trends",
    "Google Trends",
    "Twitter Trends",
    "News Trends",
  ];

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = "translateX(0)";
    }
  }, []);

  return (
    <aside ref={sidebarRef} className={`sidebar ${className}`}>
      <h2>Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => setCategory(cat)}
            className={category === cat ? "active" : ""}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
