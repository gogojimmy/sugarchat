$(function(){
    // 复制链接
    $(".copy").on('click', function(){
        var clipboard = new Clipboard('.copy');
        clipboard.on('success', function(e) {
            $(".copy").html('專屬連結已複製').css('opacity', '0.5');
            $(".copy").addClass('copy-complete')
            setTimeout(function(){
                $(".copy").html('<img src="images/icon/copyIcon@2x.png" alt="">分享個人連結<span>讓更多人找你聊聊天、玩任務</span>').css('opacity', '1');
                $(".copy").removeClass('copy-complete')
            },500)
            e.clearSelection();
        });
        clipboard.on('error', function(e) {
            alert('请重试！');
        });
    });
    // video-list
    new Swiper('.video-list.swiper-container', {
        slidesPerView: 'auto'
    });
    // userinfo-banner
    new Swiper('.user-info .swiper-container', {
        pagination: '.user-info .popular-pagination',
        paginationClickable: true,
          onTouchMove: function(swiper){
            if($(".chat-info .animated").length > 0){
              $(".chat-info .swiper-item").eq(swiper.activeIndex).siblings().find('.animated').removeClass('slideInUp').hide()
            }
          },
        onSlideChangeEnd: function(swiper){
            if($(".chat-info .animated").length > 0){
              $(".chat-info .swiper-item").eq(swiper.activeIndex).find('.animated').fadeIn().addClass('slideInUp');
            }
        }
    });

      // banner-tab
      new Swiper('.banner-tab .swiper-container', {
        pagination: '.banner-tab .popular-pagination',
        width: 186,
        initialSlide: 1,
        slidesOffsetBefore: 100,
        spaceBetween: 15,
        centeredSlides: true,
        paginationClickable: true,
        onSlideChangeEnd: function(swiper){
          $(".upgrade-vip-desc .details").hide().eq(swiper.activeIndex).show()
        }
      });

    // task-swiper
    new Swiper('.task-swiper', {
        autoplay: 2000,
        loop : true
    });

    // 聊天列表显示删除按钮
    new Swiper('.chat-list .item.swiper-container', {
        slidesPerView: 'auto',
        initialSlide: 0,
        resistanceRatio: 0,
        slideToClickedSlide: true
    });

    // 删除聊天列表
    $(".chat-list .item .delete").on('click', function(){
        $(this).parent().parent().remove();
    })

    //删除photo
    $(".user-edit .delete").on('click', function(){
        $(this).siblings('img').remove();
        $(this).remove();
    })

    //radio -iCheck
    $('input:radio:visible').iCheck({
        radioClass: 'icheckbox_radio',
        increaseArea: '20%'
    });
    $('.clause input').on('ifClicked', function(event){
        if(event.type=="ifClicked"){
            $('.clause input').iCheck('uncheck');
        }
    });
    $('.evaluate-send .input .tips input').on('ifClicked', function(event){
        if(event.type=="ifClicked"){
            $('.evaluate-send .input .tips input').iCheck('uncheck');
        }
    });
    // select2
    $(".select2").select2({minimumResultsForSearch: -1});

    // 删除银行卡
    $(".card-list .list li .delete").on('click', function(){
        $(this).parent().remove();
    });

    // 现实添加银行卡from
    $(".get-money .bank-account .card-list .add-bank").on('click', function(){
        $(this).siblings('.tit,.input-group').show();
        $(this).hide();
    });

    // 关闭tips
    $(".gift-tips,.input-tips").on('click',function(){
        $(this).hide();
    });

    // 显示礼物栏目
    $(".gift-btn").on('click', function(){
        $(".gift-list").slideToggle(function(){
            setChatContent();
        });
        setTimeout(function(){
            $(".gift-explain").slideToggle();
        },10)

    });

    // 点击其他地方关闭礼物
    $(".chat-content .chat-desc").on('click', function(){
        if($(".gift-list").css('display') == 'none') return;
        $(".gift-list").slideUp(function(){
            setChatContent();
        });
        setTimeout(function(){
            $(".gift-explain").slideUp();
        },10)
        $(".gift-show").hide();
        $(".gift-btn").show();
        $(".send-btn").hide();
    })

    // 选择礼物
    $(".gift-list .gift").on('click', function(){
        var imgUrl = $(this).find('img').attr('src');
        var money = $(this).find('span').text();
        $(".gift-show").attr('data-money',money);
        $(".gift-show").show();
        $(".gift-show").find('img').attr('src',imgUrl)
        $(".gift-btn").hide();
        $(".send-btn").show();
    });

    // 关闭礼物预览
    $(".gift-show span").on('click', function(e){
        e.stopPropagation();
        $(".gift-show").hide();
        $(".gift-btn").show();
        $(".send-btn").hide();
    });

    // 发送礼物
    $(".gift-show img").on('click', function(){
        var money = $(this).parent().attr('data-money');
        var imgUrl = $(this).parent().find('img').attr('src');
        var text = 'Vincent Hsu';
        console.log(money)
        meSendGift({
            money : money,
            imgUrl: imgUrl,
            text: text
        });
        $(".gift-btn").show();
        $(".send-btn").hide();
        $(this).parent().hide();
        setChatContent();
    });

    // 接受礼物或拒绝
    $(".invitation .btn").on('click', function(){
        if($(this).hasClass('btn-yes')){
            sendTips({
                title: '接受聊天邀請',
                errText: '禮物點數已贈送給 ',
                user: 'Cherie Lin',
                date: '2018/03/06'
            });
        }else{
            sendTips({
                title: '拒絕聊天邀請',
                errText: '已退還禮物點數給 ',
                user: 'Cherie Lin',
                date: '2018/03/06'
            });
        }
        $(".invitation-open").removeClass('invitation-open');
        $(this).parent().hide();
        setChatContent();
    })

    // 判断消息框是否有内容
    $("#textarea").on('input', function(){
        if($.trim($(this).text())){
            $(".gift-btn").hide();
            $(".send-btn").show();
            $(this).addClass('hide-placeholder');
        }else{
            $(".gift-btn").show();
            $(".send-btn").hide();
            $(this).removeClass('hide-placeholder');
        }
        // 判断是否超出换行
        if($(this).height()>36){
            $(".left-icon").animate({'left': '-4rem'}, 100).hide();
            $(".tog-icon").show().animate({'left': '0px'}, 100)
            $(".input-bar .input").css({'width': '68%'})
        }
    });

    // 获得焦点失去焦点
    $("#textarea").on('focus blur',function(){
        $(".gift-show").hide();
        $(".gift-list").hide();
        setChatContent();
    })

    // 复位输入框
    $(".tog-icon").on('click', function(){
        $(".input-bar .input").css({'width': '58%'});
        $(".tog-icon").hide().animate({'left': '-4rem'}, 100,function(){
            $(".left-icon").show().animate({'left': '0px'}, 100);
        });
        // $("#textarea").focus();
    })

    // 发送消息
    $("#textarea").keyup(function(e){
        if(e.keyCode != 13 || detectmob()) return;
      // 判断是否是发送礼物
      if($(".gift-show").css('display') === 'block'){
        var money = $('.gift-show').attr('data-money');
        var imgUrl = $('.gift-show').parent().find('img').attr('src');
        var text = 'Vincent Hsu';
        meSendGift({
          money : money,
          imgUrl: imgUrl,
          text: text
        });
        $(".gift-btn").show();
        $(".send-btn").hide();
        $('.gift-show').hide();
        setChatContent();
        return;
      }

      var content = $.trim($("#textarea").html());
      if(!content) return;
      meSendMessage(content);
      $(".gift-btn").show();
      $(".send-btn").hide();
      $('#textarea').text('').removeClass('hide-placeholder');;
      setChatContent();
    })
    $(".input-bar .send-btn").on('click', function(e){
        // 判断是否是发送礼物
        if($(".gift-show").css('display') === 'block'){
            var money = $('.gift-show').attr('data-money');
            var imgUrl = $('.gift-show').parent().find('img').attr('src');
            var text = 'Vincent Hsu';
            meSendGift({
                money : money,
                imgUrl: imgUrl,
                text: text
            });
            $(".gift-btn").show();
            $(".send-btn").hide();
            $('.gift-show').hide();
            setChatContent();
            return;
        }

        var content = $.trim($("#textarea").html());
        if(!content) return;
        meSendMessage(content);
        $(".gift-btn").show();
        $(".send-btn").hide();
        $('#textarea').text('').removeClass('hide-placeholder');;
        setChatContent();
    });

    // input-bar disabled
    $(".input-bar.disabled #textarea").on('click', function(){
        $(this).blur();
    })


    // 信用卡
    $(".card-number input").on('focus', function(){
        var index = $(this).index();
        if(index>0 && $.trim($(".card-number input").eq(index-1).val())==''){
            $(".card-number input").eq(index-1).focus();
        }
    })
    $(".card-number input").on('keyup', function(){
        var index = $(this).index();
        $(this).val($(this).val().replace(/[^\d]/g,''));
        if($(this).val().length>=4){
            $(this).val($(this).val().slice(0,4))
        }
        if($(this).val().length>=4 && index<3){
            $(".card-number input").eq(index+1).focus();
        }
    });
    // 添加信用卡
    $(".add-card-btn").on('click', function(){
        $(".add-card").toggle();
    });
    // 删除信用卡
    $(".purchase .card-list li .delete").on('click', function(){
        $(this).parent().remove();
    });

    //查看视频
    // $(".chat-desc").delegate('.video-play', 'click', function(){
    //     console.log(1)
    //     var videoUrl = $(this).attr('data-video-uri');
    //     // var video = document.getElementById('video');
    //     // video.src = videoUrl;
    //     // $(".show-video-modal").fadeIn(function(){
    //     //     video.play();
    //     // });
    //     playVideo(videoUrl);
    // });

    // 关闭查看视频
    // $(".show-video-modal .close").on('click', function(){
    //     $(this).parent().fadeOut();
    // })

    //pop
    $(".tip-btn").on('click',function(){
        var div = $('<div></div>')
        div.css({opacity: 0,width: '100%',height: '100%', display: 'block', position: 'fixed',top:0,bottom:0,left:0,right: 0,margin: 'auto', 'z-index': 90})
        $(".pop").hide();
        $(this).siblings(".pop").toggle();
        $('body').append(div);
        div.click(function(){
            div.remove();
            $(".pop").hide();
        })
    });

    // 弹出回应窗口
    $(".mission-content .respond").animate({bottom: '.94rem'},500);

    // 删除上传任务文件
    $(".file-list .file").delegate('.delete', 'click', function(){
        $(this).siblings('img').remove();
        $(this).remove();
    });

    // 图片查看器 git https://github.com/appleple/SmartPhoto
    if($(".js-smartphoto,.photo-group").length>1){
        $(".js-smartphoto,.photo-group").SmartPhoto();
    }



    // error-pop
    var errPop = {};
    errPop.show = function(content, bgColor,txtColor){
        $(".error-pop").remove();
        var pop = $("<div class='error-pop'></div>");
        pop.html(content);
        pop.css({'background-color':bgColor,'color':  txtColor});
        $('body').append(pop);
        setTimeout(function(){
            $(".error-pop").fadeOut();
        },5000)
    }
    errPop.hide = function(){
        $(".error-pop").fadeOut();
    }
    window.errPop = errPop;

    // loading
    var loading = {}
    loading.show = function(content){
        var $content = content || '';
        if($("#loading").length>0) {
            $("#loading").fadeIn().find('p').text($content);
            return;
        }
        $('body').append('<div id="loading"><span><img src="./images/loading.svg" alt=""><p>'+$content+'</p></span></div>');
    }
    loading.hide = function(){
        $("#loading").fadeOut();
    }
    window.loading = loading;

    //首次儲值 賺現金+點數 modal
    $(".first-give-modal,.task-modal").modal('show');



    //视频播放
    $(".video-play").on('click', function(){
        var videoUri = $(this).attr('data-video-uri');
        // 播放单个
        // playVideo([{
        //     id: 154853,
        //     user: {
        //         img: 'images/tx.png',
        //         name: '李狗子',
        //         url: 'index.html'
        //     },
        //     videoPoster:  './images/video.jpg',
        //     videoUrl: {
        //         mp4: './images/video.mp4',
        //         ogg: './images/video.ogg',
        //         webm: './images/video.webm'
        //     }
        // }]);
        // 播放多个
        playVideo([
            {
                id: 15483,
                user: {
                    img: 'images/tx.png',
                    name: '李狗子',
                    url: 'index.html'
                },
                videoPoster:  './images/video.jpg',
                videoUrl: {
                    mp4: './images/video.mp4',
                    ogg: './images/video.ogg',
                    webm: './images/video.webm'
                }
            },
            {
                id: 15485,
                user: {
                    img: 'images/tx.png',
                    name: 'keith',
                    url: 'index.html'
                },
                videoPoster:  './images/vide(1).jpg',
                videoUrl: {
                    mp4: './images/video(1).mp4',
                    ogg: './images/video(1).ogg',
                    webm: './images/video (1).webm'
                }
            },
            {
                id: 155485,
                user: {
                    img: 'images/tx.png',
                    name: '王八蛋',
                    url: 'index.html'
                },
                videoPoster:  './images/video(2).jpg',
                videoUrl: {
                    mp4: './images/video(2).mp4',
                    ogg: './images/video(2).ogg',
                    webm: './images/video(2).webm'
                }
            },

        ],1);

    });
    // var timer = 0;
    // var t = setInterval(function(){
    //     timer++;
    //     var p = Math.ceil(timer*10/100);
    //     loading.show('上传中'+p+'%');
    //     if(p>=100){
    //         clearInterval(t);
    //         loading.hide();
    //     }
    // },1)

    // chat-menu
    $(".chat-menu-btn").on('click', function(){
        $(".chat-menu-content").css('display','flex').removeClass('slideOutRight').addClass('slideInRight');
        $(this).hide();
    })
    $(".chat-menu-content").on('click','.close', function(){
        $(".chat-menu-content").removeClass('slideInRight').addClass('slideOutRight');
        $(".chat-menu-btn").fadeIn(1000);
    })

    // 设置聊天窗口当前的scrollTop
    // setChatContent("#msg-1020");
    setChatContent();

    //signup 验证码
    var time = 59;
    var timer = setInterval(function(){
        $(".v-btn").text('0:'+time+' 秒後重新寄驗證碼')
        time--
        if(time<0){
            clearInterval(timer);
            $(".v-btn").get(0).disabled = false
            $(".v-btn").text('重新寄驗證碼')
        }
    }, 1000);
    // select sex
   $(".signup form .sex input").on('change', function(){
    $(".next-btn").get(0).disabled = false
   })
   // 手机号输入下一步
   $("#signup-phone").on('input', function(){
       var val = $(this).val()
      if(val.length>10){
        $(".next-btn").removeAttr('disabled')
      }else{
        $(".next-btn").attr('disabled','disabled')
      }
   })

  // navbar
  $("nav .navbar-menu-btn").on('click', function(){
      $("nav .slider").toggle();
  })
  $(document).click(function(event){
      if(!$(event.target).closest('nav').length){
        $("nav .slider").hide();
      }
  })

  // 上线
  // enLinea()

  // 推荐
  // seRecomienda();

    // 升级会员
    const checked = 1
    $(".radio-select").on('change', 'input', function(){
        var selectEd = $(this).val()
        if(checked != selectEd){
            $(".member-upgrade .tips").show()
            $('.btn-box a').text('變更訂閱')
        }else{
            $(".member-upgrade .tips").hide()
            $('.btn-box a').text('取消訂閱')
        }
    })

  // faq
  $(".faq-list li").on('click','.flex', function(){
    $(this).parent().toggleClass('active')
    if($(this).parent().hasClass('active')){
      $(this).siblings('.info').slideDown()
    }else{
      $(this).siblings('.info').slideUp()
    }
    $(this).parent().siblings('li').removeClass('active');
    $(this).parent().siblings('li').children('.info').slideUp()
  })

    //20180704 参与者页面开始
    // tips1 show
    $(".see-activity .action-btn a").click(function(){
        $('.see-activity .top-tips').show().removeClass('slideOutUp').addClass('slideInDown')
        setTimeout(function(){
            $('.see-activity .top-tips').removeClass('slideInDown').addClass('slideOutUp')
        }, 2000)
    })

    // show tips
    $(".tab-content button.complete").click(function(){
        $('.see-activity .top-complete-tips').show().removeClass('slideOutUp').addClass('slideInDown')
        setTimeout(function(){
            $('.see-activity .top-complete-tips').removeClass('slideInDown').addClass('slideOutUp')
        }, 2000)
    })

    // delete
    $("#complete").on('click', 'button.delete', function(){
        $(this).parent().parent().remove()
    })

    $("#wait").on('click', '.complete', function(){
        $(".party-management-refusal-tips").animate({top: 0+'px'},300)
        setTimeout(function(){
            $(".party-management-refusal-tips").animate({top: '-1.1rem'},300)
        }, 2000)
    })

    // delete
    var that
    $("#complete").on('click', 'button.delete', function(){
        that = $(this)
        $("#removeModal").modal('show')
    })
    $("#removeModal .remove").click(function(){
        $("#removeModal").modal('hide')
        if(that){
            that.parent().parent().remove()
        }
    })

    // show action
    $(".see-activity .brn-group-box .menu,.see-activity .head .menu").click(function(){
        $(".share-modal").show()
        $(".share-modal .share-modal-content").animate({bottom: '0px'}, 300)
    })
    $(".share-modal-content button").click(function(){
        $(".share-modal .share-modal-content").animate({bottom: '-4rem'}, 300, function(){
            $(".share-modal").hide()
        })
    })

    // 计算剩余字数
    $(".ad-title").on('keyup keypress', function(){
        var val = $(this).val()
        if(val.length >= 30){
            $(this).val(val.substr(0,29))
        }
        $(this).siblings('em').text(val.length + '/30')
    })

    // tips1 show
    $("#submit").click(function(event){
        $('.create-activity .top-tips').show().removeClass('slideOutUp').addClass('slideInDown')
        setTimeout(function(){
            $('.create-activity .top-tips').removeClass('slideInDown').addClass('slideOutUp')
        }, 2000)
        return false
    })
    // gift-radio-box change
    $(".gift-radio-box").on('click', 'input', function(){
        var index = $(this).data('index')
        $(".tips-box p").hide()
        $(".tips-box p").eq(index).show()
    })
    // show gift
    $(".form-group label .select-gift").click(function(){
        $(".gift-modal").show()
        $(".gift-modal-content").animate({bottom: '0px'},300)
    })
    // hide gift
    $(".gift-modal-content .head span").click(function(){
        $(".gift-modal-content").animate({bottom: '-8rem'},300, function(){
            $(".gift-modal").hide()
        })
        // 选中的礼物
        var gift = {}
        if($(this).data('type') == 'ok'){
            var label = $(".gift").find('input:checked').siblings('label')
            gift.img = label.find('img').attr('src')
            gift.money = label.find('span').text()
            console.log(gift)
        }
    })

    //20180704 参与者页面结束

    // 聚會教學swiper
    teachingSwiper()

})

