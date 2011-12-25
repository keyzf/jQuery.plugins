/*
* 水印文字 (使用绝对定位内嵌层)
* 实际上，当前只有IE6~9的input元素不支持原生 placeholder 属性
*/

(function ($) {
  var attr = 'placeholder', nativeSupported = attr in document.createElement('input');

  $.fn.placeholder = function (options) {
    return this.each(function () {
      var $input = $(this);

      if ( !($input.is(':text') || $input.is(':password') || $input.is('textarea')) ) {
        return;
      }

      if ( typeof options === 'string' ) {
        options = { text: options };
      }

      var opt = $.extend({
        text     : '',
        style    : {},
        namespace: 'placeholder'
      }, options || {});

      if ( !opt.text ) {
        opt.text = $input.attr(attr);
      }

      if ( nativeSupported ) {
        // 仅改变文本 
        $input.attr(attr, opt.text);
        return;
      }

      var width     = $input.outerWidth(), height = $input.outerHeight();
      var box_style = ['marginTop', 'marginLeft', 'paddingTop', 'paddingLeft'];
      
      var show      = function () { $layer.show() }
      var hide      = function () { $layer.hide() }
      var is_empty  = function () { return !$input.val() }
      var check     = function (e) { is_empty() ? show() : hide() }
      
      var position  = function () {
        $layer.css($input.position());
        $.each(box_style, function (i, name) {
          $layer.css(name, $input.css(name))
        })
      }

      var layer_style = {
          top       : 0,
          left      : 0,
          color     : 'gray',
          cursor    : 'text',
          position  : 'absolute',
          fontSize  : $input.css('fontSize'),
          fontFamily: $input.css('fontFamily'),
          display   : is_empty() ? 'block' : 'none'
      };
      
      // create
      var layer_props = {
        text  : opt.text,
        width : width,
        height: 'auto'
      };

      // 确保只绑定一次
      var ns = '.' + opt.namespace, $layer = $input.data('layer' + ns);
      if (!$layer) {
        $input.data('layer' + ns, $layer = $('<div>', layer_props).appendTo($input.offsetParent()) );
      }

      // activate
      $layer
      .css($.extend(layer_style, opt.style))
      .unbind('click' + ns)
      .bind('click' + ns, function () {
        hide();
        $input.focus();
      });

      $input
      .unbind(ns)
      .bind('blur' + ns, check)
      .bind('focus' + ns, hide);

      // 由于 ie 记住密码的特性，需要监听值改变
      // ie9 不支持 jq bind 此事件
      $input.get(0).onpropertychange = check;

      position();
      check();
    })
  };

})(jQuery);