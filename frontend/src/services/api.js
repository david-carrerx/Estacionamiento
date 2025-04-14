// src/services/api.js
const API_URL = "http://localhost:3000";

export const registerEntry = async (license_plate, vehicle_type) => {
  const response = await fetch(`${API_URL}/entry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ license_plate, vehicle_type }),
  });
  return response.json();
};

export const registerExit = async (license_plate) => {
  const response = await fetch(`${API_URL}/exit/${license_plate}`, {
    method: "POST",
  });
  return response.json();
};

export const getReport = async (from, to) => {
  const response = await fetch(`${API_URL}/report?from=${from}&to=${to}`);
  return response.json();
};
