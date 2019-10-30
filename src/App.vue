<template>
  <div id="app">
    <div>
        <el-row >
            <el-col :span="5" class="leftMenu">
                <div class="grid-content bg-purple">
                  <!-- 如果当前是login页面，则不显示导航栏 -->

                   <div v-if="this.$router.history.current.path !== '/login' && this.$router.history.current.path !== '/'"><Menu/></div>
                </div>
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
    
  </div>
</template>
<script>
import Menu from './components/Menu'
// import Login from './components/Login'
export default {
    data(){
      return{

      }
    },
    mounted(){
      console.log(this.$router)
      console.log()
    },
    components:{
      Menu,
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
