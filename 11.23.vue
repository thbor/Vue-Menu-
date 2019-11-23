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
          <th>序號</th><th v-for="item in tabletitle" :key="item.id">{{item.name}}</th><th style="width:90px">操作</th>
          <tbody>
            <tr v-for="(row,index) in tabledata" :key="row.id">
            <td style="text-align:center;width:60px;height:40px">
              <input :value="tabledata.length-index" class="inputClass" :class="{'changeBg':row.newFlag==true}"/>
            </td>
            <td v-for="col in tabletitle" :key="col.id" style="width:150px;height:40px">
              <input :style="row[col.key].style" :class="row[col.key].class" class="inputClass"/>
            </td>
            <td style="width:90px;height:40px" :class="{'rightDash':row.newFlag}" >
              <i style="font-size: 22px;line-height:40px;" class="el-icon-remove-outline" v-if="row.newFlag==1"></i>
              <el-button  type="text" size="small" style="color:red" v-else>刪除</el-button>
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
      // currentBasicRowInfo:[],    //當前打開的這個的table數據
      oldBasicInfo1:[],
      tabledata: [
        {
        id:'a1',model: { style: {},class:""},
        id:'a2',jLocation:{ style: {},class:""},
        id:'a3',kLocation:{ style: {},class:""},
        id:'a4',number0:{ style: {},class:"bgWhite"}
        },
        {
        id:'a5',model: { style: {},class:"" },
        id:'a6',jLocation:{ style: {},class:""},
        id:'a7',kLocation:{ style: {},class:""},
        id:'a8',number0:{ style: {},class:"bgWhite"}
        },
      ],
      tabletitle: [
        {name:'機種',key:'model', id: 'b1' },
        {name:'夾位',key:'jLocation',id:'b2'},
        {name:'刀位',key:'kLocation',id:'b3'},
        {name:'係數',key:'number0',id:'b4'}
      ]
    }
  },
  mounted(){
    this.dialogTableVisible = this.ifVisible;
    this.oldBasicInfo1 = this.basicRowInfo;
    this.initData();
  },
  watch:{
    basicRowInfo:function(){
      this.oldBasicInfo1 = this.basicRowInfo;
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
    initData(){
      for(let i in this.tabledata){
      this.tabledata[i]["newFlag"]=false
    }
    },
    ifNew(index){
      if(index==0){
        return true;
      }else{
        return false;
      }
    },
    addNumber(){
      let currentNo=this.tabledata.length+1;
      let newRow={
        id:'n'+currentNo,model: { style: {},class:"changeBg dashClass" },
        id:'n'+currentNo,jLocation:{ style: {},class:"changeBg dashClass"},
        id:'n'+currentNo,kLocation:{ style: {},class:"changeBg dashClass"},
        id:'n'+currentNo,number0:{ style: {},class:"changeBg dashClass"},
        }
      newRow["newFlag"]=true
      this.tabledata.unshift(newRow);
    },
    opened(){},
    submitTable(){},
    closeTable(){
      this.dialogTableVisible = false;
      this.$emit("close",this.dialogTableVisible);
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
    /* background: rgba(247,248,250,1); */
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
  .hidden{
    display: none
  }
  .show{
    display: block
  }
  .addPadding{
    padding-top:6px;
    padding-bottom: 5px;
  }

  .bgWhite{
    background: white
  }
</style>