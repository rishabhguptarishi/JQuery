class TabbedNavigation {

  //TabbedNavigation constructor
  constructor(data) {
    this.$module = data.$module.hide();
    this.$unorderedList = $('<ul />');
    this.init();
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
    this.$module.each(function() {
      let $innerModule = $(this);
      let $listItem = $('<li>' + $(this).find('h2').text() + '</li>');
      $listItem.appendTo(unorderedList);
      $listItem.bind('click', function() {
        $listItem.addClass('current').siblings().removeClass('current');
        $innerModule.show().siblings('.module').hide();
      })
    });
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
  new TabbedNavigation(data);
});
