
// JQuery + ajax 方法
$(function(){
    $.ajax({
        url:'http://118.24.155.202/posts/discover',
        // type:'get',
        // data:{page,
        //     pageSize}
        success:function(res){
           console.log(res)
            // console.log(res)
            if(res.code === 200){

                var text = '';
                var info = res.result;
                console.log(info)
                // text += "<li>${info.addres}</li>"
                $.each(info,function(i,obj){
                    console.log(i)
                    console.log(obj)
                    console.log(obj.address)
                    text += '<li>'+ obj.address +'<p>'+ obj.distance +'</p></li>';
                });
                $('#list').html(text);
                console.log(text)
            }
        },
    })
});


//js方法
// getData();
// function getData(){
//    $.ajax({
//        url:'http://118.24.155.202/posts/discover',
//        success:function(i,n){
//         console.log(i)
//         console.log(n)
//         // if(n === 'success'){
//             var text = '';
//             var arrt = i.result;
//             console.log(arrt)
//             arrt.forEach(ar => {
//                 //1. text += '<li>'+ ar.address +'</li>';
//                 text += `<li>${ar.address}</li>`;//2.
//                 $('#list').html(text);
//             });

//         // } 
//        }
//    });
    
// };





//黑马sp中方法，（出错了！）
// $(function(){
//     var taskA = [];
// $.ajax({
//     url:'http://118.24.155.202/posts/discover',
//     type:'get',
//     // data:{page,
//     //     pageSize}
//     success:function(res){
//         taskA = res;
//         console.log(taskA)
//         var html = template('tasktp',{
//             tasks : taskA
//         })
//         $('.list').html(html);
//     }
// });
// });
