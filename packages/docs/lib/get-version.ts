export const getVeraUiLatestVersion = async () => {
  try {
    const res = await fetch("https://registry.npmjs.org/@helgadigitals/vera-ui/latest", {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return "1.0.0";
    const data = await res.json();
    return data.version || "1.0.0";
  } catch {
    return "1.0.0";
  }
};
