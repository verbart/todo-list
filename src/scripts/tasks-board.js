import { TasksList } from './tasks-list'
import { modalProvider } from '../app';
import { CreateListModal } from './create-list-modal';

export class TasksBoard {
  constructor({ rootEl, lists = [] }) {
    this.lists = lists.map((list) => new TasksList({ ...list, onChange: this.render.bind(this) }));
    this.rootEl = rootEl;

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  addList(list) {
    this.lists.push(new TasksList({ ...list, onChange: this.render.bind(this) }));
    this.render();
  }

  deleteTask(listID) {
    this.lists = this.lists.filter(({ id }) => id !== listID);
    this.render();
  }

  bindEvents() {
    const addListButton = document.querySelector("[data-add-list-button]");

    addListButton.addEventListener('click', () => {
      modalProvider.openModal(CreateListModal);
    });

  }
  
  
  render() {
    this.rootEl.innerHTML = this.lists.map((list) => list.getHTML()).join('');
  }
}
