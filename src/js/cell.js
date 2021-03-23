import '../css/cell.css';
import {get} from './api.js';
import $ from 'jquery';

if(localStorage.getItem('bash')){
    var result = JSON.parse(localStorage.getItem('bash'));
    console.log(result);
}else{
    var result = {};
}
console.log((result.src));
$('#pic img').attr({'src': result.src, 'width': 300, 'height': 300});
$('#info span:first').text(result.name);
$('#info span:eq(1)').text("肓发防脱，清爽控油，国妆特字，专利技术");
$('#info span:eq(1)').css({'color': 'red',"display":'block'});
$('#price p span').text(result.price).css({'color':'red', 'font-size':'20px','margin-left':'80px'});
$('#sale').append('<span style=color:red;>'+result.sale+'</span><span style=color:red;margin-left:50px>'+result.eva+'</span>');

$('#call').on('click', '.addBtn', function(){
    $(this).prev().text(parseInt($(this).prev().text()) + 1)  ;
})
$('#call').on('click', '.cutBtn', function(){
    if($(this).prev().prev().text() > 1){
        $(this).prev().prev().text(parseInt($(this).prev().prev().text()) - 1)  ;
    }
})
var arr = new Array;
$('#call').on('click', '.addCart', function(){
    $(this).parent().prev().prev().prev().text();
    console.log($(this).parent().prev().prev().prev().text());
    alert('已成功加入'+$(this).parent().prev().prev().prev().text()+'件商品');
    result.num = $(this).parent().prev().prev().prev().text();
    console.log(22222,result)
    var jsonArr = JSON.stringify(result);
    localStorage.setItem(result.name, jsonArr);
})