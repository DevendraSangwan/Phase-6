async function loadNotes(){
      const res = await fetch("http://localhost:4003/api/notes");
      const notes= await res.json();

      const list =document.getElementById("notesList");
      list.innerHTML="";

      notes.forEach(cn=>{
        const li=document.createElement("li");
         li.innerHTML = `
      <div class="Notes-title">Title:  ${cn.title}</div>
      <div class="Notes-content">Content:  ${cn.content}</div>
      <button class="editBtn">Edit</button>
    `;
    
    // EDIT
    li.querySelector(".editBtn").addEventListener("click", async () => {
      const newTitle = prompt("Enter new Title:", cn.title);
      const newContent = prompt("Enter new Content:", cn.content);

      await fetch(`http://localhost:4003/api/notes/${cn._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
        })
      });

      loadNotes();
    });

    list.appendChild(li);


      });
}


// DELETE ALL
document.getElementById("deleteAll").addEventListener("click", async () => {
  if (confirm("Are you sure you want to delete all Notes?")) {
    await fetch("http://localhost:4003/api/notes", {
      method: "DELETE"
    });
    loadNotes();
  }
  
});
loadNotes();