<template>
  <div class="tableClass">
    <div class="selectClass">
      <el-select v-model="name" placeholder="---設備名稱---" clearable>
        <el-option v-for="item in this.nameSelect" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="model" placeholder="---規格型號" clearable>
        <el-option v-for="item in this.modelSelect" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="brand" placeholder="---品牌---" clearable>
        <el-option v-for="item in this.brandSelect" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="cLocation" placeholder="---產區---" clearable>
        <el-option v-for="item in this.cLocationSelect" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <div class="searchDiv">
        <el-input v-model="inputSearch" placeholder="搜索管制編號/設備編號" class="inputClass"></el-input>
        <el-button class="btnClass" icon="el-icon-search" @click="searchTable"></el-button>
      </div>
      <el-button type="primary" class="addBtnClass" icon="el-icon-plus" @click="addFacility">添加新設備</el-button>
        <basicInfoAdd :ifVisible="dialogFormVisible" :formInfo="formContent" :updateFlag="flagIndex" @save="saveForm" @cancel="cancelForm"></basicInfoAdd>
    </div>
    <div>
      <el-table
      :data="oldBasicList"
      border>
      <el-table-column prop="name" label="設備名稱"></el-table-column>
      <el-table-column prop="model" label="規格型號"></el-table-column>
      <el-table-column prop="brand" label="品牌"></el-table-column>
      <el-table-column prop="mNo" label="管制編號"></el-table-column>
      <el-table-column prop="fNo" label="設備編號"></el-table-column>
      <el-table-column prop="cLocation" label="廠區"></el-table-column>
      <el-table-column prop="pLocation" label="產品處"></el-table-column>
      <el-table-column prop="code" label="費用代碼"></el-table-column>
      <el-table-column prop="location" label="位置"></el-table-column>
      <el-table-column prop="birth" label="生產日期"></el-table-column>
      <el-table-column prop="status" label="使用狀態" :formatter="statusFormat"></el-table-column>
      <el-table-column prop="rank" label="設備評級"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">編輯</el-button>
        <el-button @click="handleDelete(scope.$index,oldBasicList)" type="text" size="small" style="color:red">刪除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total="1000" class="pageClass"></el-pagination> -->
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
    </div>
  </div>
