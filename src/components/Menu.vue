<template>
    <!-- <el-menu>
        <el-submenu index='1'>
            1级菜单
            <template slot="title">导航1</template>
             2级菜单无子节点
            <el-menu-item-group>
                <el-menu-item>1212</el-menu-item>
            </el-menu-item-group>
             2级菜单 end
            2级菜单有子节点
            <el-submenu index="1-1">
                <template slot="title">分组1</template>
                 3级菜单
                <el-menu-item index="111">选项2</el-menu-item>
                 3级菜单
            </el-submenu>
             2级菜单有子节点
        </el-submenu>
        1级菜单 end
    </el-menu> -->
    <el-menu :default-active="hrf">
         <!--一级有子节点-->
        <template v-for="menu1 in menus">
            <el-submenu  :index="menu1.title" :key="menu1.id" v-if="menu1.child && menu1.child.length">
            <div slot="title" ><i :class="menu1.icon"></i>{{menu1.name}}</div>
            <!-- 有子菜单二级节点 -->
            <div  v-for="menu in menu1.child" :key="menu.id">
                <el-submenu  :index="menu.title" v-if="menu.child && menu.child.length" >
                    <div slot="title"><i :class="menu.icon"></i>{{menu.title}}</div>
                    <!--三级菜单 默认无子节点所以这里直接写了el-menu-item-->
                        <el-menu-item v-for="menu2 in menu.child" :key="menu2.id" :index="menu2.title"  @click="goPage(menu2)">
                        <i :class="menu2.icon"></i>{{menu2.name}}
                        </el-menu-item>
                    <!--三级菜单 end-->
                </el-submenu>
                 <!--无子节点的2级菜单-->
                <div  v-else>
                    <el-menu-item @click="goPage(menu)" :index="menu.title" :key="menu.id">
                        <i :class="menu.icon"></i>
                        <span>{{menu.name}}</span>
                    </el-menu-item>
                </div>
            </div>
          
        </el-submenu>
         <!--一级有子节点 end-->
        <!--无子节点的一级菜单-->
        <div v-else :key="menu1.id">
            <el-menu-item :index="menu1.title"  @click="goPage(menu1)">
                 <i :class="menu1.icon"></i>
                {{menu1.name}}
            </el-menu-item>
        </div>
         <!--无子节点的一级菜单 end-->
        </template>
    </el-menu>
</template>
<script>
import {getMenuJson} from "../api/api"
export default {
    props:[],
    data(){
        return{
            menus:[],
            hrf:"",
            sendMenu:[],
        }
    },
    computed: {
 
    },
    methods:{
        goPage(menu){
            //生成tag标签
            console.log(menu)              //json数据
            console.log(JSON.stringify(menu))         //字符串
            this.sendMenu.push(menu)
            console.log(555555555555,this.sendMenu)
            sessionStorage.setItem('menuTag', JSON.stringify(this.sendMenu))     
            //跳转地址
            if(menu.href!=""){
                this.hrf = menu.href
                this.$router.push(menu.href)
            }

        }
    },
    mounted(){
    //   console.log(1,this.$router.history.current.path)  
      this.hrf = this.$router.history.current.path
        getMenuJson().then(res=>{
                // console.log(res.data);
                const resData = res.data;
                 var topMenu=[];
                  //menuArr为data的子节点的集合
                for(var i=0;i<resData.length;i++){
                    if(resData[i].parentId == "null"){
                        topMenu.push(resData[i]);
                        // console.log(topMenu)
                    }
                    var menuArr = [];
                   
                    resData[i].child=[];
                    for(var j=i+1;j<resData.length;j++){
                        if(resData[i].id == resData[j].parentId){
                            //将子节点放入menuArr
                            menuArr.push(resData[j])
                        }
                    }
                    resData[i].child = menuArr;
                   
                }
                //topMenu为一级菜单
                //  console.log(111,topMenu)
                 this.menus = topMenu;
                // return topMenu;
        }).catch(error=>{
            window.console.log(error)
        });
    }
}
</script>
<style>
/* .el-menu-item.is-active {
   background-color: rgb(31, 61, 97) !important;
} */
</style>