import _ from 'lodash';
import style from './style.css';

let todoItem = [
  {
    "description": "Microverse daily tasks",
    "completed": true,
    "index": 0
  },
  {
    "description": "Read Product Book",
    "completed": false,
    "index": 0
  },
  {
    "description": "Get started on webpack",
    "completed": true,
    "index": 0
  },
  {
    "description": "Microverse daily tasks",
    "completed": true,
    "index": 0
  },
  {
    "description": "Cook food",
    "completed": true,
    "index": 0
  },
]

const displayTodo = () => {
for (let i = 0; i < todoItem.length; i++){
let todoContain = document.getElementById("todo-list")
const div = document.createElement('div')
  const ul = document.createElement('ul')
 let display = ul.innerHTML = `
   <li>${todoItem[i].description}</li>
   `

  todoContain.appendChild(ul)

console.log(display)
  // console.log(todoItem[i]);
  
  }
}
displayTodo()
