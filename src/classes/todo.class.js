
export class Todo {


    constructor(tarea) {
        this.tarea = tarea;

        this.id = new Date().getTime(); //12312323
        this.completado = false;
        this.creado = new Date();
    }

}