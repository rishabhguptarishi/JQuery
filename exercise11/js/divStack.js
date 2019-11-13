class DivStack {

  constructor(data) {
    this.$body = data.$body;
    this.$button = data.$button;
    this.$emptyContainer = data.$emptyContainer;
    this.counter = 1;
  }

  init() {
    this.$emptyContainer.append(this.$button);
    this.$body.append(this.$emptyContainer);
    this.addEventListener();
  }

  addBinding() {
    this.$emptyContainer.bind('click', (eventObjet) => {
      this.checkTargetTagType($(eventObjet.target));
    });
  }

  checkTargetTagType(target) {
    if (target.not('.emptyContainer').is('div')) {
      this.manipulateDiv(target);
    } else if (target.is('input')) {
      this.appendNewDiv();
    }
  }

  manipulateDiv(target) {
    target.nextAll().length === 0 ? this.removeDiv(target) : target.addClass('highlightedDiv');
  }

  removeDiv(target) {
    target.remove();
    this.counter -= 1;
  }

  appendNewDiv() {
    this.$emptyContainer.append($('<div />', {'class': 'newDiv','html': `DIV NUMBER ${this.counter}`}));
    this.counter += 1;
  }
}

$(() => {
  let data = {
    $body : $('body'),
    $button : $('<input />', {
      'type': 'button',
      'value': 'Add Item',
      'class': 'addButton',
    }),
    $emptyContainer : $('<div />', {'class': 'emptyContainer', }),
  };
  new DivStack(data).init();
});
