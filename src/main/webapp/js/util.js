const util = {};

util.wrap = '<div class="wrap-loading"><span class="loading"></span></div>';
util.show = () => {
	$('body').append(wrap);
}
util.close = () => {
	$('.wrap-loading').remove();
}