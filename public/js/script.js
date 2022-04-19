const createTodo = async () => {
  let name = document.getElementById("name").value;
  let date = {
    date: [
      new Date().getDate(),
      new Date().getMonth() + 1,
      new Date().getFullYear(),
    ],
    time: [new Date().getHours(), new Date().getMinutes()],
  };
  if (name) {
    let data = {
      name: name,
      date,
    };
    // console.log(data);

    const req = await fetch("/createTodo", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await req.json();
    // console.log(res);
    location.reload();
  } else {
    alert("Empty value!!!");
  }
};

const done = async (id) => {
  const req = await fetch(`/editStatus/${id}`);
  const res = await req.json();
  console.log(res);
  location.reload();
};
const deleteTodo = async (id) => {
  const req = await fetch(`/deleteTodo/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  const res = await req.json();
  location.reload();
};

const openDet = async (id) => {
  const req = await fetch(`/detail/${id}`);
  const res = await req.json();
  document.getElementById("modalDet").style.display = "block";
};

let editId = null;
const openModal = async (id) => {
  editId = id;
  document.getElementById("modalEdit").style.display = "block";
};
const closeModal = () => {
  document.getElementById("modalEdit").style.display = "none";
};

const edit = async () => {
  let rename = document.getElementById("rename").value;
  if (rename != "") {
    let bool = confirm("Are you sure?");
    if (bool) {
      const req = await fetch(`/editTodo/${editId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify((body = { name: rename })),
      });
      const res = await req.json();
      location.reload();
    }
  } else {
    alert("Empty value!!!");
  }
};
