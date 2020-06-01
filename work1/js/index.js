window.onload = function () { 

  var list = document.getElementsByTagName('a'),
      images = document.getElementsByTagName('img'),
      section = document.getElementsByTagName('section')[0],
      size = list.length,
      index = 0,
      timer = null;
  
  /* 封装通用事件绑定方法
    ele 是绑定事件的 DOM 元素
    type 事件名
    func 事件处理程序
  */
  function eventFunc(ele, type, func) {
    if (ele.addEventListener) { // 非IE浏览器, 即支持 element.addEventListener
      ele.addEventListener(type, func, true);
    } else if (ele.attachEvent) { // IE 浏览器支持DOM2 级事件
      ele.attachEvent('on'+type, func);
    } else { // IE 浏览器不支持DOM2级
      ele['on'+type] = func;
    }
  }

  // 为每个a 元素添加点击事件
  for (var j = 0; j < size; j ++) {
    list[j].setAttribute("title-index", j);
    eventFunc(list[j], 'click', function() {
      // 获取当前a 元素索引
      index = this.getAttribute("title-index");
      changeTitle();
    }) 
  }

  // 设置a元素的类,实现a 元素的点击效果
  function changeTitle() {
    // 遍历所有a 元素，让其类只保留 .title
    for (var i = 0; i < size; i ++) {
      list[i].className = "title";
    }
    // 为当前a 元素添加 .active 类
    list[index].className = "title active";
    changeBanner();
  }

  // 图片随标题切换
  function changeBanner() {
    // 遍历所有图片将其隐藏
    for (var m = 0; m < size; m ++) {
      images[m].className = '';
    }
    // 显示与标题对应的图片
    images[index].className = "block";
  }

  // 自动切换图片与标题
  function startAutoPlay() {
    timer = setInterval(() => {
      index ++;
      if(index >= size) index = 0;
      changeTitle()
    }, 2000);
  }

  // 当鼠标悬浮在整个头部的时候停止自动轮播
  function stopAutoPlay() {
    if(timer) {
      clearInterval(timer);
    }
  }

  startAutoPlay();

  // 鼠标移入，轮播停止
  eventFunc(section, "mouseover", function () {
    this.style.cursor = "pointer";
    stopAutoPlay();
  })

  // 鼠标移出，轮播继续
  eventFunc(section, "mouseout", function() {
    startAutoPlay();
  })
 }