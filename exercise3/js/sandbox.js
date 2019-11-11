class Manipulator{

  constructor(){
    this.$myList = $('#myList');
    this._$lastModule = $('.module').last();
    this.manipulations();
  }

  manipulations(){
    this.addFiveListItemsToMyList();
    this.removeOddItems();
    this.manipulateLastModuleDiv();
    this.addAnotherDayOption();
    this.addAnotherModuleDiv();
  }

  addFiveListItemsToMyList(){
    let myListLength = this.$myList.children().length;
    for (let list = myListLength + 1; list <= myListLength + 5; list++) {
      this.$myList.append(`<li>List Item ${list}</li>`);
    }
  }

  removeOddItems(){
    this.$myList.find('li:even').remove();
  }

  manipulateLastModuleDiv(){
    this._$lastModule.append($('<h2 />')).append($('<p />'));
  }

  addAnotherDayOption(){
    $('select[name="day"]').append($('<option />', {
      'value': 'Wednesday',
      'text': 'Wednesday',
    }));
  }

  addAnotherModuleDiv(){
    let $newModuleDiv = $('<div />', {'class': 'module'});
    $newModuleDiv.append($('img').clone(true).get(0));
    $newModuleDiv.insertAfter(this._$lastModule);
  }
}

$(() => {
  new Manipulator();
});
