async function loadContacts() {
  const res = await fetch("/api/contact");
  const contacts = await res.json();

  const list = document.getElementById("contactList");
  list.innerHTML = "";

  contacts.forEach(cn => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="contact-name">Name: ${cn.name}</div>
      <div class="contact-email">Email: ${cn.email}</div>
      <div class="contact-message">Message: ${cn.message}</div>
      <div class="action-row">
        <button class="editBtn" type="button">Edit</button>
        <button class="deleteBtn" type="button">Delete</button>
      </div>
    `;

    // EDIT
    li.querySelector(".editBtn").addEventListener("click", async () => {
      const newName = prompt("Enter new name:", cn.name || "");
      const newEmail = prompt("Enter new email:", cn.email || "");
      const newMessage = prompt("Enter new message:", cn.message || "");
      await fetch(`/api/contact/${cn._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          message: newMessage
        })
      });

      loadContacts();
    });

    li.querySelector(".deleteBtn").addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete this contact?")) {
        await fetch(`/api/contact/${cn._id}`, { method: "DELETE" });
        loadContacts();
      }
    });

    list.appendChild(li);
  });
}

// DELETE ALL
document.getElementById("deleteAll").addEventListener("click", async () => {
  if (confirm("Are you sure you want to delete all contacts?")) {
    await fetch("/api/contact", {
      method: "DELETE"
    });
    loadContacts();
  }
});

loadContacts();
