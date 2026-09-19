async function loadFeedback() {
  const res = await fetch("/api/feedback");
  const feedbacks = await res.json();

  const list = document.getElementById("feedbackList");
  list.innerHTML = "";

  feedbacks.forEach(fb => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="feedback-name">${fb.name}</div>
      <div class="feedback-rating">Rating: ${fb.rating}</div>
      <div class="feedback-comment">${fb.comment}</div>
      <div class="action-row">
        <button class="editBtn" type="button">Edit</button>
        <button class="deleteBtn" type="button">Delete</button>
      </div>
    `;

    // EDIT
    li.querySelector(".editBtn").addEventListener("click", async () => {
      const newName = prompt("Enter new name:", fb.name);
      const newRating = prompt("Enter new rating:", fb.rating);
      const newComment = prompt("Enter new comment:", fb.comment);

      await fetch(`/api/feedback/${fb._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          rating: newRating,
          comment: newComment 
        })
      });

      loadFeedback();
    });

    li.querySelector(".deleteBtn").addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this feedback?")) {
        await fetch(`/api/feedback/${fb._id}`, { method: "DELETE" });
        loadFeedback();
      }
    });

    list.appendChild(li);
  });
}

// DELETE ALL
document.getElementById("deleteAll").addEventListener("click", async () => {
  if (confirm("Are you sure you want to delete all feedback?")) {
    await fetch("/api/feedback", {
      method: "DELETE"
    });
    loadFeedback();
  }
});

loadFeedback();
