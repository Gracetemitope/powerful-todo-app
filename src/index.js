import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const todoItem = [
  {
    description: 'Microverse daily tasks',
    completed: true,
    index: 0,
  },
  {
    description: 'Read Product Book',
    completed: false,
    index: 0,
  },
  {
    description: 'Get started on webpack',
    completed: true,
    index: 0,
  },
  {
    description: 'Microverse daily tasks',
    completed: true,
    index: 0,
  },
  {
    description: 'Cook food',
    completed: true,
    index: 0,
  },
];

const displayTodo = () => {
  for (let i = 0; i < todoItem.length; i += 1) {
    const todoContain = document.getElementById('todo-list');
    const div = document.createElement('div');
    div.innerHTML = `
 <input type="checkbox" class="custom-checkbox mt-2 mr-2"></input>
   <p class="li flex-grow-1">${todoItem[i].description}</p>
   <i class="fas fa-ellipsis-v text-secondary mt-2"></i>
   `;
    const classestoAdd = ['d-flex'];
    div.classList.add(...classestoAdd);
    todoContain.appendChild(div);
  }
};
displayTodo();
