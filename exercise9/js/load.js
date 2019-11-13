class Loader {

  constructor($headLines) {
    this.$headLines = $headLines;
    this.createTargetDivs();
  }

  createTargetDivs() {
    this.$headLines.each((index, element) => {
      let $targetDiv = $('<div />', { 'id': `targetDiv${index}`});
      $targetDiv.insertAfter(element);
      $(element).data('targetDiv', $targetDiv);
      this.addEventListenerToHeadLine(element);
    });
  }

  addEventListenerToHeadLine(element) {
    $(element).bind('click', (eventObject) => {
      eventObject.preventDefault();
      let id = `#${$(element).find('a').attr('href').split('#')[1]}`;
      $(element).data('targetDiv').load(`data/blog.html ${id}`);
    });
  }
}

$(() => {
  new Loader($('#blog h3'));
});
