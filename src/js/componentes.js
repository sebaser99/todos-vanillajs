import Swal from 'sweetalert2';
import {Todo} from '../classes';
import { todoList } from '../index';

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const limpiarCompletados = document.querySelector('.clear-completed');
const filtros = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');
const todoCount = document.querySelector('.todo-count strong');

export const crearTodoHtml = (todo)=> {
    const htmlTodo = `
        <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}"> 
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Escribir Todo">
        </li>
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
};
const contadorPendientes = ()=> {
    const pendientes = todoList.todos.filter(todo => todo.completado === false)
    todoCount.innerText = pendientes.length
}
window.addEventListener("load", ()=> {
    contadorPendientes();
  });
txtInput.addEventListener('keyup', (e)=> {
    if(e.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        contadorPendientes();
    }
});

divTodoList.addEventListener('click', (e)=> {
    const nombreElemento = e.target.localName;
    const todoElemento =  e.target.parentElement.parentElement;
    const idElemento = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.toggleTodo(idElemento);
        todoElemento.classList.toggle('completed');
        contadorPendientes();
    } else if(nombreElemento.includes('button')){
        Swal.fire({
            title: '¿Eliminar ToDo?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                todoList.borrarTodo(idElemento);
                divTodoList.removeChild(todoElemento);
                contadorPendientes();
            } else if (result.isDenied) {
                return
            }
        })
        
    }
});

limpiarCompletados.addEventListener('click', ()=> {
    Swal.fire({
        title: '¿Eliminar ToDos completados?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            if(divTodoList.childElementCount > 0){
                for(let i = divTodoList.children.length -1; i>=0; i--){
                    const ele = divTodoList.children[i]
                   if(ele.classList.contains('completed')){
                       divTodoList.removeChild(ele);
                   }
                }
            }
            todoList.eliminarCompletados(); 
        } else if (result.isDenied) {
            return
        }
    })
    
});

filtros.addEventListener('click', (e)=> {
    const filtro = e.target.text;
    if(!filtro) return;

    anchorFilters.forEach(anchor => anchor.classList.remove('selected'));
    e.target.classList.add('selected');

    for(const element of divTodoList.children){
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    element.classList.add('hidden');
                    
                }
            break;

            case 'Completados':
                if(!completado){
                    element.classList.add('hidden');
                }
            break;
        }
    }
    
})