class InputHint{

  constructor($label, $input){
    this.label = $label.remove().text();
    this.$input = $input;
    this.makeInputValueShowLabelText();
  }

  makeInputValueShowLabelText(){
    this.$input.val(this.label).addClass('hint');
    this.$input.bind({
        'focus': () => {this.removeHintText();},
        'blur': () => {this.restoreHintText();},
      }).prev('label').remove();
  }

  removeHintText(){
    if (this.$input.val().trim() === this.label){
      this.$input.val('').removeClass('hint');
    }
  }

  restoreHintText(){
    if (this.$input.val().trim() === ''){
      this.$input.val(this.label).addClass('hint');
    }
  }
}

$(() => {
  new InputHint($('label[for="q"]'), $('input[name="q"]'));
});
