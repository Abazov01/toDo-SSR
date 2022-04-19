const express = require("express");
const router = express.Router();

let todos = [
  // {
  //   id: 1,
  //   name: "expample",
  //   status: "new",
  // },
];
// {
//     id,
//     name,
//     date,
//     status, // new proccess, done
//     description
// }

router
  .get("/", (req, res) => {
    res.render("home", { todos: todos });
  })
  .get("/detail/:id", (req, res) => {
    let { id } = req.params;
    let todo = todos.filter((e) => e.id == id);
    res.render("detail", { todo: todo[0] });
  })
  .post("/createTodo", (req, res) => {
    let body = req.body;
    let data = {
      id: todos.length == 0 ? 1 : todos[todos.length - 1].id + 1,
      name: body.name,
      date: body.date,
      status: "new",
    };
    todos.push(data);
    res.send({ status: "success", data });
  })
  .delete("/deleteTodo/:id", (req, res) => {
    let { id } = req.params;
    todos = todos.filter((e) => e.id != id);
    res.send({ status: "deleted" });
  })
  .get("/editStatus/:id", (req, res) => {
    let { id } = req.params;
    todos.map((e) => {
      console.log(e.id);
      console.log(id);
      if (e.id == id) {
        if (e.status == "new") {
          e.status = "proccess";
        } else if (e.status == "proccess") {
          e.status = "completed";
        } else {
          e.status = "new";
        }
      }
    });
    res.send({ status: "edited", todos });
  })
  .patch("/editTodo/:id", (req, res) => {
    let { id } = req.params;
    let { body } = req;
    todos.map((e) => {
      if (e.id == id) {
        console.log(body);
        e.name = body.name;
      }
    });
    res.send({ status: "edited" });
  });
module.exports = router;