</template>
<script>
import {getBasicInfo} from "../../apis/api"
import basicInfoAdd from "../../components/dialog/inspection/basicInfoAdd"
export default {
  data(){
    return{
      basicList:[],
      oldBasicList:[],
      name:"",
      nameSelect:[],
      model:"",
      modelSelect:[],
      brand:"",
      brandSelect:[],
      cLocation:"",
      cLocationSelect:[],
      basicCLocationList:[],
      inputSearch:"",
      currentPage:1,
      inputPage:1,
      selectList:[],
      allSelections:[],
      dialogFormVisible:false,
      formContent:{},
      statusList:[{"text":"使用中","value":1},{"text":"未使用","value":0}],
      flagIndex:-1,     //判斷新增還是修改
    }
  },
  components:{
    basicInfoAdd
  },
  mounted(){
    getBasicInfo().then(res=>{
      this.basicList = res;
      this.oldBasicList = res;
      this.getSelected(this.name,this.model,this.brand,this.cLocation);
    })
  },
  watch:{
    /*把改變的那個值放在最開始的位置*/
    name:function(){
      this.getSelected(this.name,this.model,this.brand,this.cLocation)
    },
    model:function(){
      this.getSelected(this.model,this.name,this.brand,this.cLocation)
    },
    brand:function(){
      this.getSelected(this.brand,this.model,this.name,this.cLocation)
    },
    cLocation:function(){
      this.getSelected(this.cLocation,this.model,this.brand,this.name)
    },
  },
  methods:{
    statusFormat(row){
      for(let i in this.statusList){
        if(this.statusList[i].value==row.status){
          return this.statusList[i].text;
        }
      }
    },
    saveForm(v){
      this.dialogFormVisible = v.ifVisible;
      this.formContent = v.form;
      //TODO  axios接口將this.form的數據放鬆後台進行保存  需要判斷是新增還是修改
      if(v.updateFlag==-1){
        //新增
        console.log("新增",v.updateFlag)
      }else{
        //修改，且index爲update的索引
        console.log("修改",v)
        this.dialogFormVisible = false;
      }
    },
    cancelForm(v){
      this.dialogFormVisible = v;
    },
    handleEdit(index,val){
      this.dialogFormVisible = true;
      //要先將需要轉換的status轉化後再傳遞
      let statusRow = this.statusFormat(val);
      val.status = statusRow;
      this.formContent=val;
      this.flagIndex = index;
      //向子節點傳遞值
    },
    handleDelete(index,allList){
      console.log(index,allList);
      //TODO 還需要根據分頁來刪除  然後axios刪除
      allList.splice(index,1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addFacility(){
      this.dialogFormVisible = true;
      //爲新增增加一個index=-1
      this.flagIndex = -1;
    },
    searchTable(){
      let inputValue = this.inputSearch.trim();
      this.oldBasicList = this.allSelections;
      let searchList = [];
      for(let i in this.oldBasicList){
        if(inputValue==""){
          searchList = this.oldBasicList;
        }else{
          if(inputValue.indexOf(this.oldBasicList[i].mNo)!=-1 || inputValue.indexOf(this.oldBasicList[i].fNo)!=-1){
          searchList.push(this.oldBasicList[i])
          }
        }
      }
      this.oldBasicList = searchList;
    },
    getAllSelect(selectData){
      for(let i in selectData){
        if(!this.nameSelect.includes(selectData[i].name)){
            this.nameSelect.push(selectData[i].name);
        }
        if(!this.modelSelect.includes(selectData[i].model)){
            this.modelSelect.push(selectData[i].model);
        }
        if(!this.brandSelect.includes(selectData[i].brand)){
            this.brandSelect.push(selectData[i].brand);
        }
        if(!this.cLocationSelect.includes(selectData[i].cLocation)){
            this.cLocationSelect.push(selectData[i].cLocation);
        }
      }
      this.allSelections = this.basicList;
      this.oldBasicList = this.allSelections;
    },
    /*獲取所有的設備名稱的可選項     TODO還需要根據select框已有的選擇過濾後一項的可選數據*/
    getSelected(n,m,b,c){
      this.inputSearch ="";
      //如果還沒選，所有select可選爲初始化過濾的方法
      if(n=="" && m=="" && b=="" && c==""){
        this.getAllSelect(this.basicList);
      }else{
        this.currentSelectGet(n,m,b,c);
      }
    },
    /*g:根據另外3個條件獲取的值*/
    currentSelectGet(change,s1,s2,s3){
      if(change!=""){
      this.allSelections=[];
      for(let i in this.basicList){
      let changeKey1 = this.findKey(this.basicList[i],change)
      if(changeKey1!=undefined){
        let changeKey = changeKey1;
        /*找到與change相同的list放入數組，這個數組作爲之後的list來循環  indexOf未找到改值返回-1*/
        if(this.basicList[i][changeKey].indexOf(change)!=-1){
          this.allSelections.push(this.basicList[i])
        }
      }
      }
      }else{
        this.allSelections = this.basicList;
      }
      this.getFilterSelect(s1,s2,s3)
      /*allSelections爲你選擇一個select之後與該select選擇匹配的數據  還需要過濾s1,s2,s3選擇後的數據*/
    },
    getFilterSelect(s1,s2,s3){
      this.getFilterSelect1(s1);
      this.getFilterSelect1(s2);
      this.getFilterSelect1(s3);
    },
    getFilterSelect1(s1){
      this.selectList=[];
      for(let i in this.allSelections){
        if(s1==""){
          this.selectList=this.allSelections;
        }else{
          let key1 = this.findKey(this.allSelections[i],s1);
          if(key1!=undefined){
          let key = key1;
          /*找到與change相同的list放入數組，這個數組作爲之後的list來循環  indexOf未找到改值返回-1*/
          if(this.allSelections[i][key1].indexOf(s1)!=-1){
            this.selectList.push(this.allSelections[i])
          }
        }
        }
      }
      this.allSelections = this.selectList;
      this.oldBasicList = this.allSelections;
      this.selectList = this.oldBasicList;
    },
    /*根據value找到key*/
    findKey (obj,value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value))
    },
  }
}

</script>
<style lang="css" scoped>
/*補齊table和左右邊距的距離*/
  .tableClass{
    margin-right:4px;
    margin-left:2px;
  }
  .el-select{
    margin-right:9px;
    width: 140px;
  }
  .el-input{
    width:200px;
  }
  .addBtnClass{
    width: 120px;
    float: right;
  }
  .selectClass{
    margin-top:7px;   /*補全樣式麵包屑和select的距離*/
    margin-bottom:9px;
  }
  .pageClass{
    margin-top: 41px;
    margin-bottom:44px;
  }
  .pageToclass{
    display: inline-block;
    color:#999999;
    line-height: 20px;
    margin-top:-2px;
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
  .searchDiv{
    position: relative;
    height: 22px;
    width: 200px;
    display: inline-block;
    bottom: 0px;

  }
  .inputClass{
    position: absolute;
  }
  .btnClass{
    position: absolute;
    right: 0px;
    width: 0px;
    background: transparent;
    border: white
  }
</style>