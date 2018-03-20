$(function(){
    // 复制链接
    $(".copy").on('click', function(){
        var clipboard = new Clipboard('.copy');
        clipboard.on('success', function(e) {
            $(".copy").html('<img src="images/btn-icon2.png" alt="">已複製到粘贴板').css('opacity', '0.5');
            console.info(e.text);
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

    // 聊天列表显示删除按钮
    new Swiper('.chart-list .item.swiper-container', {
        slidesPerView: 'auto',
        initialSlide: 0,
        height: 74,
        width: 375,
        resistanceRatio: 0,
        slideToClickedSlide: true
    });

    // 删除聊天列表
    $(".chart-list .item .delete").on('click', function(){
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
        $(".gift-tips").hide();
        $(".gift-explain").hide();
        $(".gift-list").slideToggle(function(){
            $(".gift-explain").show();
            setChartContent();
        });
    });

    // 点击其他地方关闭礼物
    $(".chart-content .chart-desc").on('click', function(){
        if($(".gift-list").css('display') == 'none') return;
        $(".gift-explain").hide();
        $(".gift-show").hide();
        $(".gift-list").slideUp(function(){
            setChartContent();
        });
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
        setChartContent();
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
        setChartContent();
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
        setChartContent();
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
            setChartContent();
            return;
        }

        var content = $.trim($("#textarea").html());
        if(!content) return;
        meSendMessage(content);
        $(".gift-btn").show();
        $(".send-btn").hide();
        $('#textarea').text('').removeClass('hide-placeholder');;
        setChartContent();
    });

    // input-bar disabled
    $(".input-bar.disabled #textarea").on('click', function(){
        $(this).blur();
    })

    setChartContent();

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
        $(this).parent().remove()
    });

    //查看视频
    $(".chart-desc").delegate('.video-play', 'click', function(){
        var videoUrl = $(this).attr('data-video');
        var video = document.getElementById('video');
        video.src = videoUrl;
        $(".show-video-modal").fadeIn(function(){
            video.play();
        });
    });

    // 关闭查看视频
    $(".show-video-modal .close").on('click', function(){
        $(this).parent().fadeOut();
    })

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
    loading.show = function(){
        $("#loading").remove();
        $('body').append('<div id="loading"></div>');
    }
    loading.hide = function(){
        $("#loading").remove();
    }
    window.loading = loading;

    //首次儲值 賺現金+點數 modal
    $(".first-give-modal").modal('show');

})


// 计算chart-content的高度和重置滚动条
function setChartContent(){
    var productHeight = $(".product-box").outerHeight();
    $(".chart-desc").css({'padding-bottom': $(".input-bar").outerHeight()});
    $("body").scrollTop(productHeight - $("body").outerHeight()+300);
}

//me send message
function meSendMessage(content){
    var me = $('<li class="me">' +
        '<div class="message">'+ content +'</div>' +
        '</li>');
    $(".chart-desc ul").append(me);
}

//he send message
function heSendMessage(content){
    var he = $('<li class="he">' +
        '<img src="images/chart-tx.png" class="img-circle" alt="">' +
        '<div class="message">'+ content +'</div>' +
        '</li>');
    $(".chart-desc ul").append(he);
}

//he sendGift
function heSendGift(giftContent){
    var gift = $('<li class="gift he">' +
        '<img src="images/chart-tx.png" class="img-circle" alt="">' +
        '<div class="gift-content">' +
        '<img src="' +giftContent.imgUrl+ '" alt="">' +
        '</div>' +
        '<div class="info">' +
        giftContent.text +
        '<div>贈送 <span>' + giftContent.money + '</span></div>' +
        '</div>' +
        '</li>');
    $(".chart-desc ul").append(gift);
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
    $(".chart-desc ul").append(gift);
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
    $(".chart-desc ul").append(tip);
}