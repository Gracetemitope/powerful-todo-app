import { v4 as uuidv4 } from 'uuid';
/* eslint-disable */

import { displayTodo, getTodos, saveTodos } from './dragAble';
/* eslint-enable */

export const editTodoDescription = (event) => {
  event.preventDefault();
  const { value } = event.target;
  const { id } = event.target.parentElement;
  let todoItem = JSON.parse(localStorage.getItem('todos')) || [];
  todoItem = todoItem.map((item) => {
    if (item.id === id) {
      item.description = value;
    }
    return item;
  });
  saveTodos(todoItem);
};

export const addTodo = () => {
  const input = document.querySelector('.add-todo-input');
  const newTodo = {
    description: input.value,
    completed: false,
    id: uuidv4(),
  };
  const todoItem = [...getTodos(), newTodo];
  input.value = '';
  /* eslint-disable */

  displayTodo(newTodo);
  /* eslint-enable */

  saveTodos(todoItem);
};

export function removeTodo(id) {
  const todoContain = document.getElementById('todo-list');
  const todoItem = getTodos().filter((item) => item.id !== id);
  todoContain.childNodes.forEach((node) => {
    if (node.id === id) {
      todoContain.removeChild(node);
    }
  });
  saveTodos(todoItem);
}

/* eslint-disable */
export const onDeleteTodo = (event) => removeTodo(event.target.id);
/* eslint-enable */
