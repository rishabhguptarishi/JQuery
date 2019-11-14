class Loader {

  constructor(data) {
    this.$headLines = data.$headLines;
  }

  init() {
    this.createTargetDivs();
  }

  createTargetDivs() {
    this.$headLines.each((index, element) => {
      let $targetDiv = $('<div />', { 'id': `targetDiv${index}`});
      let $headlineElement = $(element);
      $targetDiv.insertAfter(element);
      $headlineElement.data('targetDiv', $targetDiv);
      this.addEventListenerToHeadLine($headlineElement);
    });
  }

  addEventListenerToHeadLine(element) {
    element.bind('click', (eventObject) => {
      eventObject.preventDefault();
      let id = `#${element.find('a').attr('href').split('#')[1]}`;
      element.data('targetDiv').load(`data/blog.html ${id}`);      
    });
  }
}

$(() => {
  let data = {
    $headLines : $('#blog h3'),
  };
  new Loader(data).init();
});
