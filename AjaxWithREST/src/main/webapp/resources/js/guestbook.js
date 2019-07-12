/**
 * AJAX
 */

$(document).ready(function() {
		
	// paging 처리
	const recordPerPage = 10;	// 페이지 당 레코드
	const pagePerBlock = 10;	// 블럭 당 페이지
	
	let totalRecord = 0;		// 전체 레코드 수
	let totalPage = 0;			// 전체 페이지 수
	let nowPage = 1;			// 현재 페이지
	let nowBlock = 1;			// 현재 블럭
	
	let num = 0;				// 방명록 번호
	let start = 0;				// 페이징 시작
	let end = 0;				// 페이징 끝
	
	// guestbook list
	var guestbookList;	
	
	$.loadList = function() {
		$.ajax({
			url: '/listBook',
			type: 'GET',
			dataType: 'JSON',
			success: function(result) {
				totalRecord = result.length;
				guestbookList = result;
				$.list();
			},
			error: function() {
				alert('방명록 목록을 가져오는데 실패하였습니다.');
			}
		})
	};
	
	$.list = function() {
		$('.guestbookList-sec').empty();
		
		var str;
		if (!totalRecord) {
			str = "<div class='bg-white text-center p-3'>아직 방명록이 없습니다.</div>"
		} else {
			totalPage = Math.ceil(totalRecord / recordPerPage);
			num = totalRecord - ((nowPage - 1) * recordPerPage);
			start = nowPage - ((nowPage - 1) % pagePerBlock);
			end = start + (pagePerBlock - 1);
			
			str = '<div id="accordion">';
			for (var i=num; i > 0 && i > (num - recordPerPage); i--) {
				var gno = guestbookList[i-1].gno;
				var writer = guestbookList[i-1].writer;
				var ip = guestbookList[i-1].ip;
				var regdate = $.getTime(guestbookList[i-1].regdate);
				var content = guestbookList[i-1].content;
				str += `<div class="card my-2"><div class="card-header bg-secondary"><div class="row">`;
				str += `<div class="col-3">${i}번째 방명록</div>`;
				str += `<div class="col-3">${writer} (${ip})</div>`;
				str += `<div class="col-3">등록일 : ${regdate}</div>`;
				str += `<div class="col-3 text-right"><a class="collapsed card-link" data-toggle="collapse" href="#collapseUpdate${i}">수정하기</a>&nbsp;&nbsp;&nbsp;`;
				str += `<a class="collapsed card-link" data-toggle="collapse" href="#collapse${i}" onclick="javascript:$.loadReply(${gno})">댓글보기</a></div>`;
				str += `</div></div><div class="card-body">${content}</div>`;
				str += `<div id="collapseUpdate${i}" class="collapse" data-parent="#accordion">`;
				str += `<div id="replyUpdate${gno}" class="card-footer">`;
				str += `<div class="container"><form id="modifyFrm${gno}"><div class="row">`;
				str += `<div class="col-lg-10 col-md-10 col-sm-12 p-0">`;
				str += `<textarea class="form-control" rows="3" id="content" name="content" placeholder="수정 방명록..."></textarea></div>`
				str += `<div class="col-lg-2 col-md-2 col-sm-12 pr-0">`;
				str += `<input type="text" class="form-control ml-1 mb-1" name="writer" placeholder="닉네임" value="${writer}" readonly />`;
				str += `<button type="button" id="leaveBtn" class="btn btn-danger wrn-btn ml-1 mt-1" onclick="javascript:$.modifyBtn(${gno})">Modify</button>`;
				str += `</div></div></form></div></div></div>`;
				str += `<div id="collapse${i}" class="collapse" data-parent="#accordion">`;
				str += `<div id="replyBody${gno}" class="card-footer"></div></div></div>`;
			}
		}
		
		$('.guestbookList-sec').append(str);
		$.paging();
	}
	
	$.getTime = function(time) {
		var today = new Date();
		var gap = today.getTime() - time;
		var dateObj = new Date(time);
		var str = "";
		
		if (gap < (1000 * 60 * 60 * 24)) {
			var hh = dateObj.getHours();
			var mi = dateObj.getMinutes();
			var ss = dateObj.getSeconds();
			return [ (hh > 9 ? '' : '0') + hh, ':', (mi > 9 ? '' : '0') + mi, ':', (ss > 9 ? '' : '0') + ss ].join('');
		} else {
			var yy = dateObj.getFullYear();
			var mm = dateObj.getMonth() + 1;
			var dd = dateObj.getDate();
			return [ yy, '/', (mm > 9 ? '' : '0') + mm, '/', (dd > 9 ? '' : '0') + dd ].join('');
		}
	}
	
	// 댓글 불러오기
	$.loadReply = function(gno) {
		$.ajax({
			url: '/listReply/' + gno,
			type: 'GET',
			dataType: 'JSON',
			success: function(result) {
				$("#replyBody" + gno).empty();
				
				var str = '';
				if (!result.length) {
					str += "<div class='my-1'><span>아직 댓글이 없습니다.</span></div>"
				} else {
					for (var i=0; i<result.length; i++) {
						var rno = result[i].rno;
						var reply = result[i].reply;
						var replyer = result[i].replyer;
						var ip = result[i].ip;
						var regdate = $.getTime(result[i].regdate);
						str += `<div class='my-1'><div class="container"><div class="row reply">`;
						str += `<div class="col-3"><i class="far fa-hand-point-right"></i>&nbsp;${replyer} (${ip})</div>`;
						str += `<div class="col-6">${reply}</div>`;
						str += `<div class="col-2">${regdate}</div>`;
						str += `<div class="col-1 text-right"><a onclick="javascript:$.removeBtn(${rno}, ${gno})"><i class="fas fa-times"></i></a></div></div></div>`;
					}
				}
				str += `<div class="my-1"><div class="container"><form id="replyFrm${gno}"><div class="row"><div class="col-lg-10 col-md-10 col-sm-12 p-0">`;
				str += `<textarea class="form-control" rows="3" id="content" name="reply" placeholder="댓글..."></textarea></div>`;
				str += `<div class="col-lg-2 col-md-2 col-sm-12 pr-0">`;
				str += `<input type="text" class="form-control ml-1 mb-1" name="replyer" placeholder="닉네임" value="Guest" />`;
				str += `<button type="button" class="btn btn-danger wrn-btn ml-1 mt-1" onclick="javascript:$.replyBtn(${gno})">Reply</button></div></div>`;
				str += `<input type="hidden" name="ip" value="${userIP}"></form></div></div>`;
				

				$("#replyBody" + gno).append(str);
			},
			error: function() {
				alert('댓글 목록을 가져오는데 실패하였습니다.');
			}
		})
	}
	
	$.paging = function() {
		var  str = `<ul class="pagination justify-content-center my-1">`;
		if (start != 1) {
			str += `<li class="page-item"><a class="page-link" onclick="javascript:$.moveBlock(-1)">Previous</a></li>`;
		} 
		for (var i=start; i<=end && i<=totalPage; i++) {
			str += `<li class="page-item"><a class="page-link" onclick="javascript:$.movePage(${i})">${i}</a></li>`;
		}
		if (end < totalPage) {
			str += `<li class="page-item"><a class="page-link" onclick="javascript:$.moveBlock(1)">Next</a></li>`;
		}
		str += `</ul>`;
		$('.guestbookList-sec').append(str);
	}
	
	$.movePage = function(i) {
		nowPage = i;
		$.list();
	}
	
	$.moveBlock = function(i) {
		if (i == -1) {
			nowPage = start - 1;
		} else {
			nowPage = end + 1;
		}
		$.list();
	}
	
	$.loadList();
	
	
	// 방명록 남기기
	$('#leaveBtn').click(function() {
		var writer = $("#bookFrm input[name='writer']").val();
		var content = $("#bookFrm textarea[name='content']").val();
		var guestbook = {
				writer: writer,
				ip: userIP,
				content: content
		};
		
		$.ajax({
			url: '/addBook',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(guestbook),
			dataType: 'text',
			success: function(result) {
				$.loadList();
				$("#bookFrm")[0].reset();
			},
			error: function() {
				alert('방명록 입력에 실패하였습니다.');
			}
		})
	});
	
	// 방명록 수정
	$.modifyBtn = function(gno) {
		var content = $(`#modifyFrm${gno} textarea[name='content']`).val();
		var updatebook = {
				gno: gno,
				ip: userIP,
				content: content
		};
		
		$.ajax({
			url: '/modifyBook',
			type: 'PUT',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(updatebook),
			dataType: 'text',
			success: function() {
				$.loadList();
			},
			error: function() {
				alert('방명록 수정에 실패하였습니다.');
			}
		})
	}
	
	// 댓글 남기기
	$.replyBtn = function(gno) {
		var replyer = $("#replyFrm" + gno + " input[name='replyer']").val();
		var ip = $("#replyFrm" + gno + " input[name='ip']").val();
		var reply = $("#replyFrm" + gno + " textarea[name='reply']").val();
		var replyInfo = {
				gno: gno,
				replyer: replyer,
				ip: userIP,
				reply: reply
		};
		
		$.ajax({
			url: '/addReply',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(replyInfo),
			dataType: 'text',
			success: function(result) {
				$.loadReply(gno);
			},
			error: function() {
				alert('댓글 입력에 실패하였습니다.');
			}
		})
	}
	
	// 댓글 삭제
	$.removeBtn = function(rno, gno) {
		$.ajax({
			url: '/removeReply/' + rno,
			type: 'DELETE',
			success: function() {
				$.loadReply(gno);
			},
			error: function() {
				alert('댓글 삭제에 실패하였습니다.');
			}
		})
	} 
	
});

