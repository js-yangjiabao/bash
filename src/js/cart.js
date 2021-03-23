import '../css/cart.css';
import {get} from './api.js';
import $ from 'jquery';

$(function () {
    showCart();

})
// 从本地获取信息，并动态创建标签，显示信息
function showCart() {
    get('data/productlist.json', function (data) {
        console.log(data) // json数据对象数组
        var arrName = [];
        $(data).each(function (index, element) {
            arrName.push(element.name) // 遍历json数据中返回每个对象
        })
        console.log(1111, $(arrName));
        for (var i in arrName) {
            // console.log(index,element) // 0 arrName[0]
            if (localStorage.getItem(arrName[i])) {
                var arr = JSON.parse(localStorage.getItem(arrName[i]));
                console.log('arr', i, arr, arr.price, arr.num)
                // console.log(arr.src);
                var t = parseInt(arr.num) * parseInt(arr.price.slice(1, 4));
                $('table').append('<tr><td><input type="checkbox"/></td><td><img src=' + arr.src + '><span class="infoName">' + arr.name + '</span><img src="images/xcard.png" class="infoimg"><img src="images/7d-refund.png" class="infoimg"><img src="images/safeguard.png" class="infoimg"></td><td>' + arr.price + '</td><td><span class="cut">-</span><span class="cashNum">' + arr.num + '</span><span class="add">+</span></td><td>￥<span class="cashPrice">' + t + '</span></td><td><p class="move">移入收藏夹</p><p class="delete">删除</p></td></tr>');
                $('.infoName').css({ 'margin-left': 20, 'display': 'inline-block', 'transform': 'translateY(-150px)' });
                // console.log('arr2',i ,arr,arr.price,arr.num,arr.name)
            }
        }
        $('#tab').append('<div id="bottom"><span id="deleteChecked">删除选中</span><div><span>数量</span><span id="number">0</span></div><div><span>总价</span><span id="total">0</span></div><button>结算</button></div>');
    });
}

// 全选按钮点击事件
$('tbody').on('click', ':checkbox:eq(0)', function () {
    var isChecked = $(this).prop('checked');
    $('tbody :checkbox:gt(0)').prop('checked', isChecked);
    show()
})

// 复选框按钮改变事件
$('tbody').on('change', ':checkbox:gt(0)', function () {
    // 从第二个复选框开始，如果有一个是未选中，则全选未选中
    var unchecked = $(':checkbox:gt(0)').not(':checked'); // 没选中的集合
    // console.log(unchecked);
    if (unchecked.length > 0) {
        $(':checkbox:eq(0)').prop('checked', false);  // 有一个没选中，length长度就不为0，则全选为false
    } else {
        $(':checkbox:eq(0)').prop('checked', true);
    }
})
var num = 0;
var price = 0;
// 复选框点击事件，点击复选框就要执行 show()
$('tbody').on('click', ':checkbox:gt(0)', function () {
    show();
})
// 加事件
$('tbody').on('click', '.add', function () {
    var t = $(this).prev().text(parseInt($(this).prev().text()) + 1);
    var n = $(t).text();
    var p = parseInt($(this).parent().prev().text().slice(1, 4));
    // console.log(t,p,n)
    $(this).parent().next().children().text(p * n);
    show();
})

// 减事件
$('tbody').on('click', '.cut', function () {
    if (parseInt($(this).next().text()) < 1) {
        $(this).prop('disable', true);
    } else {
        var t = $(this).next().text(parseInt($(this).next().text()) - 1);
    }
    var n = $(t).text();
    var p = parseInt($(this).parent().prev().text().slice(1, 4));
    // console.log(t,p,n)
    $(this).parent().next().children().text(p * n);
    // var tr = $(this).parents('tr');
    show();
})

// 删除事件
$('tbody').on('click', '.delete', function () {
    $(this).parents('tr').remove();
    show();
})

// 删除选中
$('#tab').on('click', '#deleteChecked', function () {
    $('table :checkbox:gt(0):checked').parents('tr').remove();
    show();
})

// 复选框遍历，勾选的,进行数量、总价的更新
function show() {
    var checkbox = $(':checkbox:gt(0)');
    var t = 0;
    var s = 0;
    checkbox.each(function (index, element) {
        // console.log(index, element, $(element), $(element).prop('checked'));
        if ($(element).prop('checked')) {
            t = parseInt($(element).parents('tr').find('.cashNum').text()) + t;
            s = parseInt($(element).parents('tr').find('.cashPrice').text())+ s;
            console.log(t);
        }
    })
    $('#bottom #number').text(t);
    $('#bottom #total').text(s);
}

// 结算
$('#tab').on('click', 'button', function(){
    $(this).prev().find('#total').text();
    alert('一共花了￥' + $(this).prev().find('#total').text());
    $('table :checkbox:gt(0):checked').parents('tr').remove();
    show();
})