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
    <el-menu>
        <el-submenu :index="menus.title">
            <template slot="title"><i :class="menus.icon"></i>{{menus.title}}</template>
            <!-- 有子菜单二级节点 -->
            <template v-for="menu in menus.child" slot="title">
                <el-submenu :index="menu.title" v-if="menu.child && menu.child.length" :key="menu.title">
                    <template slot="title"><i :class="menu.icon"></i>{{menu.title}}</template>
                    <!--三级菜单-->
                        <el-menu-item v-for="menu2 in menu.child" :key="menu2.title"  @click="goPage(menu2)">
                        <i :class="menu2.icon"></i>{{menu2.title}}
                        </el-menu-item>
                    <!--三级菜单 end-->
                </el-submenu>
                 <!--无子节点的2级菜单-->
                <template v-else>
                    <el-menu-item @click="goPage(menu)" :index="menu.title" :key="menu.title">
                        <i :class="menu.icon"></i>
                        <span>{{menu.title}}</span>
                    </el-menu-item>
                </template>
            </template>
            <template>
            </template>
        </el-submenu>
    </el-menu>
</template>
<script>

import {getMenuJson} from "../api/api"
export default {
    data(){
        return{
            menus:[],
        }
    },
    computed: {
 
    },
    methods:{
        goPage(menu){
            if(menu.href!=""){
                this.$router.push(menu.href)
            }
        }
    },
    mounted(){
        getMenuJson().then(res=>{
                console.log(res.data);
                const resData = res.data;
                  //menuArr为data的子节点的集合
                for(var i=0;i<resData.length;i++){
                    if(resData[i].id == "0"){
                        var topMenu = resData[i];
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
                //topMenu为根节点
                 console.log(111,topMenu)
                 this.menus = topMenu;
                // return topMenu;
        }).catch(error=>{
            window.console.log(error)
        });

    }
}
</script>
<style>
    el-menu{
    background: blue
    }
   

</style>