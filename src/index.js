import './styles.css';
import {TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();
todoList.todos.forEach(crearTodoHtml);
todoList.todos.length > 0 ? todoList.todos[0].imprimirTodo() : console.log("No hay todos para mostrar");
