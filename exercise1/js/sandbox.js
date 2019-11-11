class Selector {

  constructor() {
    this.selector();
  }

  selector() {
    this.runSelector1();
    this.runSelector2();
    this.runSelector3();
    this.runSelector4();
    this.runSelector5();
    this.runSelector6();
  }

  runSelector1() {
    let $module = $('div .module');
    console.log(`1. ALl div elements that have a class of 'module': ${$module}. They are ${$module.length} in number.`);
  }

  runSelector2() {
    let $thirdChild1 = $('#myListItem');
    let $thirdChild2 = $('#myList > li#myListItem');
    let $thirdChild3 = $('#myList').find("li:eq(2)");
    console.log(`2. The third item in the #myList unordered list is ${$thirdChild1} and it says: ${$thirdChild1.html()}`);
  }

  runSelector3() {
    let $label = $('label[for="q"]');
    console.log(`3. The label for the search input is ${$label} and it says: ${$label.html()}`);
  }

  runSelector4() {
    let howManyHidden = $(':hidden').length;
    console.log(`4. There are ${howManyHidden} hidden elements on this page`);
  }

  runSelector5() {
    let howManyAlts = $('img[alt]').length;
    console.log(`5. There are ${howManyAlts} Image elements with the 'alt' attribute on this page`);
  }

  runSelector6() {
    let $oddRows = $('tr:even');
    console.log(`6. There are ${$oddRows.length} odd table rows on this page`);
  }
}

$(() => {
  new Selector();
});
