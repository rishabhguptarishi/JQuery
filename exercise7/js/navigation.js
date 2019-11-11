class Navigation {

  constructor($dropDown) {
    this.$dropDown = $dropDown;
    this.manipulateDropDownMenu();
  }

  manipulateDropDownMenu() {
    this.$dropDown.parent('li').hover(() => {
        this.$dropDown.toggleClass('hover');
      });
  }
}

$(() => {
  new Navigation($('#nav ul'));
});
