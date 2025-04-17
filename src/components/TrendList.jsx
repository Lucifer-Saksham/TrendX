import React, { useState, useEffect } from "react";

// Fixed TrendList component - removed API dependency and simplified implementation
function TrendList({ category }) {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Start loading
    setLoading(true);
    setError(null);

    // Mock data for all trend categories
    const mockData = {
      "YouTube Trends": Array.from({ length: 10 }, (_, i) => ({
        id: `yt-${i}`,
        title: `Top YouTube Trend #${i + 1}`,
        description: "This is a trending YouTube video",
        thumbnail: `https://picsum.photos/300/200?random=${i}`,
      })),
      "Google Trends": Array.from({ length: 10 }, (_, i) => ({
        id: `g-${i}`,
        title: `Popular Google Search #${i + 1}`,
        description: "People are searching for this",
        thumbnail: `https://picsum.photos/300/200?random=${i + 10}`,
      })),
      "Twitter Trends": Array.from({ length: 10 }, (_, i) => ({
        id: `tw-${i}`,
        title: `Trending Twitter Topic #${i + 1}`,
        description: "This is trending on Twitter",
        thumbnail: `https://picsum.photos/300/200?random=${i + 20}`,
      })),
      "News Trends": Array.from({ length: 10 }, (_, i) => ({
        id: `n-${i}`,
        title: `Breaking News Story #${i + 1}`,
        description: "Latest news trending worldwide",
        thumbnail: `https://picsum.photos/300/200?random=${i + 30}`,
      })),
    };

    // Simulate API request with timeout
    const timer = setTimeout(() => {
      try {
        const trendType = category.includes("YouTube")
          ? "YouTube Trends"
          : category.includes("Google")
          ? "Google Trends"
          : category.includes("Twitter")
          ? "Twitter Trends"
          : "News Trends";

        setTrends(mockData[trendType]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load trends");
        setLoading(false);
      }
    }, 1000);

    // Clean up timer on unmount
    return () => clearTimeout(timer);
  }, [category]);

  // Show loading indicator
  if (loading) {
    return (
      <div className="trend-list-container">
        <h2 className="trend-category-title">{category}</h2>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading {category}...</p>
        </div>
      </div>
    );
  }

  // Show error if any
  if (error) {
    return (
      <div className="trend-list-container">
        <h2 className="trend-category-title">{category}</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  // Show trends
  return (
    <div className="trend-list-container">
      <h2 className="trend-category-title">{category}</h2>
      <div className="trends-grid">
        {trends.map((trend, index) => (
          <div key={trend.id || index} className="trend-card">
            <div className="trend-rank">{index + 1}</div>
            <div className="trend-thumbnail">
              <img src={trend.thumbnail} alt={trend.title} />
            </div>
            <div className="trend-info">
              <h3>{trend.title}</h3>
              <p>{trend.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendList;
