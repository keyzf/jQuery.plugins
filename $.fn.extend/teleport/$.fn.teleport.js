/*
* 神奇感应
* 应用：定位跟随，无限内容传送
*/

(function ($) {
  var $win = $(window);

  var Teleport = function (el, options) {
    var $el = $(el), self = this;
    if (!$el.length) return;

    this.$el = $el;
    this.opt = $.extend({}, this.defaults, options || {});

    this._scrollHandler = $.throttle(60, function () {
      self.checkInView();
    }, true);
    
    // buged: this._scrollHandler = $.proxy(this.checkInView,this);
    this.enable();
    this.regist();
    $el.data()[this.opt.namespace] = this;

    // check asap.
    setTimeout($.proxy(this.checkInView, this), 0)
  };
  
  Teleport.isInView = function ($el) {
    return $win.scrollTop() + $win.height() > $el.offset().top;
  };

  Teleport.prototype = {
    defaults: {
      namespace: 'teleport',
      inView   : $.noop
    },
    disable: function () {
      var ns = this.opt.namespace;
      $win.unbind('scroll.' + ns + ' resize.' + ns, this._scrollHandler);
    },
    enable: function () {
      this.disable();
      var $el = this.$el, ns = this.opt.namespace;
      $win.bind('scroll.' + ns + ' resize.' + ns, this._scrollHandler);
    },
    checkInView: function () {
      var $el = this.$el, ns = this.opt.namespace;
      if (this.isInView()) {
        $el.trigger(ns + ':inView');
      }
    },
    isInView: function () {
      return Teleport.isInView(this.$el);
    },
    // bind ui events;
    regist: function () {
      var self = this, $el = self.$el, opt = self.opt, ns = opt.namespace;
      $.each(opt, function (k, v) {
        $.isFunction(v) && $el.bind(ns + ':' + k, v)
      });
    }
  };

  // exports
  $.Teleport    = Teleport;
  $.fn.teleport = function (options) {
    return this.each(function () {
      var type = typeof options;
      if (type === 'object') {
        // instantiate 
        new Teleport(this, options);
      } else if (type === 'string') {
        // call instance method. eg: $el.teleport('disable')
        var tp = $(this).data().teleport;
        tp && $.isFunction(tp[options]) && tp[options]();
      }
    })
  };

})(jQuery);