export default class InputController {
    constructor(model) {
        this.model = model;
    }

    onAddNewTodo(content) {
        const todos = this.model.getTodos();
        todos.unshift({ content, done: false });
        this.model.setTodos(todos);
    }
}
