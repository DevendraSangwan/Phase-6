const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const contact = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
      };

      const res = await fetch("http://localhost:4001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });

      const data = await res.json();
      document.getElementById("result").innerText = data.message;
      form.reset();
    });