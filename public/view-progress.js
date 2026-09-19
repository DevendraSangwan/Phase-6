async function loadProgress() {
  const res = await fetch("/api/progress");
  const progress = await res.json();

  const list = document.getElementById("progressList");
  list.innerHTML = "";

  progress.forEach(cn => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="progress-name">Name: ${cn.studentName}</div>
      <div class="progress-course">Course: ${cn.courseName}</div>
      <div class="progress-percentage">Percentage: ${cn.completionPercentage}%</div>
      <div class="action-row">
        <button class="editBtn" type="button">Edit</button>
        <button class="deleteBtn" type="button">Delete</button>
      </div>
    `;

    // EDIT
    li.querySelector(".editBtn").addEventListener("click", async () => {
      const newName = prompt("Enter new name:", cn.studentName || "");
      const newCourse = prompt("Enter new course name:", cn.courseName || "");
      const newPercentage = prompt("Enter new progress Percentage:", cn.completionPercentage || "");
      await fetch(`/api/progress/${cn._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: newName,
          courseName: newCourse,
          completionPercentage: newPercentage
        })
      });

      loadProgress();
    });

    li.querySelector(".deleteBtn").addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this progress entry?")) {
        await fetch(`/api/progress/${cn._id}`, { method: "DELETE" });
        loadProgress();
      }
    });

    list.appendChild(li);
  });
}

// DELETE ALL
document.getElementById("deleteAll").addEventListener("click", async () => {
  if (confirm("Are you sure you want to delete all Progress ?")) {
    await fetch("/api/progress", {
      method: "DELETE"
    });
    loadProgress();
  }
});

loadProgress();
