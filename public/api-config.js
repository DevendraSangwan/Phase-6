window.PHASE6_API_BASE_URL = "";

window.phase6ApiUrl = (path) => {
  const baseUrl = window.PHASE6_API_BASE_URL.replace(/\/+$/, "");
  return `${baseUrl}${path}`;
};
