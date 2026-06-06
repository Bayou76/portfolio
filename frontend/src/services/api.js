const BASE_URL = "/api";

async function request(method, endpoint, data = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (data) options.body = JSON.stringify(data);
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
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
