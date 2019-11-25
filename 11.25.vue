<template>
  <div>
    <el-dialog :title="title" :visible="dialogTableVisible" width="840px" @opened="opened" @close="closeTable" append-to-body center>
        <!-- <TableComponent @change="onChangeTest" :tabledata="tabledata" :tabletitle="tabletitle" /> -->
      <div class="dialogContent">
        <div class="findClass">
        <el-select v-model="jModelSelect" placeholder="---機種---" clearable>
        <el-option v-for="item in jModels" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="jLocationSelect" placeholder="---夾位---" clearable>
        <el-option v-for="item in jLocations" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="kLocationSelect" placeholder="---刀位---" clearable>
        <el-option v-for="item in kLocations" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button icon="el-icon-plus" style="float:right;color:#399BFF;border:1px solid" @click="addNumber">添加係數</el-button>
      </div>
      <div >
        <table class="tableClass" cellspacing="0">
          <th style="width:90px;" :class="{'br-b':(tabledata.length==0 || tabledata[0].newFlag)}">序號</th>
          <th v-for="item in tabletitle" :class="{'br-b':(tabledata.length==0 || tabledata[0].newFlag)}" :key="item.id">{{item.name}}</th>
          <th style="width:90px;" class="br-r" :class="{'br-b':(tabledata.length==0 || tabledata[0].newFlag)}">操作</th>
          <tbody>
            <tr v-for="(row,index) in tabledata" :key="'row'+index" @change="changeInpt(row,index)">
            <td style="text-align:center;width:60px;height:40px">
              <input :value="tabledata.length-index" class="inputClass" readonly=true :class="{'changeBg dashClass':row.newFlag==true,'br-b':tabledata.length-index==1}" :style="row['No'].style"/>
            </td>
            <td v-for="col in tabletitle" :key="col.key" style="width:150px;height:40px">
              <input :ref="col.key+'-'+row[col.key].value" @change="changeInpt(row,index)" :readonly="ifRead(col.key,row)" v-model="row[col.key].value"  class="inputClass" :class="{'changeBg dashClass':row.newFlag,'br-b':tabledata.length-index==1,'bgWhite':col.key=='number0'}" :style="row[col.key].style"/>
            </td>
            <td style="width:90px;height:40px" :class="{'deleteClass':!row.newFlag,'br-b':tabledata.length-index==1&&!row.newFlag}">
              <div :class="{'rightDash':row.newFlag }" style="line-height:38px;">
                <i style="font-size: 22px;" @click="deleteRow(tabledata,index)" class="el-icon-remove-outline" v-if="row.newFlag"></i>
                <el-button  type="text" size="small" @click="deleteRow(tabledata,index)" style="color:red" v-else>刪除</el-button>
              </div>
            </td>
            </tr>
          </tbody>
        </table>
        <div class="footClass">
          <el-button plain @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitTable">確定修改</el-button>
        </div>
      </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { filter } from 'minimatch';
// import TableComponent from "../../data/TableDemo.vue";