// 计算chat-content的高度和重置滚动条
function setChatContent(selector){
    if($("#chat").length===0){return;}
    setTimeout(function(){
        var clintHeight = window.innerHeight;
        var productBoxHeight = $("#chat ul").height()
        $(".chat-desc").css({'padding-bottom': '.8rem'});
        var scrollTop = productBoxHeight - clintHeight + 80;
        if(selector && $(selector).length>0){
            scrollTop = $(selector).offset().top-15;
        }
        $("#chat").scrollTop(scrollTop);
    },100)
}

//me send message
function meSendMessage(content){
    var me = $('<li class="me">' +
        '<div class="message">'+ content +'</div>' +
        '</li>');
    $(".chat-desc ul").append(me);
}

//he send message
function heSendMessage(content){
    var he = $('<li class="he">' +
        '<img src="images/chat-tx.png" class="img-circle" alt="">' +
        '<div class="message">'+ content +'</div>' +
        '</li>');
    $(".chat-desc ul").append(he);
}

//he sendGift
function heSendGift(giftContent){
    var gift = $('<li class="gift he">' +
        '<img src="images/chat-tx.png" class="img-circle" alt="">' +
        '<div class="gift-content">' +
        '<img src="' +giftContent.imgUrl+ '" alt="">' +
        '</div>' +
        '<div class="info">' +
        giftContent.text +
        '<div>贈送 <span>' + giftContent.money + '</span></div>' +
        '</div>' +
        '</li>');
    $(".chat-desc ul").append(gift);
}

