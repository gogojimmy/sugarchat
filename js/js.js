$(function(){
    // 复制链接
    $(".copy").on('click', function(){
        var clipboard = new Clipboard('.copy');
        clipboard.on('success', function(e) {
            $(".copy").html('專屬連結已複製').css('opacity', '0.5');
            $(".copy").addClass('copy-complete')
            setTimeout(function(){
                $(".copy").html('<img src="images/btn-icon2.png" alt="">分享專屬連結 點我複製連結').css('opacity', '1');
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
        paginationClickable: true
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
        height: 74,
        width: 375,
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
            $(".left-icon").animate({'left': '-200px'}, 100).hide();
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
        $(".tog-icon").hide().animate({'left': '-200px'}, 100,function(){
            $(".left-icon").show().animate({'left': '0px'}, 100);
        });
        // $("#textarea").focus();
    })

    // 发送消息
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
    $(".tip-btn").on('click', function(){
        $(".pop").hide();
        $(this).siblings(".pop").toggle();
    });


    // 关闭tips
    $(document).on('click', function(e){
        if($(e.target).closest('.tip-btn').length==1) return;
        if($(e.target).closest('.pop').length==0){
            $(".pop").hide();
        }
    });

    // 弹出回应窗口
    $(".mission-content .respond").animate({bottom: '47px'},500);

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
    var timer = 0;
    var t = setInterval(function(){
        timer++;
        var p = Math.ceil(timer*10/100);
        loading.show('上传中'+p+'%');
        if(p>=100){
            clearInterval(t);
            loading.hide();
        }
    },1)

    // 设置聊天窗口当前的scrollTop
    setChatContent("#msg-1020");
})


// 计算chat-content的高度和重置滚动条
function setChatContent(selector){
    if($("#chat").length===0){return;}
    var productHeight = $(".product-box").outerHeight();
    $(".chat-desc").css({'padding-bottom': $(".input-bar").outerHeight()});
    var scrollTop = productHeight - $("body").outerHeight()+300;
    if(selector && $(selector).length>0){
        scrollTop = $(selector).offset().top-15;
    }
    $("body").scrollTop(scrollTop);
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
            '\t\t\t\t\t\t<img src="'+ user.img +'" class="img-circle" alt="">\n' +
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


