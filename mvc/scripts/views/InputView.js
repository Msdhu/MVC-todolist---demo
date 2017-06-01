import $ from 'jquery';

export default class InputView {
    constructor(controller) {
        this.controller = controller;
        this.init();
    }

    init() {
        this.creatDom();
        this.bindEvents();
    }

    creatDom() {
        this.$element = $('<div>' +
                              '<input type="text" class="input-todo">' +
                              '<button class="new-todo-btn">新增</button>' +
                        '</div>');
        this.inputTodo = this.$element.find('.input-todo');
        this.newTodoBtn = this.$element.find('.new-todo-btn');
        this.$element.appendTo($('#todo-input'));
    }

    bindEvents() {
        this.newTodoBtn.on('click', () => this.handleBtnClick());
    }

    handleBtnClick() {
        const val = this.inputTodo.val();
        if (!val) {
            return;
        }
        this.inputTodo.val('');
        this.controller.onAddNewTodo(val);
    }
}