//me sendGift
function meSendGift(giftContent){
    var gift = $('<li class="gift me">' +
        '<div class="gift-content">' +
        '<img src="' +giftContent.imgUrl+ '" alt="">' +
        '</div>' +
        '<div class="info">' +
        giftContent.text +
        '<div>贈送 <span>' + giftContent.money + '</span></div>' +
        '</div>' +
        '</li>');
    $(".chat-desc ul").append(gift);
}

// sendTips
function sendTips(res){
    var tip = $('<li class="invitation-tips">' +
        '<div class="info">' +
        '<h3>'+ res.user+ res.title+'</h3>' +
        '<p>'+res.errTxt+ res.user+'</p>' +
        '</div>' +
        '<span class="date">'+ res.date+ '</span>' +
        '</li>');
    $(".chat-desc ul").append(tip);
}


/**
 * play video
 * @param videoArray [{}]
 * @param playWhich int 不设置播放第几个默认第一个 从1开始
 */
function playVideo(videoArray,playWhich) {
    $(".video-modal").remove();
    window.HELP_IMPROVE_VIDEOJS = false;
    var playWhich = playWhich ? playWhich : 0;
    if(videoArray.length < 1) {return;}
    var width = $('body').width();
    var height = $('body').height();
    if(width>500){
        width = 480;
    }
    function closeVideoModal(){

    }
    function videoModal(){
        return $('<div class="video-modal animated"><span class="close"></span></div>');
    }
    function setUserInfo(user){
        return  $('<div class="user-info clearfix">\n' +
            '\t\t\t\t\t\t<div class="img"><img src="'+ user.img +'" class="img-circle" alt="">' +
              '<img src="images/icon/vip-gold.png" class="vip" alt="">' +
              '<img src="images/icon/vip-green.png" class="vip" alt="">' +
              '<img src="images/icon/vip-blue.png" class="vip" alt="">' +
            '</div>\n' +
            '\t\t\t\t\t\t<span class="username">'+user.name+'</span>\n' +
            '\t\t\t\t\t\t<a class="chat-btn" href="'+ user.url +'"></a>\n' +
            '\t\t\t\t\t</div>');
    }
    function setVideo(id,videoUrl,videoPoster){
        return $('<video class="video-js" style="width:'+width+'px;height:'+height+'px;" playsinline webkit-playsinline poster="'+videoPoster+'" id="'+id+'" loop> +' +
            '<source src="'+videoUrl.mp4+'" type=\'video/mp4\' /></video>'+
            '<source src="'+videoUrl.ogg+'" type=\'video/ogg\' /></video>'+
            '<source src="'+videoUrl.webm+'" type=\'video/webm\' /></video>');
    }
    if(videoArray.length===1){
        // loading.show();
        var $userInfo = videoArray[0].user ? setUserInfo(videoArray[0].user) : '';
        var videoId = 'video-' + Math.ceil(Math.random()*parseInt(videoArray[0].id)*1000);
        var $videoModal = videoModal().append($userInfo, setVideo(videoId, videoArray[0].videoUrl, videoArray[0].videoPoster));
        // loaing close
        $("body").append($videoModal);
        $videoModal.addClass('zoomInDown').fadeIn(500);
        videojs(videoId).play();
        var timer;
        $videoModal.on('click', function(){
            $('.video-modal .close').fadeIn(300);
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(function(){
                $('.video-modal .close').fadeOut(300);
                timer = null;
            },5000);
        });
    }
    else{
        function swiperBox(){
            return $('<div class="swiper-container video-swiper">\n' +
                '\t\t\t<div class="swiper-wrapper">\n' +
                '\t\t\t</div>\n' +
                '\t\t</div>');
        }
        function swiperSlider(){
            return $('<div class="swiper-slide"></div>');
        }
        var $videoModal = videoModal().prepend(swiperBox());
        var videoListIDs = []; // 所有视频元素ID
        for(var b=0; b<videoArray.length; b++){
            var $slider = swiperSlider();
            if(videoArray[b].user){
                var $userInfo =  setUserInfo(videoArray[b].user);
                $slider.append($userInfo);
            }
            var videoID = 'video-' + Math.ceil(Math.random()*parseInt(videoArray[b].id)*1000);
            videoListIDs.push(videoID);
            var $video = setVideo(videoID, videoArray[b].videoUrl, videoArray[b].videoPoster);
            $slider.append($video);
            $videoModal.find('.swiper-wrapper').append($slider);
        }
        $("body").append($videoModal);
        $videoModal.addClass('zoomInDown').fadeIn(500);
        var videoObjList = []; // 实例化所有视频类
        for(var o =0; o<videoListIDs.length; o++){
            videoObjList.push(videojs(videoListIDs[o]));
        }
        // 播放
        var prevVideoJsObj = null;
        function videoPlay(index){
            videoObjList[index].play();
            if(prevVideoJsObj) {
                prevVideoJsObj.pause();
            }
            prevVideoJsObj = videoObjList[index];
        }

        var previousIndex = null;
        var videoSwiper = new Swiper('.video-swiper',{
            // direction: 'vertical',
            spaceBetween: 0,
            // effect : 'cube',
            // cube: {
            //     slideShadows: false,
            //     shadow: false,
            //     shadowOffset: 100,
            //     shadowScale: 0.6
            // },
            slidesPerView: 1,
            paginationClickable: true,
            mousewheelControl: true,
            onTransitionEnd: function (swiper) {
                if(previousIndex === swiper.activeIndex) return;
                videoPlay(swiper.activeIndex);
                previousIndex = swiper.activeIndex;
            },
            onClick: function(){
                var timer;
                $('.video-modal .close').fadeIn(300);
                if(timer){
                    clearTimeout(timer);
                }
                timer = setTimeout(function(){
                    $('.video-modal .close').fadeOut(300);
                    timer = null;
                },5000);
            },
            onInit: function(swiper){
                previousIndex = swiper.activeIndex;
                // 开始播放
                if(playWhich>0){
                    swiper.slideTo(parseInt(playWhich-1),1,false);
                    videoPlay(playWhich-1);
                }else{
                    videoPlay(0);
                }
            }
        });
    }

    // 关闭
    $videoModal.find('.close').on('click', function(){
        $videoModal.addClass('zoomOut').fadeOut(500);
    })

}
// 检测是否移动端
function detectmob() {
  if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  ){
    return true;
  }
  else {
    return false;
  }
}

