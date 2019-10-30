<template>
    <div>
        <el-input v-model="input" placeholder="请输入内容" style="width:300px"></el-input>
        &nbsp;
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus">新增</el-button>

       <el-table
       :data="tableList"
       >
           <el-table-column prop="id" label="id" width="50"></el-table-column>
           <el-table-column prop="name" label="姓名" width="100"></el-table-column>
           <el-table-column prop="sex" label="性别" width="100"></el-table-column>
           <el-table-column prop="age" label="年龄" width="100"></el-table-column>
           <el-table-column prop="birth" label="生日" width="100"></el-table-column>
           <el-table-column prop="address" label="地址" width="180"></el-table-column>
           <el-table-column  label="操作" width="180">
               <el-button type="primary" icon="el-icon-edit" circle></el-button>
               <el-button type="danger" icon="el-icon-delete" circle></el-button>
           </el-table-column>
           
       </el-table>
        
    </div>
</template>
<script>

//1引入组件
// import Menu from '../components/Menu.vue'
import {getTableJson} from '../api/api'
export default {
    data(){
        return{
            tableList:''
        }
    },
    //映射标签组
    components:{
        // Menu
    },
    mounted(){
        getTableJson().then(res=>{
            console.log(res.data);
            this.tableList = res.data;
        }
        ).catch(error=>window.console.log(error)) 
    }
}
</script>
<style>
  

   

</style>