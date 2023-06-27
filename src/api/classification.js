const BASE_URL = "http://127.0.0.1:5000";

const classify = async (image) => {
  const reponse = await fetch(`${BASE_URL}/process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: frame }),
  });

  const classficationResult = await reponse.json();

  return classficationResult;
}

export { classify };