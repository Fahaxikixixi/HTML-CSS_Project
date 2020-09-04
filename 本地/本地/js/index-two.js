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
getInvitation();

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
		if (result.length === 0) {
			scroll.finishPullUp()
			showTip('没有更多了')
		}
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
                  <div class="item-last-inimgone">
                      <img src="img/图层 8.png" alt="">
                      <img src="img/图层 9.png" alt="">
                      <img src="img/图层 8 拷贝.png" alt="">
                      <img src="img/图层 9 拷贝.png" alt="">
                      <img src="img/图层 8 拷贝 2.png" alt="">
                      <img src="img/图层 9 拷贝 2.png" alt="">
                      <img src="img/图层 8 拷贝 3.png" alt="">
                      <img src="img/椭圆 25 拷贝 3.png" alt=""> 
                  </div>
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
		// imgZoom()
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