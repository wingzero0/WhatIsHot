// JavaScript Document

function openPopUpBox(content,width,height,backFunction)
{
	alert("haha");
	closePopUpBox();
	$('body').append('<div class="popUpCover" style="display:none"></div>')
	$('body').append('<div class="popUpBox" style="display:none">'+content+
	'<div class="divider"></div>'+
	'<input type="button" id="popUpBoxEnter" value="確定" class="big_button" onclick="$(\'#popUpBoxEnter\').hide();'+backFunction+'();">'+
	'<input type="button" id="popUpBoxCancel" value="取消"class="big_button"  onclick="closePopUpBox()">'+
	'</div>');	
	$('.popUpBox').css('width',width);
	$('.popUpBox').css('height',height);	
	$('.popUpBox').css('left',((parseInt($(window).width())-width)/2));
	$('.popUpBox').css('top',($(document).scrollTop()+100));
	$('.popUpBox').fadeIn('slow');
	$('.popUpCover').css('height',$(document).scrollTop()+$(window).height());	
	$('.popUpCover').css('width',$(window).width());	
	$('.popUpCover').fadeIn('slow');
	
}

function closePopUpBox()
{
	$('.popUpCover').fadeOut();
	$('.popUpBox').fadeOut('slow');
	$('.popUpBox').detach();	
	$('.popUpCover').detach();
	
}
