(function ($) {

  /*
  * 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
  * @delay  {number}    延迟时间，单位毫秒
  * @action {function}  请求关联函数，实际应用需要调用的函数
  * @tail?  {bool}      是否在尾部用定时器补齐调用
  */
  $.throttle = function (delay, action, tail, debounce) {
    var now = $.now, last_call = 0, last_exec = 0,
        timer = null, curr, diff, ctx, args, 
        exec = function () {
          last_exec = now();
          action.apply(ctx, args);
        };

    return function () {
      ctx  = this, 
      args = arguments, 
      curr = now(), 
      diff = curr - (debounce ? last_call : last_exec) - delay;

      clearTimeout(timer);

      if (debounce) {
        if (tail) {
          timer = setTimeout(exec, delay);
        } else if (diff >= 0) {
          exec();
        }
      } else {
        if (diff >= 0) {
          exec();
        } else if (tail) {
          timer = setTimeout(exec, -diff);
        }
      }

      last_call = curr;
    }
  }
  /*
  * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
  * @idle   {number}    空闲时间，单位毫秒
  * @action {function}  请求关联函数，实际应用需要调用的函数
  * @tail?  {bool}      是否在尾部执行
  */
  $.debounce = function (idle, action, tail) {
    return $.throttle(idle, action, tail, true);
  }

})(jQuery);