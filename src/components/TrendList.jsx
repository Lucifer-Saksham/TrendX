import React, { useState, useEffect } from "react";

function TrendList({ category, api }) {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!api) return;

    setLoading(true);
    setError(null);

    // For development without API keys
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

    // Actually make the API call when you have keys
    // For now, use mock data for development
    setTimeout(() => {
      const categoryKey = category.split(" ")[0].toLowerCase();
      const trendType = category.includes("YouTube")
        ? "YouTube Trends"
        : category.includes("Google")
        ? "Google Trends"
        : category.includes("Twitter")
        ? "Twitter Trends"
        : "News Trends";

      setTrends(mockData[trendType]);
      setLoading(false);
    }, 1000); // Simulate loading

    // Uncomment this when you have API keys
    /*
    fetch(api)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        // Process different API responses
        let processedData = [];
        
        if (category === "YouTube Trends") {
          processedData = data.items.map(item => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url
          }));
        } else if (category === "News Trends") {
          processedData = data.articles.map((article, index) => ({
            id: `news-${index}`,
            title: article.title,
            description: article.description,
            thumbnail: article.urlToImage
          }));
        } else {
          // Handle other APIs accordingly
          processedData = data.items || [];
        }
        
        setTrends(processedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    */
  }, [api, category]);

  return (
    <div className="trend-list-container">
      <h2 className="trend-category-title">{category}</h2>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading {category}...</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}

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