// 上线
function enLinea(userInfo){
  // $(".en-linea").remove()
    var dom = $('<div class="en-linea animated slideInLeft">\n' +
      '\t\t\t<div class="img">\n' +
      '\t\t\t\t<img class="img-circle" src="images/mod1.png" alt="">\n' +
      '\t\t\t\t<img class="vip" src="images/icon/vip-gold.png" alt="">\n' +
      '\t\t\t</div>\n' +
      '\t\t\t<div class="info">\n' +
      '\t\t\t\t<p>Vincent Hsu</p>\n' +
      '\t\t\t\t<p>上線了</p>\n' +
      '\t\t\t</div>\n' +
      '\t\t</div>');
    $('body').append(dom)
    setTimeout(function(){
      dom.removeClass('slideInLeft').addClass('slideOutLeft')
    }, 5000)
}

function seRecomienda(userInfo){
    // $(".se-recomienda").remove()
    var dom = $('<a href="" class="se-recomienda animated slideInRight">\n' +
      '\t\t\t<p>本日推薦</p>\n' +
      '\t\t\t<img class="img-circle" src="images/mod1.png" alt="">\n' +
      '\t\t\t<p>Bonnie Yu</p>\n' +
      '\t\t\t<span>查看</span>\n' +
      '\t\t</a>');
      $('body').append(dom)
      setTimeout(function(){
        dom.removeClass('slideInRight').addClass('slideOutRight')
      }, 5000)
}

