"use client";
import React, { useState, useMemo, useEffect } from "react";

export default function Table() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    // Replace with your API endpoint
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setData(data.users)) // Assuming the data is in the 'users' field
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  const sortedData = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [filteredData, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              onClick={() => requestSort("id")}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid #ddd",
                padding: "10px",
              }}
            >
              ID
            </th>
            <th
              onClick={() => requestSort("firstName")}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid #ddd",
                padding: "10px",
              }}
            >
              First Name
            </th>
            <th
              onClick={() => requestSort("lastName")}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid #ddd",
                padding: "10px",
              }}
            >
              Last Name
            </th>
            <th
              onClick={() => requestSort("age")}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid #ddd",
                padding: "10px",
              }}
            >
              Age
            </th>
            <th
              onClick={() => requestSort("city")}
              style={{
                cursor: "pointer",
                borderBottom: "2px solid #ddd",
                padding: "10px",
              }}
            >
              City
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{item?.id}</td>
              <td style={{ padding: "10px" }}>{item.firstName}</td>
              <td style={{ padding: "10px" }}>{item.lastName}</td>
              <td style={{ padding: "10px" }}>{item.age}</td>
              <td style={{ padding: "10px" }}>{item.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
