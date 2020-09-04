/* rem适配 */
(function () {
    let html = document.documentElement;
    let hw = html.getBoundingClientRect().width;
    // 30rem= 750px
    // 1rem=25px
    html.style.fontSize = hw / 30 + 'px';
  })()
  
  // 添加tap事件
  $(document).on("touchstart", function (evt) {
    var $target = $(evt.target);
    if (!$target.hasClass("disable")) $target.data("isMoved", 0);
  });
  
  $(document).on("touchmove", function (evt) {
    var $target = $(evt.target);
    if (!$target.hasClass("disable")) $target.data("isMoved", 1);
  });
  
  $(document).on("touchend", function (evt) {
    var $target = $(evt.target);
    if (!$target.hasClass("disable") && $target.data("isMoved") == 0) $target.trigger("tap");
  });
  
  // 恢复a链接跳转
  $(document).on('tap', 'a', function () {
    if ($(this).attr('href') && $(this).attr('href') != 'javascript:;') {
      $(location).attr('href', $(this).attr('href'))
    }
  })
  
  // 消息提示框,需传入提示信息
  function showTip(str) {
    $('.tip-msg').text(str)
    $('.tip-box').show(500)
    setTimeout(function () {
      $('.tip-box').hide()
      $('.tip-msg').text('')
    }, 3000)
  }
  
  // ajax
  let baseURL = 'http://118.24.155.202'
  function ajax(obj, callback) {
    $.ajax(
      {
        type: obj.method,
        url: baseURL + obj.url,
        data: obj.data,
        processData: obj.processData,
        contentType: obj.contentType,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('token')}`);
        },
        success: (data) => {
          callback(data);
        },
        error: function (err) {
          if (err.status === 401) {
            window.localStorage.removeItem('token')
            window.location.href = "login.html"
          }
          showTip(`${err.responseJSON.message}`)
        }
      })
  }
  