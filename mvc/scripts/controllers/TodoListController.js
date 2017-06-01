export default class TodoListController {
    constructor(model) {
        this.model = model;
    }

    onCheck(index) {
        const todos = this.model.getTodos();
        const todo = todos[index];
        todo.done = !todo.done;
        this.model.setTodos(todos);
    }
}
