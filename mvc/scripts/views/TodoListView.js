import $ from 'jquery';
import Event from '../utils/Event';

export default class TodoListView {
    constructor(controller, model) {
        this.controller = controller;
        this.model = model;
        this.init();
    }

    init() {
        this.creatDom();
        this.bindEvents();
    }

    creatDom() {
        this.$element = $('<ul></ul>');
        this.creatListDom();
        this.$element.appendTo($('#todos-list'));
    }

    creatListDom() {
        const todos = this.model.getTodos();
        const html = todos.map(({ content, done }, key) => {
            if (done) {
                return `<li class="done" data-index="${key}">${content}</li>`;
            }
            return `<li data-index="${key}">${content}</li>`;
        }).join('');

        this.$element.html(html);
    }

    bindEvents() {
        Event(this.model).on('change', () => this.handleModelChange());
        this.$element.on('click', 'li', event => this.handleListClick(event));
    }

    handleModelChange() {
        this.creatListDom();
    }

    handleListClick(event) {
        const $tar = $(event.currentTarget);
        const index = $tar.attr('data-index');
        this.controller.onCheck(+index);
    }
}
