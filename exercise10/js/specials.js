class Special {

  constructor($specials) {
    this.$specials = $specials;
    this.$targetDiv = $('<div />');
    this.selectItems = this.$specials.find('select');
    this.$cachedReturnedObject = null;
    this.init();
  }

  init() {
    this.$targetDiv.insertAfter(this.$specials);
    this.bindChangeEvent();
    this.$specials.find('li.buttons').remove();
  }

  bindChangeEvent() {
    this.selectItems.bind('change', () => {
      let value = this.selectItems.val();
      !value ? this.$targetDiv.empty() : this.checkIfJSONObjectIsCached(value);
    });
  }

  checkIfJSONObjectIsCached(value) {
    this.$cachedReturnedObject ? this.generateHTMLForSpecial(this.$cachedReturnedObject, value) : this.loadAjax(value);
  }

  loadAjax(value) {
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: 'data/specials.json',
      success: (returnedObject) => {
        this.$cachedReturnedObject = returnedObject;
        this.generateHTMLForSpecial(returnedObject, value);
      }
    });
  }

  generateHTMLForSpecial(returnedObject, value) {
    if (returnedObject[value]) {
      let returnedObjectData = returnedObject[value];
      this.$targetDiv.html('');
      this.$targetDiv.append($('<h3 />', {
        'style': `color:${returnedObjectData.color}`,
        'text': returnedObjectData.title,
      }));

      this.$targetDiv.append($('<p />', { 'text': returnedObjectData.text, }));
      let image = returnedObjectData.image;
      image = image.charAt('0') === '/' ? image.substring(1) : image;
      this.$targetDiv.append($('<img />', { 'src': image, }));
    } else {
      alert(`No Specials for ${value}`);
    }
  }
}

$(() => {
  new Special($('#specials form'));
});
