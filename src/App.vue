
<template>
<!-- TODO  这里还需要一个404页面，-->
  <!-- <el-scrollbar wrap-class="list" wrap-style="color: red;" view-style="font-weight: bold;" view-class="view-box" :native="false">
   
    </el-scrollbar> -->
    

                    <router-view/>

  
</template>
<script>
// import Header from './components/Header'
// import Login from './components/Login'
export default {
    props:['sendMenu'],
    data(){
      return{
        ifExistPath:false,
        // showClickTagCss:false
      }
    },
    created(){
     
      // console.log(this.$router)  
      // console.log(this.$router.history.current.path)  
      let allPath = this.$router.options.routes;    //所有的path数组
      let currentPath = this.$router.history.current.path;  //用户输入的path
      //查看是否存在用户输入的path
      for(let i in allPath){
        // console.log(999,allPath[i].path.indexOf(currentPath))
        if(allPath[i].path.indexOf(currentPath)!==-1){
           this.ifExistPath = true;
        }
      }
      // console.log(this.ifExistPath)
    },
    components:{
      // Header
      // Login
    },
    methods:{
       
    }
    // watch:{
    //   $router(to,from){
    //     console.log(this.$router.path)
    //   }
    // }
}
</script>
<style>
html,body{
  margin: 0px;
  width: 100%;
  height: 100%;

}
.headerBorder{
  /* border: 1px solid red; */
  height: 30px;
  width: 100%;
}
.TagClass{
  float: left;
  width: 70%;
  height: 30px;
  /* border:1px solid green; */
}
.UserClass{
  float: right;
  width: 29%;
  height: 30px;
  /* border:1px solid blue; */
}
.leftMenu{
    width: 20%;
    height: 100%;
    position: fixed;
    /* outline: 1px solid; */
    background:  #334556;
    /* overflow-x:hidden; */
    /* overflow: scroll; */
}
.rightClass{
  /* border: 1px solid red; */
  padding: 10px;
  margin: 5px;
  /* position: fixed; */
  left: 21%
}
.grid-content .bg-purple-light{
  /* border: 1px solid green */
}

</style>
