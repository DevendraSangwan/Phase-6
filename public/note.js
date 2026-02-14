const form=document.getElementById('notesForm');

form.addEventListener("submit",async(e)=>{
  e.preventDefault();

  const notes={
    title:document.getElementById("title").value,
    content:document.getElementById("content").value
  };
   
   const res = await fetch("http://localhost:4003/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notes)
      });

      const data=await res.json();
      document.getElementById("result").innerText=data.message;
      form.reset();
})