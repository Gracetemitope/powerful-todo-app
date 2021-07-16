import { v4 as uuidv4 } from 'uuid';
import { updateTodoStatus } from './todoStatus';

export let todoItem = [ ];


export const draggableMethods = {
  onDragStart: (event) => event.target.classList.add('drag-sort-active'),
  onDragEnd: (event) => event.target.classList.remove('drag-sort-active'),
  onDragOver: (event) => {
    event.preventDefault();
    const draggableElements = [...document.querySelectorAll('.draggable:not(.drag-sort-active)')];
    const container = document.getElementById("todo-list")
    const afterElement = draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = event.clientY - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
    const draggable = document.querySelector('.drag-sort-active');
    if (afterElement === null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
    return 
  }
}

export const displayTodo = (todo) => {
  const todoContain = document.getElementById('todo-list');
    const item = document.createElement('li');
    item.innerHTML = `
 <input id=${todo.id} type="checkbox" ${todo.completed ? 'checked' : ''} value=${todo.completed} class="custom-checkbox mr-2"></input>
   <label class="flex-grow-1" for=${todo.id}><p class="li">${todo.description}</p></label>
   <i id=${todo.id} class="fas fa-ellipsis-v text-secondary  delete-todo-btn " id="delete-btn"></i>
   `;
   console.log('innerHTML', item);
   item.classList.add('d-flex', 'align-items-center', 'mt-2', 'draggable');
   item.setAttribute("draggable", "true");
   item.setAttribute("id", `${todo.id}`);
   item.dataset.completed = todo.completed;
   item.addEventListener('dragstart', draggableMethods.onDragStart);
   item.addEventListener('dragend', draggableMethods.onDragEnd);
   todoContain.addEventListener('dragover', draggableMethods.onDragOver);
   item.querySelector(".custom-checkbox").addEventListener('click', updateTodoStatus);
   todoContain.insertBefore(item, todoContain.firstChild)
};

export function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todoItem))
}

export const addTodo = () => {
  const input = document.querySelector(".add-todo-input");
  console.log('input value', input.value);
  const newTodo = {
    description: input.value,
    completed: false,
    id: uuidv4(),
  }
  todoItem = [...todoItem, newTodo];
  input.value = "";
  displayTodo(newTodo);
  saveTodos();
}

export function getTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todoItem = todos;
}

