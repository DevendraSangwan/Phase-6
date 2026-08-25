const form = document.getElementById("feedbackForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const feedback = {
    name: document.getElementById("name").value,
    rating: Number(document.getElementById("rating").value),
    comment: document.getElementById("comment").value
  };

  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedback)
  });

  const messageEl = document.getElementById("message");
  const data = await res.json();
  messageEl.innerText = res.ok ? "Feedback saved successfully!" : data.error;
  messageEl.classList.add("success");

  if (res.ok) {
    form.reset();
  }
});
