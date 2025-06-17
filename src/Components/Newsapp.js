import React, { useEffect, useState } from "react";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("trump");
  const [newsData, setNewsData] = useState([]);
  const API_KEY = "94ff00110b2248beac25761908262837";

  const getData = async (customQuery) => {
    try {
      const query = customQuery || search;
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      let dt = jsonData.articles?.slice(0, 10) || [];
      setNewsData(dt);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 60000); // ⏱️ Refresh every 60 seconds

    return () => clearInterval(interval); // 🧹 Clean up
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
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </nav>

      <div>
        <p className="head">Stay Updated with TrendyNews</p>
      </div>

      <div className="categoryBtn">
        <button onClick={handleCategoryClick} value="sports">
          Sports
        </button>
        <button onClick={handleCategoryClick} value="politics">
          Politics
        </button>
        <button onClick={handleCategoryClick} value="entertainment">
          Entertainment
        </button>
        <button onClick={handleCategoryClick} value="health">
          Health
        </button>
        <button onClick={handleCategoryClick} value="fitness">
          Fitness
        </button>
      </div>

      <div>
        {newsData?.length > 0 ? (
          <Card data={newsData} />
        ) : (
          <p style={{ textAlign: "center" }}>No news found.</p>
        )}
      </div>
    </div>
  );
};

export default Newsapp;
