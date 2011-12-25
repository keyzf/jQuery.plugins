// 表情转换
(function ($) {

  var config = {
  	ext : '.gif',
    path: 'http://mat1.gtimg.com/www/mb/images/face/',
    emotions: ["惊讶", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "微笑", "难过", "酷", "抓狂", "吐", "偷笑", "可爱", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "大兵", "奋斗", "咒骂", "疑问", "嘘", "晕", "折磨", "衰", "骷髅", "敲打", "再见"]
  }

  var pad = function (n) { 
	  return n < 10 ? '0' + n : n 
	}

  var regexs = $.map(config.emotions, function (v) { 
	  return new RegExp('\\[' + v + '\\]', 'g')
	})

  var htmlencode = function (html) { 
	  return html ? $('<div>').text(html).html().replace(/"/g, '&quot;') : '' 
	}

  $.emotion = function (txt) {
    $.each(regexs, function (i, r) {
      txt = txt.replace(r, function (m) {
      	return  '<img title="' + config.emotions[i] + '" src="' + config.path + pad(i+1) + config.ext+'" />';
      })
    })
    return txt
  }

  $.fn.emotion = function () {
    return this.each(function () {
      $('*:not(script)', this).andSelf()
      .contents().filter(function () {
        return this.nodeType === 3 && $.trim(this.nodeValue)
      })
      .replaceWith(function () {
        return $.emotion(htmlencode(this.nodeValue))
      })
    })
  }

  $.emotion.config = config

})(jQuery);