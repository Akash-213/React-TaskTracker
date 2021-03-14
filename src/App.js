import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddTask from './Components/AddTask';
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Tasks from "./Components/Tasks"
import About from "./Components/About"

function App() {

  const [showAddtask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch Data of Tasks from localhost json server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')

    const data = await res.json()
    // console.log(data)
    return data
  }

  //Fetch individual task

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)

    const data = await res.json()
    return data
  }

  //Add task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // // ...tasks -> pulls the data
    // // settasks -> creates a new instance
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // toggle Reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)

    const updatedTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id
      ? { ...task, reminder: !data.reminder }
      : task))
  }

  return (
    <Router>
      <div className="container">
        <Header
          title='Task Tracker'
          onAdd={() => setShowAddTask(!showAddtask)}
          showAddBtn={showAddtask}
        />


        <Route path='/' exact
          render={(props) => (
            <>
              {showAddtask && <AddTask onAdd={addTask} />}

              {tasks.length > 0 ? (
                <Tasks tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder} />
              ) : ('No Tasks To Show ! Start adding one !!'
              )}
            </>
          )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>

  )
}

export default App;
