<template>

    <div class="tableBorder">
        <el-input v-model="input" placeholder="请输入内容" style="width:300px"></el-input>
        &nbsp;
        <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="EditRow(-1,tableList)">新增</el-button>
        <el-dialog title="新增信息" :visible.sync="dialogFormVisible">
<!--form-->
        <Form :formInfo="formInfo"/> 
<!--form end-->
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
<!--form提交事件-->
        <el-button type="primary" @click="update">确 定</el-button>
<!--form提交事件-->
        </div>
        </el-dialog>
<!--table -->
       <!-- pageNum:第几页 pageSize:每页的5条数据  12条数据  this.pageNum=3   this.pageSize=5  this.tableList.length=12 -->
        <br> 
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
                   <!-- 这里的tableList应该是本页数据，而不是所有数据tableList，这样index会乱 导致删除和修改时的数据不是本页的数据-->
                    <el-button type="primary" icon="el-icon-edit" circle @click="EditRow(scope.$index, tableList)"></el-button>
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
            @size-change="hanleSizeChange"
            @current-change="handleCurrentChange" 
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
import Form from '../components/Form.vue'
export default {
    data(){
        return{
            tableList:[],   //所有数据
            // pageList:[],    //本页数据
            tableCopyList:[],
            input:'',
            multipleSelection:[],
            total:0,   //总条目数   
            pageNum:1,  //当前是第几页
            pageSize:5, //规定有多少条数据
            currentPageSize:0,
            // currentPage:1,
            endIndex:0,
            ifHiddenPage:false,
            flagIndex:-1,
            dialogFormVisible: false,
            formInfo: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            
        }
    },
    //2映射标签组
    components:{
        // Menu
        Form
    },
    mounted(){
        getTableJson().then(res=>{
            this.tableList = res.data;
            this.tableCopyList = res.data;
            this.total = this.tableList.length;
        }
        ).catch(error=>window.console.log(error)) 
    },
    methods:{
        find(){
            let inputContent = this.input.trim();
            this.pageNum = 1;
            this.tableList = this.tableCopyList;   //放在这里是在所有的搜索里面进行素搜索
            // 对数据tableList进行过滤操作
            if(inputContent=="" || inputContent==null){
                // this.tableList = this.tableCopyList;    //放在这里是在搜索的基础上搜索
                this.total = this.tableCopyList.length;
                return this.tableCopyList;
                 
            }else{
                var inputSearch = this.tableList.filter(item=>item.name.indexOf(inputContent)!==-1);
                this.tableList = inputSearch;
                this.total = this.tableList.length;
                return inputSearch;
            }
        },
       
        update(){
            //1.数据验证
            //2.封装表单对象
            //3.数据更新表单
            // console.log("flagIndex==============="+this.flagIndex)
            if(this.flagIndex==-1){
                //新增
                 this.tableList.unshift(this.formInfo)
            }else{
                //修改
                this.tableList.splice(this.flagIndex,1,this.formInfo)
                
            }
            // console.log(1111,this.formInfo)
            this.dialogFormVisible = false
        },
        EditRow(index, rows){
            this.dialogFormVisible = true;
            //新增
            if(index==-1){
                this.formInfo = {}
                this.flagIndex=-1;
                this.total++;
            }else{
            //修改
                index+=((this.pageNum-1)*this.pageSize)
                let rowData = rows[index];
                console.log(rowData);
                this.formInfo =this.tableList[index];
                console.log(this.formInfo.birth)
                this.flagIndex=index;
                
            }
            
        },
        deleteRow(index, rows) {
            // index位置应该是index+之前的页数的数据
            index+=((this.pageNum-1)*this.pageSize)
            rows.splice(index, 1);
             if(this.total/this.pageSize>=this.pageNum){
                this.currentPageSize = this.pageSize;
            }else{
                this.currentPageSize = this.total%this.pageSize;
            }
            this.total--;
            this.currentPageSize--;
            if(this.total == 0){
                this.ifHiddenPage = true;
            }
            //被删除完了，跳转到上一页
            if(this.currentPageSize == 0){
                 if(this.total == 0){
                 this.currentPageSize = 0;
                
            }else{
                 this.pageNum--;
                this.currentPageSize--;
                this.currentPageSize = this.pageSize;
            }
            }
        },
        handleSelectionChange(val){
            this.multipleSelection  = val;
            console.log(this.multipleSelection)
        },
        
        handleCurrentChange(val){
            this.pageNum = val;
            console.log("当前为第"+val+"页")
            if(this.total/this.pageSize>=this.pageNum){
                this.currentPageSize = this.pageSize;
            }else{
                this.currentPageSize = this.total%this.pageSize;
            }
            console.log("当前每一页有"+this.currentPageSize+"条数据")
        },
         hanleSizeChange(val){
             console.log(`每页 ${val} 条`);
             this.pageSize = val;
             console.log(" this.pageSize:"+this.pageSize)
              
         },
    //    pageNum:第几页 pageSize:每页的5条数据  12条数据  this.pageNum=3   this.pageSize=5  this.tableList.length=12 
        //  getPageData(){
        //     // tableList.slice((this.pageNum-1)*this.pageSize,((this.pageNum-1)*this.pageSize+this.pageSize)>(this.tableList.length)?(this.tableList.length):((this.pageNum-1)*this.pageSize+this.pageSize))
        //     // 从第startSlice的位置开始去掉数组(每页的第一个元素)
        //     var startSlice = (this.pageNum-1)*this.pageSize;
        //     var endSlice;
        //     //比较tableList和
        //     if(startSlice+this.pageSize>this.tableList.length){
        //         endSlice = this.tableList.length;
        //     }else{
        //         endSlice = startSlice+this.pageSize;
        //     }
        //     this.pageList = this.tableList.slice(startSlice,endSlice);
        //     console.log("************")
        //     console.log(this.pageList)
        //     console.log("************")
        //     return this.pageList;

        //  }
        
        
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