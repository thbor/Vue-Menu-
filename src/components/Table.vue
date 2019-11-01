<template>

    <div class="tableBorder">
        <el-input v-model="input" placeholder="请输入内容" style="width:300px"></el-input>
        &nbsp;
        <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <!--form-->
        <el-dialog title="新增信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
        <el-input v-model="form.birth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
    </el-dialog>
    <!--form end--> 
        <template>

        </template>
 
<!--table -->
       <!-- pageNum:第几页 pageSize:每页的5条数据  12条数据  this.pageNum=3   this.pageSize=5  this.tableList.length=12 -->
        <br> <br> <br>
        <el-table
        :data="tableList.slice((this.pageNum-1)*this.pageSize,((this.pageNum-1)*this.pageSize+this.pageSize)>(this.tableList.length)?(this.tableList.length):((this.pageNum-1)*this.pageSize+this.pageSize))"
        stripe
        @selection-change="handleSelectionChange">
           <el-table-column type="selection" width="80"  align="center"></el-table-column>
           <el-table-column prop="id" label="id" width="80" align="center"></el-table-column>
           <el-table-column prop="name" label="姓名"  align="center"></el-table-column>
           <el-table-column prop="sex" label="性别"  align="center"></el-table-column>
           <el-table-column prop="age" label="年龄"  align="center"></el-table-column>
           <el-table-column prop="birth" label="生日"  align="center"></el-table-column>
           <el-table-column prop="address" label="地址"  align="center"></el-table-column>
           <el-table-column  label="操作" >
               <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click.native.prevent="deleteRow(scope.$index, tableList)"></el-button>
               </template>
               
           </el-table-column>
       </el-table>
<!--table end-->
<!--分页-->
         <div :class="{hiddenPage:ifHiddenPage}">
            <span class="demonstration"></span>
            <el-pagination 
            layout="prev, pager, next" 
            background
            @current-change="handleCurrentChange" 
            @size-change="hanleSizeChange"
            :page-size="pageSize" 
            :total="total" 
            style="float:right">
            </el-pagination>
        </div>
<!--分页 end-->
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
            tableCopyList:[],
            input:'',
            multipleSelection:[],
            total:0,   //总条目数   
            pageNum:1,  //当前是第几页
            pageSize:5, //每一页有多少条数据
            endIndex:0,
            ifHiddenPage:false,
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
        formLabelWidth: '80px',
        }
    },
    //映射标签组
    components:{
        // Menu
    },
    
    mounted(){
        getTableJson().then(res=>{
            this.tableList = res.data;
            this.tableCopyList = res.data;
            this.total = this.tableList.length;
            // console.log("total总条目数为:"+this.total)
        }
        ).catch(error=>window.console.log(error)) 
        
        
    },
    methods:{
        find(){
            let inputContent = this.input.trim();
            // 对数据tableList进行过滤操作
            if(inputContent=="" || inputContent==null){
                this.tableList = this.tableCopyList;
                return this.tableCopyList;
                 
            }else{
                var inputSearch = this.tableList.filter(item=>item.name.indexOf(inputContent)!==-1);
                this.tableList = inputSearch;
                return inputSearch;
            }
        },
        add(){
            // console.log("弹出添加窗口")
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
            this.total--;
            if(this.total == 0){
                    this.ifHiddenPage = true;
            }
        },
        handleSelectionChange(val){
            this.multipleSelection  = val;
            console.log(this.multipleSelection)
            // console.log(val)
        },
        
        handleCurrentChange(val){
            this.pageNum = val;
            // console.log("当前为第"+val+"页")
            // console.log("当前每一页有"+this.pageSize+"条数据")
            // console.log("total2总条目数为:"+this.total)
             
        },
         hanleSizeChange(val){
             this.pageSize = val;
              
         },
        
    }
}
</script>
<style>
    .tableBorder{
        margin: 0px;
        padding: 20px;
        /* border: 1px solid black; */
        width: 100%
    }
    .hiddenPage{
        visibility: hidden;
    }
    
   

</style>