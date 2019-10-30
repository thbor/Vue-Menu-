<template>

    <div>
        <el-row >
            <el-col :span="12" class="leftMenu">
                <div class="grid-content bg-purple">
                   <Menu/>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    右边内容
                </div>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>

//1引入组件
import Menu from '../components/Menu.vue'
export default {
    data(){
        return{
        }
    },
    //映射标签组
    components:{
        Menu
    }
}
</script>
<style>
   /* .leftMenu{
       background:#23527c;
       width: 20%;
       height: 800px;
       
       
   } */

   

</style>