export default {
  props:['basicRowInfo','ifVisible'],
  data(){
    return{
      title:"刀具名稱DSD-56544632",
      No:-1,
      dialogTableVisible:false,
      jModels:[
        {"value":"Cavailers","label":"Cavailers"},
        {"value":"Lakers","label":"Lakers"}
      ],
      jLocations:[
        {"value":"DF-23411","label":"DF-23411"}
      ],
      kLocations:[
        {"value":"DF-23411","label":"DF-23411"}
      ],
      jModelSelect:"",
      kLocationSelect:"",
      jLocationSelect:"",
      readonly:false,
      oldBasicInfo1:[],
      tabledata: [
        {
        No:{style:{},class:""},
        jModel: { style: {},class:""},
        jLocation:{ style: {},class:""},
        kLocation:{ style: {},class:""},
        number0:{ style: {},class:"bgWhite"}
        },
      ],
      tabletitle: [
        {name:'機種',key:'jModel'},
        {name:'夾位',key:'jLocation'},
        {name:'刀位',key:'kLocation'},
        {name:'係數',key:'number0'}
      ],
      inited:false,
      tabledata2:[],
      addRows:[],
      ifNotAdd:false
    }
  },
  mounted(){
    this.dialogTableVisible = this.ifVisible;
    this.oldBasicInfo1 = this.basicRowInfo;
  },
  watch:{
    jModelSelect:function(){
      this.watchChange(this.jModelSelect,this.jLocationSelect,this.kLocationSelect)
    },
    jLocationSelect:function(){
      this.watchChange(this.jModelSelect,this.jLocationSelect,this.kLocationSelect)
    },
    kLocationSelect:function(){
      this.watchChange(this.jModelSelect,this.jLocationSelect,this.kLocationSelect)
    },
    basicRowInfo:function(){
      this.oldBasicInfo1 = this.basicRowInfo;
      if(this.inited==false){
        this.initData();
        this.initNewFlag();
        this.inited = true;
        }
    },
    ifVisible:function(){
      this.dialogTableVisible = this.ifVisible;
    },
    tabledata:function(){
      if(this.tabledata.length>=1){
        this.tabledata[1]["newFlag"] = false;
      }
    }
  },
  methods:{
    watchChange(jm,jl,kl){
      //過濾數據
      let copeData = this.tabledata2;
      var filterData = [];
      var filterData2 = [];
      var filterData3 = [];
      let allNo = [];
        for(let t of this.addRows){
          for(let t2 of this.tabledata2){
            if(t2.No.value!=(t.No.value) && !allNo.includes(t.No.value)){
              allNo.push(t2.No.value)
            }
          }
          if(!allNo.includes(t.No.value)){
            copeData.unshift(t)
            allNo.push(t.No.value)
          }
      }
      this.addRows=[];
      //根據3個參數過濾
      for(let i in copeData){
        if(copeData[i].jModel.value.indexOf(jm)!=-1){
          filterData.push(copeData[i])
        }
      }
      for(let j in filterData){
        if(filterData[j].jLocation.value.indexOf(jl)!=-1){
          filterData2.push(filterData[j])
        }
      }
      for(let k in filterData2){
        if(filterData2[k].kLocation.value.indexOf(kl)!=-1){
          filterData3.push(filterData2[k])
        }
      }
      this.tabledata = filterData3;
    },
    ifRead(colKey,row){
      if(colKey!='number0' && !row.newFlag){
        return true
      }
    },
    changeInpt(row,index){
      if(index!=0 ||(index==0 && row.newFlag==false)){
        row['number0'].style={background:'#E4EBD4'}
        row['No'].style={borderLeft:'6px solid rgba(70,209,165,0.5)'}
      }
    },
    deleteRow(allData,index){
      allData.splice(index,1)
      console.log(this.addRows);
      this.addRows.splice(index,1)
      this.tabledata2.splice(index,1)
    },
    initNewFlag(){
      for(let i in this.tabledata){
      this.tabledata[i]["newFlag"]=false
    }
    },
    initData(){
      let results = [];
      this.oldBasicInfo1.forEach(item => {
        let res = {};
        for (let key of Object.keys(item)) {
          let obj = { value: item[key], style: {} };
          res[key] = obj;
        }
        results.push(res);
      });
      this.tabledata = results;
      this.tabledata2 = this.tabledata;
   //FIXME :每一次initData時都將style和class的觸發延遲了，接收不到change事件，需要在new一個之後才能渲染在頁面上
    },
    ifNew(index){
      if(index==0){
        return true;
      }else{
        return false;
      }
    },
    addNumber(){
      if(this.addRows.length>0 || (this.tabledata2.length>0 && this.tabledata2[0].newFlag==true)){
        alert("清閒填寫完成再添加");
        this.jModelSelect="";
        this.kLocationSelect="";
        this.jLocationSelect=""
      }else{
        let currentNo=this.tabledata.length+1;
      let newRow={
        No: { style: {},class:"dashClass",value:currentNo},
        jModel: { style: {},class:"changeBg dashClass",value:""},
        jLocation:{ style: {},class:"changeBg dashClass",value:""},
        kLocation:{ style: {},class:"changeBg dashClass",value:""},
        number0:{ style: {},class:"changeBg dashClass",value:""},
        }
      newRow.newFlag=true;
      this.addRows.push(newRow);
      this.tabledata.unshift(newRow);
      }
    },
    opened(){
      //添加style和calss
    },
    submitTable(){},
    closeTable(){
      this.dialogTableVisible = false;
      this.$emit("close",this.dialogTableVisible);
      this.inited=false;
      this.addRows=[];
    },
    cancel(){
      this.closeTable();
    },
  },
  }
</script>
<style land="css" scoped>
  .el-dialog__title{
    font-size: 16px;
  }
  .findClass{
    margin-bottom:10px;
  }
  .el-select{
    margin-right: 10px !important;
    width: 140px !important;
  }
  .dialogContent{
    height: 348px;
    overflow: auto;
  }
  .footClass{
    margin-top:20px;
    text-align: center
  }
  .NoClass{
    border: 1px dashed #CCCCCC !important
  }
  .inputClass{
    border: none;
    width: 100%;
    height: 40px;
    background: rgba(247,248,250,1);
    color: #666666;
    border: 1px solid #CCCCCC;
    margin: 0px;
    padding: 0px;
    border-right:none !important;
    border-bottom: none !important;
  }
  .dashClass{
    margin-top:5px;
    margin-bottom: 5px;
    border:1px dashed #CCCCCC !important;
    border-right:none !important;
  }
  .rightDash{
    border-right: 1px dashed #CCCCCC !important;
    border-top: 1px dashed #CCCCCC !important;
    border-bottom:1px dashed #CCCCCC !important;
  }
  .changeBg{
    background: #E4EBD4 !important;
  }
  .tableClass{
    width: 750px;
    margin: 0px;
    padding: 0px;
  }
  td{
    padding: 0px !important;
    margin: 0px !important;
  }
  th{
    border:1px solid rgba(204,204,204,1) !important;
    border-right: none !important;
    border-bottom: none !important;
  }
  .editBorder{
    border-left:6px solid rgba(70,209,165,0.5) !important;
  }
  .addPadding{
    padding-top:6px;
    padding-bottom: 5px;
  }
  .bgWhite{
    background: white
  }
  .br-b{
    border-bottom: 1px solid #CCCCCC !important
  }
  .deleteClass{
    border-left: 1px solid #CCCCCC !important;
    border-top: 1px solid #CCCCCC;
    border-right: 1px solid #CCCCCC
  }
  .br-r{
    border-right:1px solid #CCCCCC !important
  }
  .br-b{
    border-bottom: 1px solid #CCCCCC !important
  }
</style>