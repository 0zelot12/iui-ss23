const BASE_URL = "http://127.0.0.1:5000";

const classify = async (image) => {
  const reponse = await fetch(`${BASE_URL}/process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: image }),
  });

  return reponse.json();
}

export { classify };