//个人页面侧边菜单
function memberDragMenu(){
    // open
    $(".user-info.self .banner .menu").click(function(){
        $(".user-info.self .banner .menu .c,.user-info.self .banner .menu .tips").hide()
        $(".member-drag-box").show()
        $(".member-drag-box .content").animate({right: '0px'},300)
    })
    // close
    $(".member-drag-box .content .head span,.member-drag-box .mask").click(function(){
        $(".member-drag-box .content").animate({right: '-6.5rem'},300, function(){
            $(".member-drag-box").hide()
        })
    })


}
memberDragMenu()

// 评价星星
function star(){
    var xing = $('.xing')
    for(var i =0; i<xing.length; i++){
        var num = xing.eq(i).data('index') || 0
        var red = "<img src=\"images/icon/Rectangle-red@2x.png\">"
        var ban = "<img src=\"images/icon/Rectangle-ban@2x.png\">"
        var no = "<img src=\"images/icon/Rectangle-no@2x.png\">"
        var temp = ''
        switch(num){
            case 0:
                temp = no+no+no+no+no
            break;
            case 0.5:
                temp = ban+no+no+no+no
            break;
            case 1:
                temp = red+no+no+no+no
            break;
            case 1.5:
                temp = red+ban+no+no+no
            break;
            case 2:
                temp = red+red+no+no+no
                break;
            case 2.5:
                temp = red+red+ban+no+no
                break;
            case 3:
                temp = red+red+red+no+no
                break;
            case 3.5:
                temp = red+red+red+ban+no
                break;
            case 4:
                temp = red+red+red+red+no
                break;
            case 4.5:
                temp = red+red+red+red+ban
                break;
            case 5:
                temp = red+red+red+red+red
                break;
            default:
                temp = no+no+no+no+no

        }
        xing.eq(i).html(temp)
    }

}
star()

