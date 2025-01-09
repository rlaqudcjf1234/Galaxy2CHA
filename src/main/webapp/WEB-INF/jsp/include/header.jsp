<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="col-md-3 mb-2 mb-md-0">
	<a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
	</a>
</div>

<ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
	<li><a href="#" class="nav-link px-2 link-secondary">Home</a></li>
	<li><a href="#" class="nav-link px-2">Features</a></li>
	<li><a href="#" class="nav-link px-2">Pricing</a></li>
	<li><a href="#" class="nav-link px-2">FAQs</a></li>
	<li><a href="#" class="nav-link px-2">About</a></li>
</ul>
<c:choose>
	<c:when test="${false }">
		<div class="dropdown text-end">
			<a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
				<img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
			</a>
			<ul class="dropdown-menu text-small">
				<li><a class="dropdown-item" href="#">New project...</a></li>
				<li><a class="dropdown-item" href="#">Settings</a></li>
				<li><a class="dropdown-item" href="#">Profile</a></li>
				<li><hr class="dropdown-divider"></li>
				<li><a class="dropdown-item" href="#">Sign out</a></li>
			</ul>
		</div>
	</c:when>
	<c:otherwise>
		<div class="col-md-3 text-end">
			<button type="button" class="btn btn-outline-primary me-2">Login</button>
			<button type="button" class="btn btn-primary">Sign-up</button>
		</div>
	</c:otherwise>
</c:choose>