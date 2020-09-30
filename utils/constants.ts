export const jspm = `https://jspm.dev/npm:`;
export const jsdelivr = (type: "npm" | "gh") =>
  `https://cdn.jsdelivr.net/${type === "npm" ? "npm" : "gh"}`;
export const unpkg = "https://unpkg.com";
