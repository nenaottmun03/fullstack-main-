import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import LostFoundItems from "./LostFoundItems";
import LostItems from "./LostItems";
import FoundItems from "./FoundItems";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const LostAndFoundList = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${Base_URL}/item`);
      setItems(res.data.gotItem);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item) => {
    if (props.req === "lost") {
      return <LostItems key={item._id} item={item} />;
    } else if (props.req === "found") {
      return <FoundItems key={item._id} item={item} />;
    } else {
      return <LostFoundItems key={item._id} item={item} />;
    }
  };

  // Container styles
  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px 16px",
  };

  // Header styles
  const headerStyle = {
    marginBottom: "32px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: "8px",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#616161",
    fontWeight: "500",
    lineHeight: "1.5",
    maxWidth: "600px",
    margin: "0 auto",
  };

  // Grid layout
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    padding: "16px 0",
  };

  // Empty state style
  const emptyStateStyle = {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
    marginTop: "24px",
  };

  const emptyTextStyle = {
    color: "#757575",
    fontSize: "1.1rem",
    fontWeight: "500",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            {props.req ? `${props.req.charAt(0).toUpperCase() + props.req.slice(1)} Items` : "All Lost & Found Items"}
          </h1>
          <p style={subtitleStyle}>
            *If your items aren't visible, make sure you raise a concern first*
          </p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          <div style={emptyStateStyle}>
            <p style={emptyTextStyle}>
              No {props.req ? props.req : "lost or found"} items found
            </p>
          </div>
        ) : (
          <div style={gridStyle}>
            {items.map((item) => renderItem(item))}
          </div>
        )}
      </div>
    </>
  );
};

export default LostAndFoundList;