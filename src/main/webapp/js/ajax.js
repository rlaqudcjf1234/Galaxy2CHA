/**
 * 
 */
const ajax = {};

ajax.search = (context, pageIndex, countUrl, listUrl) => {
	util.show();
	
	context.page.pageIndex = pageIndex;
	let count = $.ajax({
		url: countUrl,
		type: 'post',
		context: context,
		data: context.page,
		dataType: 'JSON',
		success: function(res) {
			context.count = res;
		}
	});
	let list = $.ajax({
		url: listUrl,
		type: 'post',
		context: context,
		data: context.page,
		dataType: 'JSON',
		success: function(res) {
			context.list = res;
		}
	});
	$.when(count, list).then(() => {
		
		context.page.pageCount = Math.ceil(context.count / context.page.pageSize);
		
		let urlParams = new URLSearchParams(window.location.search);
		
		$.each(context.page, (key, value) =>{
			urlParams.set(key, value);
		});
		history.replaceState(Object.fromEntries(urlParams), null, 'list.do##');
		
		util.close();
	});
	
}