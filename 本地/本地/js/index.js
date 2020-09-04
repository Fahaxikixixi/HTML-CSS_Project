// $(function(){
// var taskAry = [];
// var taskBox =$('.content')
// $.ajax({
//     url:'http://118.24.155.202/posts/discover',

//     success:function(response){
//         console.log(response);
//         taskAry =response;
//         var html = template('taskTp1',{
//             tasks : taskAry
//         });
//         taskBox.html(html);
//     }
// });
// });


let page = 1
let pageSize = 5
getImg()
getInvitation();
getNew();




function getImg() {
    ajax({
        url: '/advert/discover',
    }, function(res) {
        var i = 1;
        var Imgs = res.result;
        console.log(Imgs.length)
            // var imgsArr = Imgs[0].filePath;
        var textlength = Imgs.length;
        var imgText = '';

        $('.top-header-img').html(`<img id="Topimg" src =${Imgs[0].filePath}>`)
        setInterval(toimg, 3000)

        function toimg() {
            i++;
            goimg();
        }

        function goimg() {
            if (i === textlength) {
                i = 0
            }
            $('.top-header-img').html(`<img id="Topimg" src =${Imgs[i].filePath}>`)
        }


        // Imgs.forEach(function(data, i) {
        //     var imgsArr = data.filePath;
        //     console.log(imgsArr)
        //     console.log(i)

        //     imgText += `<img src="${data.filePath[i]}">`
        //     $('.top-header-img').html(imgText)
        // })
    })
}








//获取新闻动态轮播信息
function getNew() {
    ajax({
        url: '/posts/discover/headlinesSlider'
    }, function(res) {
        // console.log(res)
        var result = res.result;
        let text = '';
        result.forEach(function(data) {

            // console.log(data.headImageUrl)

            text += ` <div class="swiper-slide ">
              <a class="advert-item">
              <img src="${data.headImageUrl}" alt="">
                <span>${data.summary}</span>
              </a></div>`
                // console.log(text);
            $(".news-left .advert-swiper").html(text);
        });
        console.log($('.swiper-slide').length);
        console.log($('.swiper-slide').eq(13));


        //实现轮播
        var time = setInterval(function() {
            t();
        }, 2000)

        function t() {
            var hei = $(".swiper-slide").height(); //找到li高
            var sunm = $(".swiper-slide").length;
            //当只有一条信息时不进行轮播
            if (sunm > 1) {
                $(".swiper-slide").animate({
                        "marginTop": "-" + hei
                    },
                    1000);
                $(".swiper-slide").eq(0).appendTo($(".advert-swiper"));
            }

            // function() {

            //     $(".advert-swiper").css({
            //         // "marginTop": 0,

            //     })
            //     $(".swiper-slide").eq(0).appendTo($(".advert-swiper")); //复制第一个到最后一个
            // })


        }

    });

}

//新闻轮播

// var time = setInterval(function () {
//     t();
// }, 5000)

// function t() {
// var he = $(".notice_active>ul>li").height();//找到li高
// $(".notice_active>ul>li").eq(0).appendTo($(".notice_active>ul")); //复制第一个到最后一个
// $(".notice_active>ul").animate({
// "marginTop": "-" + he
// }, 500, function () {
// $(".notice_active>ul").css({
//     "marginTop": 0
// })
// })
// }










