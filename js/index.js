class Swiper{
    constructor(options){
        this.options = options;
        this.wrapper = document.querySelector(".swiper-wrapper");
        this.clientW = document.documentElement.clientWidth;  //视口宽度
        this.slider = wrapper.querySelectorAll(".swiper-slider");
        this.startX = 0;  // 记录起始X坐标点
        this.distance = 0;  //记录移动的距离
        this.index = 1; //指定显示图片的下标值  设置为1
        this.isMove = true;  //true允许移动  false不允许移动
        this.isStart = false;  //是否执行了按下事件  false未按下  true已按下
        this.dotsIndex = index - 1;
        this.timer = null;
        this.init();
    }
    init(){
        // 将第一张图片放置在下边
        this.wrapper.appendChild(this.slider[0].cloneNode(Infinity));
        // 将最后一张图片放置在最前面
        this.wrapper.insertBefore(this.slider[this.slider.length-1].cloneNode(Infinity),this.slider[0]);
        
        // 动态增加小圆点
        const swiper = document.querySelector("."+this.options-container);
        this.swiper.innerHTML+=`
            <div class="dots">
                ${[...this.slider].map(v =>(
                    `<span></span>`
                )).join("")}
            </div>
        `
        this.wrapper = document.querySelector(".swiper-wrapper");
        this.wrapper.style.width = (this.slider.length+2)*100+"%";
        this.slider = this.wrapper.querySelectorAll(".swiper-slider");
        

        // 设置小圆点
        const dots = document.querySelectorAll(".dots span");
        this.dots[this.dotsIndex].className = "active";
        this.wrapper.style.transform = "translateX("+(-this.index*this.clientW)+"px)"

        this.autoPlay();  //自动轮播

        this.wrapper.addEventListener("touchstart",function(e){
            if(!this.isMove) return;
            this.isStart  =true;
            this.timer = clearInterval(this.timer);  //清除定时器
            this.startX = e.touches[0].clientX;  //触摸屏幕的X坐标
        })
        this.wrapper.addEventListener("touchmove",function(e){
            if(!this.isMove || !this.isStart) return;
            const endX = e.touches[0].clientX;  //移动位置的X坐标
            this.distance = endX - this.startX;  //移动距离
            console.log(distance);
            this.wrapper.style.transform = "translateX("+(-this.index*this.clientW+this.distance)+"px)";
        })
       
        this.wrapper.addEventListener("touchend",function(e){
            if(!this.isMove || !this.isStart) return;


             // 手动左右切换
            // if(distance>0){
            //     index--;  //向右移动
            // }else{
            //     index++;  //向左移动
            // }
            // this.style.transform = "translate("+(-index*clientW+distance)+"px)";


            // 移动的距离需要大于50才可以切换图片
            if(Math.abs(this.distance)>50)
            this.distance>0?this.index--:this.index++;
            this.move();
        })
    }
    move(){
        this.isMove = false;
        setTimeout(() => {
            this.isMove = true;
            this.isStart = false;
            this.wrapper.style.transition = 'none';

             // 实现无缝隙切换。
            // 1- 初始的下标index 设置为1
            // 2- 当动画结束后，判断index是否合法。
            if(this.index===0){
                this.index = this.slider.length-2;
                this.wrapper.style.transform = "translate("+(-this.index*this.clientW)+"px)";
            }else if(this.index===this.slider.length-1){
                this.index=1;
                this.wrapper.style.transform = "translate("+(-this.index*this.clientW)+"px)";
            }

            // 增加小圆点
            // 将当前选中的小圆点移除样式
            this.dots[this.dotsIndex].className = null;
            // 设置新的圆点下标
            this.dotsIndex = index - 1;
            // 为新选中的圆点增加样式
            this.dots[this.dotsIndex].className = "active";
            if(!this.timer)
            this.autoPlay();
        }, 200);
        this.wrapper.style.transition = "transform .2s";
        this.wrapper.style.transform = "translate("+(-this.index*this.clientW)+"px)"
       }

       //自动轮播
        autoPlay(){
            this.timer = setInterval(() =>{
                // console.log(this.timer,this.index);
                this.index++;
                this.move();
            },3000)
       }
    }
