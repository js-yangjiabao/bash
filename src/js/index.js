import '../css/index.css';
import {get} from './api.js';
import $ from 'jquery';

get('data/productlist.json', function (data) {
    console.log(data) // json数据对象数组
    $(data).each(function (index, data) {
        console.log(data) // 遍历json数据中返回每个对象
        $('#nav').append('<div><a  class="shapo"><img src="' + data.img + '"/></a><p>￥' + data.price + '</p><p>' + data.name + '</p><span>总销量' + data.sale + '</span><span>评价' + data.eva + '</span></div>');
    })
});

$('#nav').on('click', '.shapo', function(){
    var obj = {
        src: $(this).children().attr('src'),
        price: $(this).next().text(),
        name: $(this).next().next().text(),
        sale: $(this).next().next().next().text(),
        eva: $(this).next().next().next().next().text(),
    }
    console.log(obj);
    // var result = [];
    // result.push(obj);
    localStorage.setItem('bash', JSON.stringify(obj));
    // 点击图片进入详情页
    $(this).attr('href', 'cell.html');
    // $(btn).parent().parent().parent().attr('display', 'none');  
})