function getInvitation() {
    ajax({
        url: '/posts/discover',
        data: {
            page,
            pageSize
        }
    }, function(res) {
        let {
            result
        } = res
        let invitationHTML = ''
            // console.log(res)
            // if (result.length === 0) {
            // 	scroll.finishPullUp()
            // 	showTip('没有更多了')
            // }

        result.forEach(item => {

                // 帖子图片结构
                let imgList = ''
                    // 点赞头像结构
                let goodList = ''

                // 帖子图片结构渲染
                for (let i = 0; i < item.albums.length; i++) {
                    // 视频
                    if (item.albums[i].type == "video") {
                        imgList +=
                            `
          <video poster="${item.albums[i].coverUrl}" src="${item.albums[i].url}" controls></video>
          `
                    }
                    // 图片
                    if (item.albums[i].type == "image") {
                        imgList +=
                            `
          <img src="${item.albums[i].url}" alt="" data-preview-src="" data-preview-group="${item.id}">
          `
                    }
                }
                // 点赞头像结构渲染
                for (let i = 0; i < item.supportUser.length; i++) {
                    // 控制最长不超过8个头像，超过的不显示
                    if (i > 7) break;
                    goodList +=
                        `
        <li>
          <a href="./user-home.html?userId=${item.user.id}">
            <img src="${item.supportUser[i].headImageUrl}" width="100%" alt="">
          </a>
        </li>`
                }

                // 帖子列表数据渲染,项帖子都保存发帖用户的id(user-id)和当前帖子id(post-id)
                invitationHTML +=
                    `<li post-id="${item.id}" uesr-id="${item.user.id}">
          <div class="cont-header">
          <div class="item">
          <div class="item-top">
              <div class="item-topleft">
              <img class="user_tx" src="${item.user.headImageUrl}" alt="">
              </div>
              <div class="item-topright">
                  <div class="item-topright-top">
                      <a>${item.user.nickname}</a>
                      <img src="img/ddd.png" alt="">
                  </div>
                  <div class="item-topright-botton">
                      <div class="item-brbotton-left">
                          <span>${item.user.age}岁</span>
                          <span class="spanimg"><img src="./img/${item.user.sex == '男' ? 'man.png' : 'woman.png'}" class="sex_icon"></span>
                      </div>
                      <div class="item-brbotton-right">
                          <span><img src="img/图层 14.png">${item.createDay}</span>
                          <span><img src="img/图层 15.png">${item.createHour} </span>
                          <span><img src="img/图层 16.png">${item.distance}</span>
                      </div>
                  </div>
              </div>
          </div>
          <p> ${item.content}</p>
          <div class="item-centerimg">
              <div class="item-centerimg-img" style="display:${item.albums.length > 0 ? 'flex' : 'none'}">
              <a href="">  
                ${imgList}
              </a>
              </div>
              <div class="item-centerimg-text">
                  <img src="img/定位.png">
                  <a style="display:${item.showAddress ? 'block' : 'none'}">${item.address}</a>
              </div>                   
          </div>
          <div class="item-last">
              <div class="item-last-first">
                  <div class="item-last-left">
                  <img src="./img/${item.isSupported ? 'good_active.png' : 'good.png'}"><span>${item.supportCount}</span>
                  </div>
                  <div class="item-last-next">
                  <img src="./img/眼睛.png">
    <span>${item.viewCount}</span>
                  </div>
              </div>
              <div class="item-last-in">
              <ul class="good-list">
            
              <li style="display:${item.supportUser.length == 0 ? 'none' : 'block'}">
                <a href="./good-list.html"></a>
              </li>
            </ul>
              </div>
              <div class="item-last-right">
                  <img src="img/分享.png" alt="">
                  <img src="img/图层 17.png" alt="">
              </div>
          </div>
</div>
          </div>
        </li>`
            })
            // // page===1时,说明是第一次进入页面或者下拉刷新页面，其它都是上拉加载更多
        if (page === 1) {
            $('.content').html(invitationHTML)
        } else {
            $('.content').append(invitationHTML)
        }
        // 图片缩放
        // imgZoom();
        // 通过下拉刷新、上拉加载更多时触发
        // $('.pull-down-wrap').hide(500)
        // $('.pull-up-wrap').hide(500)
        // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
        // scroll.refresh();
        // 当上拉或下拉刷新数据加载完毕后，需要调用以下方法告诉 better-scroll 数据已加载。
        // scroll.finishPullDown();
        // scroll.finishPullUp();
    })
}




















/* <div class="item">
                <div class="item-top">
                    <div class="item-topleft">
                    <img class="user_tx" src="${item.user.headImageUrl}" alt="">
                    </div>
                    <div class="item-topright">
                        <div class="item-topright-top">
                            <a>${item.user.nickname}</a>
                            <img src="img/ddd.png" alt="">
                        </div>
                        <div class="item-topright-botton">
                            <div class="item-brbotton-left">
                                <span>${item.user.age}岁</span>
                                <span class="spanimg"><img src="./img/${item.user.sex == '男' ? 'man.png' : 'woman.png'}" class="sex_icon"></span>
                            </div>
                            <div class="item-brbotton-right">
                                <span><img src="img/图层 14.png">${item.createDay}</span>
                                <span><img src="img/图层 15.png">${item.createHour} </span>
                                <span><img src="img/图层 16.png">${item.distance}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p> ${item.content}</p>
                <div class="item-centerimg">
                    <div class="item-centerimg-img" style="display:${item.albums.length > 0 ? 'flex' : 'none'}">
                    ${imgList}
                        {/* <a>
                            <img src="img/图层 10.png" alt="">
                        </a>
                        <a>
                            <img src="img/图层 11.png" alt="">
                        </a>
                        <a>
                            <img src="img/图层 12.png" alt="">
//                         </a>    */
//                     </div>
//                     <div class="item-centerimg-text">
//                         <img src="img/定位.png">
//                         <a style="display:${item.showAddress ? 'block' : 'none'}">${item.address}</a>
//                     </div>                   
//                 </div>
//                 <div class="item-last">
//                     <div class="item-last-first">
//                         <div class="item-last-left">
//                         <img src="./img/${item.isSupported ? 'good_active.png' : 'good.png'}"><span>${item.supportCount}</span>
//                         </div>
//                         <div class="item-last-next">
//                         <img src="./img/眼睛.png">
//           <span>${item.viewCount}</span>
//                         </div>
//                     </div>
//                     <div class="item-last-in">
//                         <div class="item-last-inimgone">
//                             <img src="img/图层 8.png" alt="">
//                             <img src="img/图层 9.png" alt="">
//                             <img src="img/图层 8 拷贝.png" alt="">
//                             <img src="img/图层 9 拷贝.png" alt="">
//                             <img src="img/图层 8 拷贝 2.png" alt="">
//                             <img src="img/图层 9 拷贝 2.png" alt="">
//                             <img src="img/图层 8 拷贝 3.png" alt="">
//                             <img src="img/椭圆 25 拷贝 3.png" alt=""> 
//                         </div>
//                     </div>
//                     <div class="item-last-right">
//                         <img src="img/分享.png" alt="">
//                         <img src="img/图层 17.png" alt="">
//                     </div>
//                 </div>
// </div> */}