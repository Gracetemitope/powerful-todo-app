import { v4 as uuidv4 } from 'uuid';
/* eslint-disable */
import { updateTodoStatus } from './todoStatus';

export let todoItem = [];
  /* eslint-enable */

function reorderArray(from, to, arr) {
  const newArr = [...arr];
  const item = newArr.splice(from, 1)[0];
  newArr.splice(to, 0, item);
  return newArr;
}

export function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todoItem));
}

let previousIndex = 0;
let newIndex = 0;

export const draggableMethods = {
  onDragStart: (event) => {
    event.target.classList.add('drag-sort-active');
    const container = document.getElementById('todo-list');
    const containerChildren = Array.from(container.children);
    previousIndex = containerChildren.length - 1 - containerChildren.indexOf(event.target);
  },
  onDragEnd: () => {
  },
  onDrop: (event) => {
    event.preventDefault();
    const container = document.getElementById('todo-list');
    const draggable = document.querySelector('.drag-sort-active');
    const containerChildren = Array.from(container.children);
    newIndex = containerChildren.length - 1 - containerChildren.indexOf(draggable);
    todoItem = reorderArray(previousIndex, newIndex, todoItem);
    draggable.classList.remove('drag-sort-active');
    saveTodos();
  },
  onDragOver: (event) => {
    event.preventDefault();
    const draggableElements = [...document.querySelectorAll('.draggable:not(.drag-sort-active)')];
    const draggable = document.querySelector('.drag-sort-active');
    const container = document.getElementById('todo-list');
    const afterElement = draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = event.clientY - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  },
};
/* eslint-disable */
export const onDeleteTodo = (event) => removeTodo(event.target.id);
/* eslint-enable */

export const editTodoDescription = (event) => {
  event.preventDefault();
  const { value } = event.target;
  const { id } = event.target.parentElement;
  todoItem = todoItem.map((item) => {
    if (item.id === id) {
      item.description = value;
    }
    return item;
  });
  console.log('todoItem', todoItem);
  saveTodos();
};

export const addTodo = () => {
  const input = document.querySelector('.add-todo-input');
  const newTodo = {
    description: input.value,
    completed: false,
    id: uuidv4(),
  };
  todoItem = [...todoItem, newTodo];
  input.value = '';
  /* eslint-disable */

  displayTodo(newTodo);
  /* eslint-enable */

  saveTodos();
};

export function getTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todoItem = todos;
}

export const displayTodo = (todo) => {
  const todoContain = document.getElementById('todo-list');
  const item = document.createElement('li');
  item.innerHTML = `
 <input id=${todo.id} type="checkbox" ${todo.completed ? 'checked' : ''} value=${todo.completed} class="custom-checkbox mr-2"></input>
   <input type="text" class="flex-grow-1 todo-input">
   <i id=${todo.id} class="fas fa-ellipsis-v text-secondary ellipsis " id="delete-btn"></i>
   <i id=${todo.id} class="fas fa-trash text-secondary d-none delete-todo-btn " id="delete-btn"></i>
   `;
  item.classList.add('d-flex', 'align-items-center', 'mt-2', 'draggable');
  item.setAttribute('draggable', 'true');
  item.setAttribute('id', `${todo.id}`);
  item.dataset.completed = todo.completed;
  item.addEventListener('dragstart', draggableMethods.onDragStart);
  item.addEventListener('dragend', draggableMethods.onDragEnd);
  todoContain.addEventListener('dragover', draggableMethods.onDragOver);
  todoContain.addEventListener('drop', draggableMethods.onDrop);
  item.querySelector('.custom-checkbox').addEventListener('click', updateTodoStatus);
  item.querySelector('.ellipsis').addEventListener('click', (event) => {
    event.target.classList.add('d-none');
    event.target.nextElementSibling.classList.remove('d-none');
  });
  item.querySelector('.delete-todo-btn').addEventListener('click', onDeleteTodo);
  item.querySelector('.todo-input').value = todo.description;
  item.querySelector('.todo-input').addEventListener('change', editTodoDescription);
  todoContain.insertBefore(item, todoContain.firstChild);
};

export function removeTodo(id) {
  const todoContain = document.getElementById('todo-list');
  todoItem = todoItem.filter((item) => item.id !== id);
  todoContain.childNodes.forEach((node) => {
    if (node.id === id) {
      todoContain.removeChild(node);
    }
  });
  saveTodos();
}

export function clearAllCompleted() {
  const todoContain = document.getElementById('todo-list');
  console.log('childnodes', todoContain.children);
  Array.from(todoContain.children).forEach((node) => {
    console.log('node', node);
    if (node.dataset && node.dataset.completed.toString() === 'true') {
      todoContain.removeChild(node);
    }
  });
  todoItem = todoItem.filter((todo) => todo.completed !== true);
  saveTodos();
}