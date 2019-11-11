class DisplayManager {

  //DisplayManager constructor
  constructor($blog) {
    this.$blog = $blog;
    this.addEventListenerToBlog();
  }

  addEventListenerToBlog() {
    this.$blog.bind('click', (eventObject) => {
      eventObject.preventDefault();
      let $target = $(eventObject.target);
      $target.is('a') ? this.toggleExcerpt($target) : null;
    });
  }

  toggleExcerpt(target) {
    let $targetExcerpt = target.parents('h3').siblings('p.excerpt');
    target.closest('li').siblings('li').children('p.excerpt').slideUp(1000);
    $targetExcerpt.slideDown(1000);
  }  
}

$(() => {
  new DisplayManager($('#blog'));
});