// 评价设置星星
function setStar(){
    $(".xing-box .xing").on('click', 'img', function(){
        var index = $(this).index()
        var oldIndex = $(".xing-box .xing").data('index')
        index += 1
        console.log(index)
        if($(this).index() == 0 && oldIndex == 1){
            index = 0
        }
        if(index == 3){
            $(".xing-box h3").text('尚可')
        }
        if(index > 3){
            $(".xing-box h3").text('滿意')
        }
        if(index > 4){
            $(".xing-box h3").text('非常滿意')
        }
        if(index > 0 && index < 3){
            $(".xing-box h3").text('不满意')
        }
        if(index == 0){
            $(".xing-box h3").text('整體滿意度')
        }
        if(index<=3){
            $(".evaluate-send .checkbox-box").eq(1).hide()
            $(".evaluate-send .checkbox-box").eq(0).show()
        }
        if(index>3){
            $(".evaluate-send .checkbox-box").eq(1).show()
            $(".evaluate-send .checkbox-box").eq(0).hide()
        }
        if(index==0){
            $(".evaluate-send .checkbox-box").hide()
        }

        $(".xing-box .xing").data('index', index)
        star()
    })
}
setStar()

// 聚會教學swiper
var swipercontainerbox1 = null
var swipercontainerbox2 = null
function teachingSwiper(){
    if(swipercontainerbox1) swipercontainerbox1.destroy(false);
    if(swipercontainerbox2) swipercontainerbox2.destroy(false);
    $(".teaching-box .tab-content .change .tag").removeClass('a0 a1 a2')
    $(".teaching-box .tab-content .change .tag").addClass('a0')
    // userinfo-banner
    setTimeout(function(){
        swipercontainerbox1 = new Swiper('.swiper-container-box1', {
            pagination: '.swiper-container-box1 .popular-pagination',
            paginationClickable: true,
            onTouchMove: function(swiper){
                $(".teaching-box .tab-content .change .tag").removeClass('a0 a1 a2')
                $(".teaching-box .tab-content .change .tag").addClass('a'+swiper.activeIndex)
            },
            onSlideChangeEnd: function(swiper){
                $(".teaching-box .tab-content .change .tag").removeClass('a0 a1 a2')
                $(".teaching-box .tab-content .change .tag").addClass('a'+swiper.activeIndex)
            }
        });
        swipercontainerbox2 = new Swiper('.swiper-container-box2', {
            pagination: '.swiper-container-box2 .popular-pagination',
            paginationClickable: true,
            onTouchMove: function(swiper){
                $(".teaching-box .tab-content .change .tag").removeClass('a0 a1 a2')
                $(".teaching-box .tab-content .change .tag").addClass('a'+swiper.activeIndex)
            },
            onSlideChangeEnd: function(swiper){
                $(".teaching-box .tab-content .change .tag").removeClass('a0 a1 a2')
                $(".teaching-box .tab-content .change .tag").addClass('a'+swiper.activeIndex)
            }
        });
    },500)


}

