async function loadContacts() {
  const res = await fetch("http://localhost:4001/api/contact");
  const contacts = await res.json();

  const list = document.getElementById("contactList");
  list.innerHTML = "";

  contacts.forEach(cn => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="contact-name">Nmae:  ${cn.name}</div>
      <div class="contact-email">email:  ${cn.email}</div>
      <div class="contact-message">message:  ${cn.message}</div>
      <button class="editBtn">Edit</button>
    `;

    // EDIT
    li.querySelector(".editBtn").addEventListener("click", async () => {
      const newName = prompt("Enter new name:", cn.name);
      const newEmail = prompt("Enter new email:", cn.email);
      const newMessage = prompt("Enter new message:", cn.message);

      await fetch(`http://localhost:4001/api/contact/${cn._id}`, {
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

    list.appendChild(li);
  });
}

// DELETE ALL
document.getElementById("deleteAll").addEventListener("click", async () => {
  if (confirm("Are you sure you want to delete all feedback?")) {
    await fetch("http://localhost:4001/api/contact", {
      method: "DELETE"
    });
    loadContacts();
  }
});

loadContacts();
