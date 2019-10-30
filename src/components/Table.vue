<template>
    <div>
        <el-input v-model="input" placeholder="请输入内容" style="width:300px"></el-input>
        &nbsp;
        <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        <br> <br> <br>
        <el-table
        :data="tableList"
        stripe
        border
      
        @selection-change="handleSelectionChange"
       >
             <el-table-column type="selection" width="55"></el-table-column>
           <el-table-column prop="id" label="id" width="50"></el-table-column>
           <el-table-column prop="name" label="姓名" width="100"></el-table-column>
           <el-table-column prop="sex" label="性别" width="60"></el-table-column>
           <el-table-column prop="age" label="年龄" width="60"></el-table-column>
           <el-table-column prop="birth" label="生日" width="100"></el-table-column>
           <el-table-column prop="address" label="地址" width="160"></el-table-column>
           <el-table-column  label="操作" width="180" >
               <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click.native.prevent="deleteRow(scope.$index, tableList)"></el-button>
               </template>
               
           </el-table-column>
          
       </el-table>
         <div class="block">
            <span class="demonstration"></span>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="5" :total="total" style="float:right">
            </el-pagination>
            </div>
    </div>
</template>
<script>

//1引入组件
// import Menu from '../components/Menu.vue'
import {getTableJson} from '../api/api'
export default {
    data(){
        return{
            tableList:[],
            input:'',
            multipleSelection:[],
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
        
    },
    methods:{
        find(){
            console.log(this.input.trim())
            let inputContent = this.input.trim();
            // 对数据tableList进行过滤操作
            this.tableList.filter=()=>{
                if(inputContent == "" || inputContent == null){
                    return this.input;
                }else {
                    return this.tableList;
                }
            }
        },
        add(){
            console.log("弹出添加窗口")
        },
        deleteRow(index, rows) {
        rows.splice(index, 1);
        },
        handleSelectionChange(val){
            this.multipleSelection  = val;
            console.log(val)
        }
    }
}
</script>
<style>
  

   

</style>