class TabbedNavigation {

  //TabbedNavigation constructor
  constructor(data) {
    this.$module = data.$module.hide();
    this.$unorderedList = $('<ul />');
  }

  init(){
    this.createTabbedNavigation();
  }

  createTabbedNavigation() {
    this.$unorderedList.insertBefore(this.$module.first());
    this.manipulateUnorderedList();
    this.prepareToShowFirstTabAndRelatedModule();
  }

  //Manipulating the newly created ul
  manipulateUnorderedList() {
    let unorderedList = this.$unorderedList;
    this.$module.each((index, module) => {
      let $listItem = $('<li>' + $(module).find('h2').text() + '</li>');
      $listItem.appendTo(unorderedList);
      this.bindClickToItems($listItem, $(module));
    });
  }

  bindClickToItems($listItem, $module){
    $listItem.bind('click', () => {
      $listItem.addClass('current').siblings().removeClass('current');
      $module.show().siblings('.module').hide();
    })
  }

  //Preparing to show the first tab
  prepareToShowFirstTabAndRelatedModule() {
    this.$module.eq(0).show();
    this.$unorderedList.find('li:first').addClass('current');
  }
}

$(() => {
  let data = {
    $module : $('div .module'),
  };
  let tabbedNavigator = new TabbedNavigation(data);
  tabbedNavigator.init();
});
