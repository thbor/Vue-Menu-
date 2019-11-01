
<template>
<!-- TODO  这里还需要一个404页面，-->
  <div id="app" v-if="ifExistPath">
    
        <el-row >
            <el-col :span="5" class="leftMenu">
              <!-- ifExistPath：如果有该路径的页面 -->
                <div class="grid-content bg-purple" >
                  <!-- 如果当前是login页面，则不显示导航栏 -->
                   <div v-if="this.$router.history.current.path !== '/login' && this.$router.history.current.path !== '/'"><Menu/></div>
                </div>
                <!-- 如果用户误输入其他路径，则跳转到404页面 -->
                
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-light">
                    <!-- 右边内容 -->
                    <router-view/>
                </div>
            </el-col>
        </el-row>
       <!-- <router-link to="/home">3</router-link><br>
      <router-link to="/menu">4</router-link> -->
    </div>
    <div v-else style="height:100%">
      <Error404/>
    </div>
  
</template>
<script>
import Menu from './components/Menu'
import Error404 from './components/Error404'
// import Login from './components/Login'
export default {
    data(){
      return{
        ifExistPath:false
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
      Menu,
      Error404
      // Login
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
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
