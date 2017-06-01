import '../styles/index.css';

import InputView from './views/InputView';
import InputController from './controllers/InputController';

import TodoListView from './views/TodoListView';
import TodoListController from './controllers/TodoListController';

import TodosModle from './models/model';

class Page {
    constructor() {
        this.todosModle = new TodosModle();
    }

    init() {
        this.initInputModule();
        this.initTodoListModule();
    }

    initInputModule() {
        this.inputController = new InputController(this.todosModle);
        this.inputView = new InputView(this.inputController);
    }

    initTodoListModule() {
        this.todoListController = new TodoListController(this.todosModle);
        this.todoListView = new TodoListView(this.todoListController, this.todosModle);
    }
}

const page = new Page();
page.init();
