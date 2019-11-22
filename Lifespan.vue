<template>
  <div>
    <div style="margin-bottom:10px;">
    <el-select v-model="model" placeholder="---刀具規格---" class="selectWidth mr"></el-select>
    <el-select v-model="selections" placeholder="---篩選條件---" class="selectWidth mr"></el-select>
    <el-input v-model="search" suffix-icon="el-icon-search" placeholder="搜索刀具名稱、規格" style="width:200px;"></el-input>
    <el-button icon="el-icon-plus" type="primary" style="float:right" @click="addLife">添加標準壽命</el-button>
    </div>
    <el-table :data="lifeInfo" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="刀具名稱"></el-table-column>
      <el-table-column prop="model" label="刀具規格"></el-table-column>
      <el-table-column prop="standardLife" label="標準壽命"></el-table-column>
      <el-table-column prop="number" label="折算係數">
        <el-table-column prop="number[0].number1" label="機種1-夾位1-刀位1"></el-table-column>
        <el-table-column prop="number[0].number2" label="機種1-夾位1-刀位1"></el-table-column>
        <el-table-column label="······">
          <template slot-scope="scope1">
            <el-button type="text" @click="getAllNumber(scope1.$index)">全部係數</el-button>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope2">
        <el-button @click.native.prevent="editRow(scope2.$index, lifeInfo)" type="text" size="small">編輯</el-button>
        <el-button @click.native.prevent="deleteRow(scope2.$index, lifeInfo)" type="text" size="small" style="color:red">刪除</el-button>
      </template>
    </el-table-column>
    </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      small
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="prev,pager,next,slot,total,sizes"
      :total="1000" class="pageClass" background>
      <span class="pageToclass">到第<input v-model="inputPage" class="pageInput" style="color:black">頁<button  class="borderBtn">確定</button></span>
      </el-pagination>
      <!-- 全部係數 -->
    <LifespanEdit :basicRowInfo="basicRowList" :ifVisible="dialogTableVisible" @close="close"></LifespanEdit>
      <!-- 添加標準壽命 -->
    <LifespanAdd :tableData="basicRowList" :ifFormVisible="formVisible" @close="closeForm" @save="saveForm"></LifespanAdd>
  </div>
</template>

<script>
import {getLifeSpanInfo} from "../../apis/api"
import LifespanEdit from "../../components/dialog/inspection/LifespanEdit"
import LifespanAdd from "../../components/dialog/inspection/LifespanAdd"
export default {
  data(){
    return{
      lifeInfo:[],
      model:"",
      selections:"",
      search:"",
      multipleSelection:[],
      inputPage:1,
      currentPage:1,
      dialogTableVisible:false,
      basicRowList:[],
      lifeInfo2:[],
      formVisible:false,
    }
  },
  watch:{
    basicRowList:function(){
      console.log("========")
      console.log(this.basicRowList)
    }
  },
  methods:{
    saveForm(){

    },
    close(v){
      this.dialogTableVisible = v;
    },
    closeForm(v){
      this.formVisible = v;
    },
    addLife(){
      this.formVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //獲取全部係數
    getAllNumber(rowIndex){
      this.dialogTableVisible = true;
      let data = this.lifeInfo2[rowIndex].allNumberInfo;
      this.basicRowList=data;
    },
    editRow(rowIndex,list){
      //點擊編輯時能夠修改係數那一列數據
      this.getAllNumber(rowIndex)
    },
    deleteRow(rowIndex,list){
      list.splice(rowIndex,1)
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    }
  },
  mounted(){
    getLifeSpanInfo().then(res=>{
      this.lifeInfo = res;
      this.lifeInfo2 = res;
    })
  },
  components:{
    LifespanEdit,
    LifespanAdd
  }
}
</script>

<style lang="css" scoped>
  .mr{
    margin-right:9px;
  }
  .selectWidth{
    width: 140px;
  }
  .pageInput{
    width: 40px;
    height: 28px;
    border-radius: 3px;
    text-align: center;
    border: 1px solid #DCDFE6;
    margin-left:10px;
    margin-right:10px;
  }
  .borderBtn{
    border: 1px solid #DCDFE6;
    height: 28px;
    border-radius: 3px;
    margin-left:10px;
    margin-right:10px;
}
  .pageClass{
    margin-top: 41px;
    margin-bottom:44px;
  }
</style>