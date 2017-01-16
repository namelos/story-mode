import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Tasks } from '../imports/api/tasks'
import { createContainer } from 'meteor/react-meteor-data'

const App = createContainer(
  () => ({ tasks: Tasks.find({}).fetch() }),
  ({ tasks }) => {
    let task
    const handleSubmit = e => {
      e.preventDefault()
      Tasks.insert({ text: task.value, createdAt: new Date })
    }
    return <div>
      <ul>{tasks.map(task => <Task task={task} key={task._id}/>)}</ul>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={t => task = t} />
      </form>
    </div>
  })

const Task = ({ task }) => {
  const deleteTask = () => Tasks.remove(task._id)
  const toggle = e => {
    e.preventDefault()
    Tasks.update(task._id, {
      $set: { checked: !task.checked }
    })
  }

  return <div>
    <li onClick={toggle} style={{ textDecoration: !task.checked || 'line-through' }}>{task.text}</li>
    <button onClick={deleteTask}>-</button>
  </div>
}

Meteor.startup(() => render(<App />, document.querySelector('#app')))