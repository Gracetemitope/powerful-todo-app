import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getTodos, displayTodo, todoItem, clearAllCompleted,
} from './dragAble';
import { addTodo } from './todoActions';

const displayAllTodos = () => {
  for (let i = 0; i < todoItem.length; i += 1) {
    displayTodo(todoItem[i]);
  }
};

function app() {
  const addTodoBtn = document.querySelector('.add-todo-btn');
  addTodoBtn.addEventListener('click', addTodo);
  document.querySelector('.clear-btn').addEventListener('click', clearAllCompleted);
  getTodos();
  displayAllTodos();
}
app();