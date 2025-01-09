<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<!DOCTYPE html>
<html class="h-100">
<head>
<tiles:insertAttribute name="head"/>
</head>
<body class="d-flex flex-column h-100">
	<tiles:insertAttribute name="mode"/>
	<header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3 mb-4 border-bottom">
		<tiles:insertAttribute name="header"/>
	</header>
	<main class="flex-shrink-0">
		<tiles:insertAttribute name="main"/>
	</main>
	<footer class="footer mt-auto py-3 my-4">
		<tiles:insertAttribute name="footer"/>
	</footer>
</body>
</html>