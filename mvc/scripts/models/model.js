import Event from '../utils/Event';

export default class TodosModle {
    constructor() {
        this.todos = [{
            content: 'MVC',
            done: false
        }];
    }

    getTodos() {
        return this.todos;
    }

    setTodos(todos) {
        this.todos = todos;

        // sub/pub (观察者模式)
        Event(this).fire('change');
    }
}
