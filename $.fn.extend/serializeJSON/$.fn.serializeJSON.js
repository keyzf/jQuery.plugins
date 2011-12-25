(function ($) {

$.fn.serializeJSON = function(){
	var json = {};
	$.each( this.serializeArray(),function(i,v){ json[v.name] = v.value } );
	return json;
};

})(jQuery);