//touc滑动删除按钮
function toucDelete(){
    var posX
    $(".message").on('touchmove touchstart touchend' , '.top', function(event){
        event.stopPropagation()
        let clientX = event.originalEvent.changedTouches[0].clientX
        let btnWIDTH = $(this).siblings('.bg').find('button').outerWidth()
        let left = posX-clientX
        switch (event.type) {
            case 'touchstart':
                posX = clientX
                break;
            case 'touchmove':
                if(parseInt($(this).css('left'))<= -(btnWIDTH)){
                    return
                }
                if(left<0) left = 0
                if(left>=btnWIDTH) left = btnWIDTH
                $(this).css({left: -left +'px'})
                break;
            case 'touchend':
                console.log(left)
                if(left > btnWIDTH/1.5){
                    $(this).animate({left: -btnWIDTH+'px'},300)
                    $(this).parent().siblings().find('.top').animate({left: '0px'},300)
                }else{
                    $(this).animate({left: '0px'},300)
                }
                break;

        }
    })
}
toucDelete()

// 聚会问卷
function PartyQuestionnaireModal(){
    setTimeout(function(){
        new Swiper('.PartyQuestionnaire-modal .swiper-container', {
            onlyExternal : true,
            pagination: '.PartyQuestionnaire-modal .swiper-pagination',
            nextButton: '.PartyQuestionnaire-modal .swiper-button-next',
            prevButton: '.PartyQuestionnaire-modal .swiper-button-prev',
        });
    }, 500)
    $(".swiper-slide").on('change', '#outer1,#outer', function(event){
        if(event.target.id == 'outer'){
            if(event.target.checked){
                $("#outer-content").show()
            }else{
                $("#outer-content").hide()
            }
        }else{
            if(event.target.checked){
                $("#outer1-content").show()
            }else{
                $("#outer1-content").hide()
            }
        }
    })

}
PartyQuestionnaireModal()

