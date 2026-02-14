const form = document.getElementById("feedbackForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const feedback = {
    name: document.getElementById("name").value,
    rating: Number(document.getElementById("rating").value),
    comment: document.getElementById("comment").value
  };

  const res = await fetch("http://localhost:4000/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedback)
  });

  const data = await res.json();

  const messageEl = document.getElementById("message");
  messageEl.innerText = data.message;
  messageEl.classList.add("success");

  form.reset();
});
