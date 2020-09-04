function classfor() {
    $(".calssfor").on('click', function() {
        $(".xsx").fadeToggle()
    })
}

listout()

// 选择分类
function listout() {
    $('html').on('click', '#q', function() {
        $('.calssitem').fadeToggle()
    })
    $('html').on('click', '#esc', function() {
        $('.calssitem').fadeToggle()
    })

}


//显示地址
$('.round-box').on('click', function() {

    if ($(this).attr("isopen") == 'true') {
        $(this).attr("isopen", "flase")
        $(this).removeClass('ist')
        $(this).addClass('ists')
    } else {
        $(this).attr("isopen", "true")
        $(this).removeClass('ists')
        $(this).addClass('ist')
    }
})

// $('.round-box').on('click', function() {

//     if ($(this).attr("isopen") == 'true') {
//         $(this).attr("isopen", "flase")
//         $(this).removeClass('ist')
//         $(this).addClass('ists')
//         return
//     }
//     if ($(this).attr("isopen") !== 'true') {
//         $(this).attr("isopen", "true")
//         $(this).removeClass('ists')
//         $(this).addClass('ist')
//         return
//     }
// })




// 标签添加
//键盘事件  回车
$('#tag-form').on('keydown', function(even) {

    if (even.keyCode == '13') {

        var text = $('.tag-input').val();
        var htmltext = '';
        htmltext += `<span >${text}<img class="spanlist" src="img/close.png"></span>`
        $('.addspan').append(htmltext)

        $('.tag-input').val('');
    }

})

//2
// $('#tag-form').on('submit', function(even) {
//     var text = $('.tag-input').val();
//     var htmltext = '';
//     htmltext += `<span>${text}<img src="img/close.png"></span>`
//     $('.addspan').append(htmltext)
//     return false;
// })



//标签删除
$('.addspan').on('click', '.spanlist', function() {
    $(this).parent().remove();
    return;
})