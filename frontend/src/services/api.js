export const BASE_URL = import.meta.env.VITE_API_URL || "";

async function request(method, endpoint, data = null) {
  const token = localStorage.getItem("admin_token");
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  if (data) options.body = JSON.stringify(data);
  const response = await fetch(`${BASE_URL}/api${endpoint}`, options);
  if (!response.ok) throw new Error(`Erreur ${response.status}`);
  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  getProjects: () => request("GET", "/projects"),
  getExperiences: () => request("GET", "/experiences"),
  getSkills: () => request("GET", "/skills"),
  getFormations: () => request("GET", "/formations"),
  sendMessage: (data) => request("POST", "/messages", data),
};
