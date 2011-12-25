/*
* 悬停延迟
*/
(function ($) {

$.fn.hoverdelay = function (menter, mleave) {
  return this.each(function () {
    var el = this, $el = $(el),
        delay = 220,
        timer = null,
        leave = $.proxy(mleave || menter, el),
        ready = false,
        ee = 'mouseenter',
        ev = 'mouseleave';

    $el
    [ee](function () {
      ready = true;
      $el.unbind(ev, leave);
      var args = arguments;
      timer = setTimeout(function () {
        if (ready) {
          menter.apply(el, args);
          $el[ev](leave);
        }
      }, delay);
    })
    [ev](function () {
      ready = false;
      clearTimeout(timer);
    });

  });
};

})(jQuery);
