<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<script type="text/javascript">
	function goAdd(){
		$("#searchVO").action("add");
	}
</script>
<div class="container">
	<div>
		<form:form action="list" modelAttribute="searchVO" method="get">
			<form:hidden path="pageIndex" />
		</form:form>
		<div class="d-flex gap-2 justify-content-start py-1">
			<button class="btn btn-primary">등록</button>
		</div>
		<table class="table table-sm table-bordered">
			<thead>
				<tr>
					<th scope="col">이메일</th>
					<th scope="col">성명</th>
					<th scope="col">연락처</th>
					<th scope="col">사용여부</th>
				</tr>
			</thead>
			<c:choose>
				<c:when test="${list ne null and list.size() > 0 }">
					<c:forEach var="row" items="${list }">
						<tr>
							<td>${row.seq}</td>
							<td>${row.course}</td>
							<td>${row.fullName}</td>
							<td>${row.birthDate}</td>
						</tr>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<tr>
						<td colspan="4">데이터가 없습니다.</td>
					</tr>
				</c:otherwise>
			</c:choose>
		</table>
		<c:if test="${list ne null and list.size() > 0 }">
			<div class="d-flex gap-2 justify-content-center py-1">
				<ul class="pagination">
					<ui:pagination paginationInfo="${page}" type="image" jsFunction="goPage" />
				</ul>
			</div>
		</c:if>
	</div>
</div>