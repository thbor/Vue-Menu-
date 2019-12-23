<template>
  <div>
    <div style="font-size:25px;text-align:center">迷宮</div>
    <div id="main" class="container"></div>
  </div>
</template>
<script>
export default {
  data(){
    return{
    top:1,
		left:2,
		bottom:4,
		right:8,
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.generateMap();
    },
		//currentX爲當前位置,toX爲移動的位置，如果按位與爲0，則遊戲結束,否則通過，併移動
		move(currentX,toX){
			if(currentX&toX!=0){
				//切換當前位置坐標
				currentX = toX;
			}else{
				return false
			}
		}	,
		//生成地圖 總有一步路可以走，如果周邊的格子不能走則回退到上一步
		generateMap(){
			let num =80;
			for(let i =0;i<num;i++){
        //生成一個dom
        this.generateDom();
			}
		},
		//生成dom 和上下左右的dom
		generateDom(){
			var newDiv = document.createElement("div");
			//隨機創建一個id，併將隨機m1到m4中的其中一個,r爲class的m1-4的其中一個
			let r = Math.floor((Math.random()*16+1))
			let id  = Math.random().toString(32).slice(2,10);
      newDiv.id = id;
      this.addClass(r,newDiv);
      console.log("newDiv",newDiv);
      var main = document.getElementById("main");
      main.appendChild(newDiv)
      // ifHasDom(id)
    },
    //判斷在該dom旁邊是否還有dom
    // ifHasDom(id){
    //   let currentDom = document.getElementById(id);

    // },
    //2-4
    getOver2Lower4(res,r){
      if(4>r>=2){
        let r1 = Math.floor(r2/2);
        let r2 = r2%2;
        res+=" m"+r1
        if(r2!=0){res+=" m"+r2;}
      }
      console.log("res",res)
    },
    //4-8
    getOver4Lower8(res,r){
      let r3 = 0;
      let r4 = 0;
      if(8<r<=4){
        r3 = Math.floor(r/4);
        r4 = r%4;
        res+=" m"+r3;
        if(r4!=0){res+=" m"+r4;}
      }
      this.getOver2Lower4(res,r4);
    },
    //大於8
    getOver8(res,r){
      let r5=0;
      let r6=0;
      if(r>=8){
        r5 = Math.floor(r/8);
        r6 = r%8;
        res+=" m"+r5;
        if(r6!=0){res+=" m"+r6;}
      }
      this.getOver4Lower8(res,r6);
    },
    getClass(res,r){
      this.getOver8(res,r);
    },
    //添加樣式
		addClass(r,newDiv){
      let res="";
      this.getClass(res,r);
      console.log("res!!!",res);
			if(!newDiv.classList.contains("mDiv")){
				newDiv.className+="mDiv";
			}
			// let mr = " m"+r;
			// if(!newDiv.classList.contains(mr)){
			// 	newDiv.className+=mr;
			// }
		}
  }
}
</script>
<style>
  .container{
    width: 513px;
    height: 500px;
    border: 1px solid;
    position: relative;
    left: 35%;
    margin-top:5% 
  }
  .mDiv{
		width:50px;
		height:50px;
		border:1px solid black;
    display: inline-block;
    margin: 0px;
    padding: 0px;
	}
  .left{
    left:50px;
    position: relative;
  }
  .right{
    right: 50px;
    position: relative;
  }
  .top{
    top: 50px;
    position: relative;
  }
  .bottom{
    bottom: 50px;
    position: relative;
  }
	.m1{
		border-top:none
	}
	.m2{
		border-right:none
	}
	.m3{
		border-bottom:none
	}
	.m4{
		border-left:none
	}
</style>