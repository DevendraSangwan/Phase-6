async function loadProgress() {
  const res = await fetch("http://localhost:4002/api/progress");
  const progress = await res.json();

  const list = document.getElementById("progressList");
  list.innerHTML = "";

  progress.forEach(cn => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="progress-name">Name:  ${cn.studentName}</div>
      <div class="progress-course">Course:  ${cn.courseName}</div>
      <div class="progress-percentage">Percentage:  ${cn.completionPercentage}%</div>
      <button class="editBtn">Edit</button>
    `;

    // EDIT
    li.querySelector(".editBtn").addEventListener("click", async () => {
      const newName = prompt("Enter new name:", cn.name);
      const newCourse = prompt("Enter new course name:", cn.course);
      const newPercentage = prompt("Enter new progress Percentage:", cn.percentage);

      await fetch(`http://localhost:4002/api/progress/${cn._id}`, {
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

    list.appendChild(li);
  });
}

// DELETE ALL
document.getElementById("deleteAll").addEventListener("click", async () => {
  if (confirm("Are you sure you want to delete all Progress ?")) {
    await fetch("http://localhost:4002/api/progress", {
      method: "DELETE"
    });
    loadProgress();
  }
});

loadProgress();