// 关闭ad banner
function closeAdBanner(){
    $(".create-activity").on('click', '.ad span', function(){
        $(this).parent().remove();
    })
}
closeAdBanner();

// op_loading
function op_loading(){
    $("#op_loading").scroll(function(event){
        var block2offsetTop = $(".op-loading-box .block2").offset().top
        var block3offsetTop = $(".op-loading-box .block3").offset().top
        var block4offsetTop = $(".op-loading-box .block4").offset().top
        var block5offsetTop = $(".op-loading-box .block5").offset().top
        if(block2offsetTop <= 150){
            $(".op-loading-box .block2 .chat-block .animated").show().addClass('bounceInLeft')
        }

        if(block3offsetTop <= 150){
            $(".op-loading-box .block3 .chat-block .animated").show().addClass('bounceInRight')
        }

        if(block4offsetTop <= 200){
            $(".op-loading-box .block4 .c1").show().addClass('bounceInLeft').css('display', 'block')
            $(".op-loading-box .block4 .c2").show().addClass('bounceInRight').css('display', 'block')
            $(".op-loading-box .block4 .chat-block .c3").show().addClass('bounceInRight')
            $(".op-loading-box .block4 .chat-block .c4").show().addClass('bounceInLeft')
        }
        if(block5offsetTop <= 380){
            $(".op-loading-box .block5 .chat-block .c1").show().addClass('bounceInRight')
            $(".op-loading-box .block5 .chat-block .c2").show().addClass('bounceInLeft')
            $(".op-loading-box .block5 .chat-block .c3").show().addClass('bounceInRight')
        }

    })
    $(".head-fixed").on('click', '.btn', function(){
        var offsetTop = $(".op-loading-box .block6").offset().top
        $("#op_loading").animate({scrollTop: offsetTop + 'px'}, 500)
    })
}
op_loading()

