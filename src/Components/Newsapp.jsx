import React, { useEffect, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("trump");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use environment variable for API key with fallback
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "bcc1d8445e254e9cb1bce4a9c68f62ef";

  const getData = async (customQuery) => {
    try {
      setLoading(true);
      setError(null);
      const query = customQuery || search;
      
      // Use different endpoints for development and production
      const isDev = import.meta.env.DEV;
      const baseUrl = isDev 
        ? '/api/top-headlines' 
        : `https://newsapi.org/v2/top-headlines`;
      
      const url = isDev 
        ? `${baseUrl}?q=${encodeURIComponent(query)}`
        : `${baseUrl}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      
      if (jsonData.status === 'error') {
        throw new Error(jsonData.message || 'API Error');
      }
      
      let dt = jsonData.articles?.slice(0, 10) || [];
      setNewsData(dt);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err.message);
      // Fallback to mock data for demo purposes
      setNewsData([
        {
          title: "Sample News Article",
          description: "This is a sample news article for demonstration purposes.",
          url: "https://example.com",
          urlToImage: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 300000); // Refresh every 5 minutes to avoid rate limits

    return () => clearInterval(interval);
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    getData(search);
  };

  const handleCategoryClick = (e) => {
    const category = e.target.value;
    setSearch(category);
    getData(category);
  };

  return (
    <div>
      <nav>
        <div>
          <h1>HeadlineHub</h1>
        </div>
        <ul style={{ display: "flex", gap: "11px" }}>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>All News</a>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a>
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
          />
          <button onClick={handleSearchClick} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </nav>

      <div>
        <p className="head">Stay Updated with HeadlineHub</p>
      </div>

      <div className="categoryBtn">
        <button onClick={handleCategoryClick} value="sports" disabled={loading}>
          Sports
        </button>
        <button onClick={handleCategoryClick} value="politics" disabled={loading}>
          Politics
        </button>
        <button onClick={handleCategoryClick} value="entertainment" disabled={loading}>
          Entertainment
        </button>
        <button onClick={handleCategoryClick} value="health" disabled={loading}>
          Health
        </button>
        <button onClick={handleCategoryClick} value="fitness" disabled={loading}>
          Fitness
        </button>
      </div>

      <div>
        {loading && <p style={{ textAlign: "center" }}>Loading news...</p>}
        {error && (
          <div style={{ textAlign: "center", color: "#ff6b6b", margin: "1rem" }}>
            <p>Error loading news: {error}</p>
            <p>Showing sample content for demonstration.</p>
          </div>
        )}
        {newsData?.length > 0 ? (
          <Card data={newsData} />
        ) : (
          !loading && <p style={{ textAlign: "center" }}>No news found.</p>
        )}
      </div>
    </div>
  );
};

export default Newsapp;