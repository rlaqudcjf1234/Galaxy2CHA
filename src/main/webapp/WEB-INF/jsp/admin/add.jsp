<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	$(document).ready(function() {
		Vue.component('paginate', VuejsPaginate);
		new Vue({
			el : '#app',
			data : {
				page : {
					no : 1,
					size : 10,
					count : 0
				},
				count : 0,
				list : []
			},
			mounted : function() {
				this.getSearch(1);
			},
			methods : {
				getSearch : function(pageNo) {
					$('#form > input[name=pageNo]').val(pageNo);
					ajax.search("form", this, "/admin/list.do", "/admin/selectList.do");
				},
				goRegister : function() {
					$("#form").attr("action","/admin/add.do").submit();
				}
			}
		});
	})
</script>
<div class="container">
	<div id="app">
		<form id="form" method="get">
			<input type="hidden" name="pageNo" v-model="page.no">
		</form>
		<table class="table table-sm table-bordered">
			<thead>
				<tr>
					<th scope="col">이메일</th>
					<th scope="col">성명</th>
					<th scope="col">연락처</th>
					<th scope="col">사용여부</th>
				</tr>
			</thead>
			<tbody v-if="list.length > 0">
				<tr v-for="row in list" :key="row.seq">
					<td>{{row.email}}</td>
					<td>{{row.name}}</td>
					<td>{{row.phone}}</td>
					<td>{{row.use_yn}}</td>
				</tr>
			</tbody>
			<tbody v-else>
				<tr>
					<td colspan="4">데이터가 없습니다.</td>
				</tr>
			</tbody>
		</table>
		<div class="d-flex gap-2 justify-content-end py-1">
			<button @click="insertRegister()" class="btn btn-primary"> 등록 </button>
			<button @click="goRegister()" class="btn btn-primary"> 목록 </button>
		</div>
	</div>
</div>