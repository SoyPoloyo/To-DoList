import { Todo } from "../classes";
import { todoList } from "../index";

//Referencias del html
const todoListado = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) =>
   todoListado.innerHTML += `
     <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
           <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
           <label>${todo.tarea}</label>
           <button class="destroy"></button>
        </div>
     </li>`;

//Eventos

txtInput.addEventListener('keyup', (event) => {

   if (event.keyCode === 13 && txtInput.value.length > 0) {
      const nuevoTodo = new Todo(txtInput.value);
      todoList.nuevoTodo(nuevoTodo);
      crearTodoHtml(nuevoTodo);
      txtInput.value = '';
   }

})

todoListado.addEventListener('click', (event) => {

   const nombreElemento = (event.target.localName); // input,label, button
   const todoElemento = event.target.parentElement.parentElement;
   const todoId = todoElemento.getAttribute('data-id');

   if (nombreElemento.includes('input')) { // click en el check
      todoList.marcarCompletado(todoId);
      todoElemento.classList.toggle('completed');
   }
   else if (nombreElemento.includes('button')) {// borrar el todo
      todoList.eliminarTodo(todoId);
      todoListado.removeChild(todoElemento);
   }


})

btnBorrar.addEventListener('click', () => {

   todoList.eliminarCompletados();

   for (let i = todoListado.children.length - 1; i >= 0; i--) {
      const elemento = todoListado.children[i]
      if (elemento.classList.contains('completed')) {
         todoListado.removeChild(elemento);
      }
   }

})

ulFiltros.addEventListener('click', (event) => {
   console.log(event.target.text);

   const filtro = event.target.text;

   if (!filtro) { return }

   anchorFiltros.forEach(elem => elem.classList.remove('selected'));
   
   event.target.classList.add('selected')

   for (const elemento of todoListado.children) {
      elemento.classList.remove('hidden');
      const completado = elemento.classList.contains('completed');

      switch (filtro) {

         case 'Pendientes':
            if (completado) {
               elemento.classList.add('hidden');
            }
            break;
         case 'Completados':
            if (!completado) {
               elemento.classList.add('hidden');
            }
            break;

         default:
            break;
      }

   }


})


