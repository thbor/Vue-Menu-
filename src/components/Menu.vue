<template>

    <div>
                    <nav>
             <!-- 一级菜单 -->
                        <ul >
                            <li class="menuLi1">
                                 <i :class="[menus.icon]"></i>
                                {{menus.title}}
                                <i v-if="hasChild" class="el-icon-caret-bottom"></i>
                                <!-- 二级菜单 -->
                                <ul>
                                    <li v-for="menu in showMenus.child" :key="menu.title" class="menuLi2">
                                         <span @click="goPage(menu)">
                                             <i class="el-icon-user-solid"></i>
                                            {{menu.title}}
                                             <i v-if="hasChild" class="el-icon-caret-bottom"></i>
                                         </span>
                                            <!-- 三级菜单 -->
                                        <ul class="collapse">
                                            <li v-for="menu2 in menu.child" @click="goPage(menu2)" :key="menu2.title" class="menuLi3">
                                                <i class="el-icon-s-platform"></i>
                                                {{menu2.title}}
                                                <i v-if="hasChild" class="el-icon-caret-bottom"></i>
                                            </li>
                                            
                                        </ul>
                                            <!-- 三级菜单 end-->
                                    </li>
                                </ul>
                                <!-- 二级菜单 end-->
                            </li>
                        </ul>
             <!-- 一级菜单 end-->
                    </nav>
                </div>
</template>
<script>
// import axios from 'axios'
// import {getdata1} from "../api/api"
// import { get } from 'http';
import {getMenuJson} from "../api/api"
export default {
    data(){
        return{
            menus:[],
            menu: [],
            open:false,
            name:"",
            currentMenuId: "",
            hasChild:false
        }
    },
    computed: {
        showMenus: function() {
            // console.log(333,this.menu)
            //在拷贝时将数据能够拷出来
            let menus = JSON.parse(JSON.stringify(this.menus));
            // console.log(444,menus)
            this.setMenus(menus);
            return menus;
        }
    },
    methods:{
      
        setMenus: function(menus) {
            for(let key of Object.keys(menus)) {
                //如果有menus里面有child属性且menus.id为当前点击的menuId,那么将删除当前节点的子节点
                if(key === "child"){
                    if(menus.id === this.currentMenuId) {
                        this.menu = menus.child;
                        menus.child = [];
                        return;
                    }
                }
               
                if(menus.child) {
                   //递归找到所有子节点 BUG:该数组最后一次遍历完成之后需要遍历下一个数组，而这里遍历了3次相同的数组
                    menus.child.forEach(
                        item => this.setMenus(item)
                        );
                    // console.log(444,menus.child)
                }
            }
        },
        goPage(menu){
            if(menu.href){
                // this.$router.push({ path: '/table' });
                this.$router.push({ path: menu.href });
            }else{
                
                // console.log(menu.child, menu.id, this.currentMenuId)
                //如果点击为当前节点，则复制
                if(menu.id === this.currentMenuId) {
                    this.currentMenuId = "";
                    menu.child = this.menu;
                }
                //fixed：当前若home3展开时，home1没有展开，则点击home3，会展示home1的内容
                if(menu.child.length > 0) this.currentMenuId = menu.id;
                // if(this.hasChild){
                // this.open = !this.open
                // }
            }
        },
      

    //    getdata(){
    //         let menuJson = axios.get(url,{params:{
    //             empt:this.name
    //         }}).then(res => {
    //         // return res.data;
    //         this.menus = res.data
    //            });
    //    }
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
   nav ul {
       list-style: none;
       padding: 0;
       margin: 0;
       padding-left: 20px;
   }

   nav ul li {
       padding-top: 5px;
   }

   .collapse {
       padding: 2px 20px;
   }

   

</style>