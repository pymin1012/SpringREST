<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Caffe 방명록</title>

<link rel="stylesheet" href="/resources/css/bootstrap.min.css">
<link rel="stylesheet" href="/resources/css/style.css" />

<script src="/resources/js/jquery-3.4.1.min.js"></script>
<script src="/resources/js/bootstrap.min.js"></script>
<script src="/resources/js/popper.min.js"></script>
<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
<c:set var="userIP" value="<%= request.getRemoteAddr() %>" />
<script>
	var userIP = '<c:out value="${userIP}" />';
</script>
</head>

<body>
	<div class="container">
		<div class="row pt-3 pb-3">
			<div class="title col-lg-12">
				<h4 class="text-center">카페에 오신 것을 환영합니다!</h4>
				<h6 class="text-center">방명록을 남겨주세요^^</h6>
			</div>
		</div>
		
		<section>
			<div id="carouselExampleFade" class="carousel slide carrousel-fade" data-ride="carousel">
				<!-- Indicators -->
				<ul class="carousel-indicators">
					<li data-target="#demo" data-slide-to="0" class="active"></li>
					<li data-target="#demo" data-slide-to="1"></li>
					<li data-target="#demo" data-slide-to="2"></li>
					<li data-target="#demo" data-slide-to="3"></li>
				</ul>
				
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img src="/resources/img/coffee-2799161_1920.jpg" class="d-block w-100" alt="0">
					</div>
					<div class="carousel-item">
						<img src="/resources/img/lubeck-4081316_1920.jpg" class="d-block w-100" alt="1">
					</div>
					<div class="carousel-item">
						<img src="/resources/img/cafe-984275_1920.jpg" class="d-block w-100" alt="2">
					</div>
					<div class="carousel-item">
						<img src="/resources/img/coffee-shop-1209863_1920.jpg" class="d-block w-100" alt="3">
					</div>
				</div>
				
				<a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span> 
					<span class="sr-only">Previous</span>
				</a> 
				<a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		</section>
		
		<section class="guestbookInput-sec my-4 p-2">
			<div class="container">
				<form id="bookFrm">
					<div class="row">
						<div class="col-lg-10 col-md-10 col-sm-12 p-0">
      						<textarea class="form-control" rows="3" id="content" name="content" placeholder="방명록..."></textarea>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-12 pr-0">
							<input type="text" class="form-control ml-1 mb-1" name="writer" placeholder="닉네임" value="Guest" />
							<button type="button" id="leaveBtn" class="btn btn-danger wrn-btn ml-1 mt-1">Leave</button>
						</div>
					</div>
				</form>
			</div>
		</section>
		<hr class="my-4 bg-light" style="height: 5px" />
		
		<section class="guestbookList-sec my-4 p-2">
			<!-- AJAX -->
		</section>
	</div>

	<script src="/resources/js/guestbook.js" type="text/javascript"></script>
</body>
</html>