window.onload=function(){
    /*初始化工具提示*/
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}

var data=null;
var getData=function(callback){
    if(data != null){
        return data;
    }
    $.ajax({
        type:'get',
        data:{},
        /*如果请求的是json类型的文件，那么ajax会自动将返回值转换为js对象*/
        url:"../js/imgData.json",
        success:function(result){
            console.log("aa");
            data=result;
            callback && callback(result);
        }
    });
}

var isMobile;
/*渲染*/
function render(){
    /*首先判断当前屏幕是移动端还是非移动端*/
    var width=$(window).width();
    /*定义变量来记录当前屏幕的类型*/
    isMobile=false;
    /*判断屏幕的类型*/
    if(width< 768){
        isMobile=true;
    }
    else{
        isMobile=false;
    }
    /*渲染*/
    getData(
        function(result){
            //artTemplate--获取可渲染的html--img
            var html=template("imgTemp",{"items":result,"isMobile":isMobile});
            /*渲染*/
            $(".carousel-inner").html(html);

            /*underscore--获取标记的可渲染代码.参数就是模板的html代码*/
            /*var tempStr=$("#indTemp").html();
            /!*通过这个方法可以返回一个模板对象*!/
            var temp=_.template(tempStr);
            /!*调用模板对象的方法就可以获取可渲染的html代码*!/
            var indHTML=temp({"items":result});
            $(".carousel-indicators").html(indHTML);*/

            var indHTML=template("indTemp",{"items":result});
            $(".carousel-indicators").html(indHTML);
        }
    );
}
/*调用一次*/
render();

/*屏幕改变大小*/
$(window).on("resize",function(){
    var width=$(window).width();
    if(isMobile ==true  && width >= 768){
        data=null;
    }
    else if(isMobile ==false && width < 768){
        data=null
    }
    render();
});


/*滑动操作*/
/*三个事件*/
/*获取图片块*/
var imgBox=$(".carousel-inner");
var startX=0;
var moveX=0;
var distanceX=0;
/*滑动开始*/
imgBox.on("touchstart",function(e){
    console.log(e);
    /*插件将事件源参数做了二次包装*/
    startX= e.originalEvent.touches[0].clientX;
});
/*滑动过程*/
imgBox.on("touchmove",function(e){
    moveX= e.originalEvent.touches[0].clientX;
    distanceX=moveX-startX;
});
/*滑动结束*/
imgBox.on("touchend",function(e){
    /*判断用户的滑动距离是否超过100*/
    if(Math.abs(distanceX) >=100){
        /*判断滑动的方向*/
        if(distanceX>0){
            /*上一张--调用这个轮播图插件的“上一张”按钮的处理方法*/
            $(".carousel").carousel('prev');
        }
        else{
           /*下一张--调用这个轮播图插件的“上一张”按钮的处理方法*/
            $(".carousel").carousel('next');
        }
    }
});