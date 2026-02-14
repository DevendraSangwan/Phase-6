const form = document.getElementById("progressForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const progress = {
        studentName: document.getElementById("name").value,
        courseName: document.getElementById("course").value,
        completionPercentage: document.getElementById("percentage").value
      };

      const res = await fetch("http://localhost:4002/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progress)
      });

      const data = await res.json();
      document.getElementById("result").innerText = data.message;
      form.reset();
    });