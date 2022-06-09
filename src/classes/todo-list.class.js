import { Todo } from "./todo.class";

export class TodoList {
    constructor(){
        this.cargarLocalStorage();
    }
    nuevoTodo = (todo)=> {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }
    borrarTodo = (id)=> {
        this.todos = this.todos.filter(todo => todo.id !== Number(id));
        this.guardarLocalStorage();
    }
    toggleTodo = (id) => {
        for(let todo of this.todos){
            if(todo.id === Number(id)){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }
    eliminarCompletados = ()=> {
        this.todos = this.todos.filter(todo => !todo.completado );
        this.guardarLocalStorage();
    }
    guardarLocalStorage = ()=> {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    cargarLocalStorage = ()=> {
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
        this.todos = this.todos.map(Todo.fromJson)
    }
}