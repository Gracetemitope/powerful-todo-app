/* eslint-disable */
  import { getTodos } from './dragAble';

export function updateTodoStatus(event) {
    /* eslint-enable */
  const todoContain = document.getElementById('todo-list');
  const { checked, id } = event.target;
  let allTodos = JSON.parse(localStorage.getItem('todos')) || [];
  allTodos = allTodos.map((todo) => {
    if (todo.id === id) {
      todo.completed = checked;
    }
    return todo;
  });
  localStorage.setItem('todos', JSON.stringify(allTodos));
  getTodos();
  Array.from(todoContain.children).forEach((node) => {
    if (node.id === id) {
      const element = node.querySelector('.custom-checkbox');
      element.setAttribute('checked', checked);
      node.dataset.completed = checked;
    }
  });
}