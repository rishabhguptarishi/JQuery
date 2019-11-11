class Traversal {

  constructor() {
    this.traversal();
  }

  traversal() {
    this.logAltAttribute();
    this.traverseToForm();
    this.removeCurrentClass();
    this.traverseToButton();
    this.useSlideshowFirstList();
  }

  logAltAttribute() {
    $('img').each( function(i) {
      console.log($(this).attr('alt'))
    });
  }

  traverseToForm() {
    //$('input[name="q"]').parent().attr('class', 'searchForm');
    $('input[name="q"]').closest('form').attr('class', 'searchForm');
  }

  removeCurrentClass() {
    $('#myList .current').removeClass('current').next().addClass('current');
  }

  traverseToButton() {
    $('#specials select').parent().next().find("input[type='submit']");
  }

  useSlideshowFirstList() {
    $('#slideshow li:first').addClass('current').siblings().addClass('disabled');
  }
}

$(() => {
  new Traversal();
});
