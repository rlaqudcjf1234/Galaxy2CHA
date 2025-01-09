<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	$(document).ready(function() {
		Vue.component('paginate', VuejsPaginate);
		new Vue({
			el : '#app',
			data : {
				page : {
					pageIndex : 1,
					pageSize : 10,
					pageCount: 0
				},
				count : 0,
				list : []
			},
			mounted : function() {
				var pageIndex = 1;
				if(location.hash){
				    if(history.state && history.state.pageIndex){				    	
				    	pageIndex = history.state.pageIndex;
				    }
				}
				this.getSearch(pageIndex);
			},
			methods : {
				getSearch : function(pageIndex) {
					ajax.search(this, pageIndex, "/temp/selectCount.do", "/temp/selectList.do");
				}
			}
		});
	})
</script>
<div class="container">
	<div id="app">
		<div class="d-flex gap-2 justify-content-start py-1">
			<button class="btn btn-primary" @click="">등록</button>
		</div>
		<table class="table table-sm table-bordered">
			<thead>
				<tr>
					<th scope="col">순번</th>
					<th scope="col">과정</th>
					<th scope="col">성명</th>
				</tr>
			</thead>
			<tbody v-if="list.length > 0">
				<tr v-for="row in list" :key="row.seq">
					<td>{{row.seq}}</td>
					<td>{{row.course}}</td>
					<td>{{row.fullName}}</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr>
					<td colspan="3">데이터가 없습니다.</td>
				</tr>
			</tbody>
		</table>
		<div>
			<span> <paginate v-if="page.pageCount > 0" :page-count="page.pageCount" :page-range="5" :margin-pages="2" :click-handler="getSearch" :prev-text="'<'" :next-text="'>'" :container-class="'pagination'" :page-class="'page-item'" />
			</span>
		</div>
	</div>
</div>