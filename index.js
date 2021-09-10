const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const connectDB = require('./config')
//models
const TodoTask = require("./models/TodoTask");

app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true }));

connectDB()

app.set("view engine", "ejs");

// GET METHOD
app.get("/", async (req, res) => {
    let taskSort;
    if (req.query.query === 'asc' || !req.query.query) taskSort = await TodoTask.find({}).sort('content')
    if (req.query.query === 'desc') taskSort = await TodoTask.find({}).sort('-content')
    console.log(taskSort);
    res.render("todo.ejs", { todoTasks: taskSort });
});

//POST METHOD
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

//UPDATE
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

app.listen(3000, () => console.log("Server Up and running"));
