const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

/* const getBooks = (request, response) => {
    pool.query('SELECT * FROM books', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addBook = (request, response) => {
    const { author, title } = request.body

    pool.query(
        'INSERT INTO books (author, title) VALUES ($1, $2)', [author, title],
        (error) => {
            if (error) {
                throw error
            }
            response.status(201).json({ status: 'success', message: 'Book added.' })
        },
    )
}

app
    .route('/books')
    // GET endpoint
    .get(getBooks)
    // POST endpoint
    .post(addBook) */

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/employees", async(req, res) => {
    try {
        const allEmployees = await pool.query("SELECT * FROM employees");
        res.json(allEmployees.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/family/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const allEmployees = await pool.query("SELECT * FROM employees WHERE LOWER(name) LIKE LOWER($1)", ['%' + id]);
        console.log(id);
        res.json(allEmployees.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/employees/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
        res.json(employee.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/employees/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const { phone } = req.body;
        const updateEmployee = await pool.query("UPDATE employees SET email = $1, phone = $2 WHERE id = $3", [email, phone, id]);
        res.json("Employee was updated");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/employees/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteEmployee = await pool.query("DELETE FROM employees WHERE id = $1", [id]);
        res.json("Employee was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/employees", async(req, res) => {
    try {
        const { name } = req.body;
        const { email } = req.body;
        const { phone } = req.body;
        const newEmployee = await pool.query("INSERT INTO employees (name, email, phone) VALUES ($1, $2, $3) RETURNING *", [name, email, phone]);
        res.json(newEmployee);
    } catch (err) {
        console.error(err.message);
    }
});

// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
})