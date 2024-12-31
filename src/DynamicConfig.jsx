import React, { useState, useEffect } from "react";

const DynamicConfig = () => {
  const [config, setConfig] = useState({});
  const [updatedConfig, setUpdatedConfig] = useState({});

  // Fetch configuration at runtime
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json"); // Path to your config file
        const data = await response.json();
        setConfig(data);
        setUpdatedConfig(data); // Initialize updatedConfig with the current config
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchConfig();
  }, []);

  // Handle input changes
  const handleChange = (key, value) => {
    setUpdatedConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Save updated configuration (to API or elsewhere)
  const handleSave = () => {
    // Implement API call or save logic here
    console.log("Updated configuration:", updatedConfig);
    setConfig(updatedConfig);
  };

  return (
    <div>
      <h1>Dynamic Configuration</h1>
      {Object.keys(config).length > 0 ? (
        <div>
          {Object.entries(updatedConfig).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <label>
                {key}:
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={{ marginLeft: "10px" }}
                />
              </label>
            </div>
          ))}
          <button onClick={handleSave}>Save Configuration</button>
        </div>
      ) : (
        <p>Loading configuration...</p>
      )}
    </div>
  );
};

export default DynamicConfig;
