<template>
  <div>
    <el-dialog :title="title" :visible="dialogTableVisible" width="840px" @opened="opened" @close="closeTable" append-to-body center>
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
        <!-- {{this.jModelSelect}} -->
        <el-button icon="el-icon-plus" style="float:right;color:#399BFF;border:1px solid" @click="addNumber">添加係數</el-button>
      </div>
      <div >
        <table class="tableClass" cellspacing="0">
          <tr><th>序號</th><th>機種</th><th>夾位</th><th>刀位</th><th>係數</th><th name="operate">操作</th></tr>
          <tr v-for="col in oldBasicInfo1" :key="col.No" :class="'tr'+col.No">
              <td style="width:60px;height:40px">
                <input style="text-align:center" class="inputClass" v-model="col.No" readonly="true" :id="'td'+col.No" :class="'td'+col.No" @change="changeInput(col.No,null)">
              </td>
              <td style="width:150px;height:40px">
                <input placeholder="請輸入" v-model="col.jModel" :ref="'jModel-'+col.No" class="inputClass" :name="'jModel-'+col.No" :class="'td'+col.No" @change="changeInput(col.No,col.jModel)">
              </td>
              <td style="width:150px;height:40px">
                <input placeholder="請輸入" v-model="col.jLocation" :ref="'jLocation-'+col.No"  class="inputClass" :name="'jLocation-'+col.No" :class="'td'+col.No" @change="changeInput(col.No,col.jLocation)"></td>
              <td style="width:150px;height:40px">
                <input placeholder="請輸入" v-model="col.kLocation" :ref="'kLocation-'+col.No" class="inputClass" :name="'kLocation-'+col.No" :class="'td'+col.No" @change="changeInput(col.No,col.kLocation)"></td>
              <td style="width:150px;height:40px">
                <input placeholder="請輸入" v-model="col.number0" :ref="'number0-'+col.No" class="inputClass bgWhite" :name="'number0-'+col.No" :class="'td'+col.No" @change="changeInput(col.No,col.number0)"></td>
              <td style="width:90px;height:40px">
                <div class="inputClass" :class="'td'+col.No" name="operate">
                  <i style="font-size: 22px;line-height:40px;" class="el-icon-remove-outline" v-if="ifNew(col)" @click="removeRow()"></i>
                  <el-button  type="text" size="small" style="color:red" v-else @click="deleteRow(col)">刪除</el-button>
                </div>
              </td>
          </tr>
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
export default {
  // ifVisible:Boolean,
  // basicRowInfo:Array,
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
      ifEdit:true,
      // currentBasicRowInfo:[],    //當前打開的這個的table數據
      currentNum:-1,
      addFlag:0,
      validateFlag:false,
      oldBasicInfo1:[],
      oldBasicInfo2:[],
      addRows:[],
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
    },
    ifVisible:function(){
      this.dialogTableVisible = this.ifVisible;
    },
    oldBasicInfo1:function(){
      this.sortTable();
      this.$nextTick(()=>{
        var td1Div = document.getElementsByClassName("td1");
        let thDiv = document.getElementsByTagName('th');
        for(let j=0;j<td1Div.length;j++){
        this.addClass(td1Div[j],'br-b');
        //最上面一格的bordertop和th的border-bottom都在的畫，去掉一個bordertop
        var topDiv = document.getElementsByClassName("td"+(this.oldBasicInfo1[0].No));
        var oper = document.getElementsByName("operate");
        for(let j=0;j<oper.length;j++){
        if(oper[j].className.indexOf('br-r')==-1){
          //operate沒有br-r,判斷是否是新增的，新增的則加上虛線，非新增就直接加上br-r
          if(oper[j].className.indexOf("td"+this.oldBasicInfo1.length)!=-1){
            //新增
            this.addClass(oper[j],'rightDash');
          }else{
            this.addClass(oper[j],'br-r')
          }
        }
      }
      }
      })
    },
    addFlag:function(){
      this.$nextTick(()=>{
        this.getClass();
      })
    }
  },
  methods:{
    //將No值改變
    sortNo(list){
      console.log(list);
      let num = 1;
      for(let i=list.length-1;i>=0;i--){
      console.log(list[i]);
      list[i].No = num;
      num+=1;
      }
      this.oldBasicInfo1 = list;
    },
    watchChange(jm,jl,kl){
      this.oldBasicInfo1 = this.basicRowInfo;
      //過濾數據
      let copeData = this.oldBasicInfo1;
      var filterData = [];
      var filterData2 = [];
      var filterData3 = [];
      //根據3個參數過濾
      for(let i in copeData){
        if(copeData[i].jModel.indexOf(jm)!=-1){
          filterData.push(copeData[i])
        }
      }
      for(let j in filterData){
        if(filterData[j].jLocation.indexOf(jl)!=-1){
          filterData2.push(filterData[j])
        }
      }
      for(let k in filterData2){
        if(filterData2[k].kLocation.indexOf(kl)!=-1){
          filterData3.push(filterData2[k])
        }
      }

      // if(filterData3){this.oldBasicInfo1 = filterData3;}
      // else if(filterData2){this.oldBasicInfo1 = filterData3;}
      // else if(filterData){this.oldBasicInfo1 = filterData;}
      this.sortNo(filterData3)
    },
    //去除br-tn樣式
    removeBrtn(){
      //去除頭部border樣式
      let topDiv = document.getElementsByClassName("td"+this.oldBasicInfo1.length);
      for(let i=0;i<topDiv.length;i++){
        this.addClass(topDiv[i],'br-tn');
      }
    },
    deleteRow(col){
      //找到第幾行，然後刪除
      for(let i in this.oldBasicInfo1){
        if(this.oldBasicInfo1[i].No == col.No){
          let index = i;
          this.oldBasicInfo1.splice(index,1)
        }
      }
      //去除頭部border樣式
      this.removeBrtn();
    },
    removeRow(){
       //刪除數據
      this.oldBasicInfo1.splice(0,1);
      //去除頭部border樣式
      this.removeBrtn();
    },
    ifNew(col){
      if(col.No==this.oldBasicInfo1.length && (col.jModel=="" || col.jLocations=="" || col.kLocations=="" || col.number0=="")){
        return true;
      }else{
        return false;
      }
    },
    //添加樣式
    addClass(obj,className){
      if(!obj.className){
        obj.className = className
      }else{
        //存在
        if(obj.className.indexOf(className)!=-1){
          obj.className = obj.className;
        }else{
          //不存在
          let newClassName = obj.className;
          newClassName+=" ";
          newClassName+=className;
          obj.className = newClassName;
        }
      }
    },
    //刪除樣式
    removeClass(obj,className){
      if(obj.className.indexOf(className)!=-1){
        let classArr = obj.className.split(" ");
        for(let k2=0;k2<classArr.length;k2++){
          if(classArr[k2].indexOf(className)!=-1){
            classArr.splice(k2,1)
            //再將classArr轉換成字符串
            let classAll = classArr.join(" ");
            obj.className=classAll;
          }
        }
        }
    },
    //實時獲取select的選擇
    getChangeSelects(){
      var newJmodel=[];   //每一個的label和value
      var newJmodels=[];  //jModels
      var newjLocation=[];
      var newjLocations=[];
      var newkLocation=[];
      var newkLocations=[];
      for(let i in this.oldBasicInfo1){
        if(newJmodel.indexOf(this.oldBasicInfo1[i].jModel)==-1){
          newJmodel.push(this.oldBasicInfo1[i].jModel)
          if(this.oldBasicInfo1[i].jModel==""){}else{
            newJmodels.push({"label":newJmodel[i],"value":newJmodel[i]})
          }
        }
        if(newjLocation.indexOf(this.oldBasicInfo1[i].jLocation)==-1){
          newjLocation.push(this.oldBasicInfo1[i].jLocation)
          if(this.oldBasicInfo1[i].jLocation==""){}else{
          newjLocations.push({"label":newjLocation[i],"value":newjLocation[i]})
          }
        }
        if(newkLocation.indexOf(this.oldBasicInfo1[i].kLocation)==-1){
          newkLocation.push(this.oldBasicInfo1[i].kLocation)
          if(this.oldBasicInfo1[i].kLocation==""){}else{
          newkLocations.push({"label":newkLocation[i],"value":newkLocation[i]})
          }
        }
      }
        this.jModels = newJmodels;
        this.jLocations = newjLocations;
        this.kLocations = newkLocations;
    },
    //改變之後在那一行左邊添加的綠色border標識
    changeInput(No,changeValue){
      var editBorderDiv = document.getElementById("td"+No);
      this.addClass(editBorderDiv,'editBorder');
      var currentCell = document.getElementsByName("number0-"+No)
      this.addClass(currentCell[0],'changeBg')
    },
    //添加之後需要將首行添加虛線dashClass，加上綠色背景顏色，若再次添加，則需要移除上一次的樣式並添加本次樣式
    getClass(){
      let Name = "td"+this.oldBasicInfo1.length;
      let preName = "td"+(this.oldBasicInfo1.length-1);
      let p2Name = "td"+(this.oldBasicInfo1.length-2);
      let currentTd = document.getElementsByClassName(Name);
      let currentId = document.getElementById(Name);
      let preTd = document.getElementsByClassName(preName);
      let pre2Td = document.getElementsByClassName(p2Name);
      let oper = document.getElementsByName("operate")
      for(let i=0;i<currentTd.length;i++){
        this.addClass(currentTd[i],'dashClass');
        this.removeClass(currentTd[i],'bgWhite');
        this.addClass(currentTd[i],'changeBg');
      }
      for(let j=0;j<oper.length;j++){
        this.removeClass(oper[j],'changeBg')
      }
      //移除序號的背景顏色
      this.removeClass(currentId,'changeBg');
      //添加是要爲上一行的元素加上border-top
      for(let k=0;k<preTd.length;k++){
        this.removeClass(preTd[k],'dashClass');
        this.removeClass(preTd[k],'changeBg');
      }
      //爲所有的td1加上border-bottom
    },
    //降序排序table
    sortTable(){
      for(let i=0;i<this.oldBasicInfo1.length;i++){
        for(let j=i+1;j<this.oldBasicInfo1.length;j++){
          if(this.oldBasicInfo1[j].No>this.oldBasicInfo1[i].No){
            let temp = this.oldBasicInfo1[i];
            this.oldBasicInfo1[i]= this.oldBasicInfo1[j];
            this.oldBasicInfo1[j] = temp;
          }
        }
      }
      return this.oldBasicInfo1;
    },
    //打開時清除其他的br-tn樣式，並在最前面一行加上br-tn樣式
    opened(){
      this.addRows=[];
      var removeDiv = document.getElementsByClassName("td"+this.oldBasicInfo1.length);
      var thDiv = document.getElementsByTagName('th');
      var brTn = document.getElementsByClassName("br-tn");
      var oper = document.getElementsByName("operate");
      for(let k=0;k<oper.length;k++){
        this.addClass(oper[k],'br-r')
      }
      for(let i=0;brTn.length!=0;){
          this.removeClass(brTn[i],'br-tn')
      }
      for(let j=0;j<removeDiv.length;j++){
        for(let j2=0;j2<thDiv.length;j2++){
          if(removeDiv[j].className.indexOf("inputClass")!=-1 && thDiv[j2].className.indexOf("br-b")!=-1){
          this.addClass(removeDiv[j],'br-tn')
          }
        }
      }
      this.validateFlag = false;
      this.getChangeSelects();
    },
    submitTable(){
      this.validateFlag = false;
      this.validate();
      //非空驗證通過，axios提交之後關閉
      if(this.validateFlag){
        //TODO axios提交數據
        this.closeTable();
      }
    },
    validate(){
      var validateArr=[];
      for(let i in this.$refs){
        if(this.$refs[i].length!=0){
          if(this.$refs[i][0].value==""){
            //從最後一個開始，所以unshift
          validateArr.unshift(this.$refs[i][0]);
          this.focusArr(validateArr)
          }
        }
      }
      if(validateArr.length==0){
        this.validateFlag = true;
      }
    },
    focusArr(validateArr){
      for(let i in  validateArr){
        validateArr[i].focus();
      }
    },
    closeTable(){
      this.dialogTableVisible = false;
      this.$emit("close",this.dialogTableVisible);
      //清空樣式
      var removeDiv = document.getElementsByClassName("td"+this.oldBasicInfo1.length);
      for(let k=0;k<removeDiv.length;k++){
        this.removeClass(removeDiv[k],'dashClass');
        this.removeClass(removeDiv[k],'changeBg');
        this.removeClass(removeDiv[k],'editBorder');
      }
      for(let i=0;i<this.oldBasicInfo1.length;i++){
        var addDiv = document.getElementById("td"+i);
        if(addDiv){
          this.removeClass(addDiv,'editBorder')
        }
      }
      var greenBg = document.getElementsByClassName("changeBg");
      for(let j=0;j<greenBg.length;j++){
        this.removeClass(greenBg[j],'changeBg')
      }
      this.jModelSelect="";
      this.jLocationSelect="";
      this.kLocationSelect="";
    },
    cancel(){
      //取消則將數據還原爲打開時的數據(目前只能將添加的數據刪除)
      if(this.addRows.length!=0){
        for(let i=0;i<this.addRows.length;i++){
          //獲取addRow在oldBasicInfo1裡面的index，然後刪除
          for(let j=0;j<this.oldBasicInfo1.length;j++){
            if(this.addRows[i].No== this.oldBasicInfo1[j].No){
              this.oldBasicInfo1.splice(j,1)
            }
          }
        }
      }
      this.closeTable();
    },
    //添加係數
    addNumber(){
      this.validateFlag = false;
      this.validate();
      if(this.validateFlag){
      //TODO 檢查上一個是否已經確定修改了，確定修改了之後才能修改一個新的係數
      this.currentNum = this.oldBasicInfo1.length+1;
      let row = {
        No:this.currentNum,
        jModel:"",
        jLocation:"",
        kLocation:"",
        number0:"",
      }
      this.addRows.unshift(row)
      // this.basicRowInfo.unshift(row);  oldBasicInfo1是假數據，如果確定再將oldBasic賦值給真數據
      this.oldBasicInfo1.unshift(row);
      this.addFlag +=1;
      let thDiv = document.getElementsByTagName('th')
      for(let i=0;i<thDiv.length;i++){
        this.addClass(thDiv[i],'br-b')
      }
      var preDiv = document.getElementsByName("td"+this.oldBasicInfo1[1].number0);
      var brTn = document.getElementsByClassName("br-tn");
      for(let i=0;brTn.length!=0;){
          this.removeClass(brTn[i],'br-tn')
      }
      //再次添加係數的時候，前一個係數的背景顏色變成白色
      if(preDiv){
        for(let i in preDiv){
          if(preDiv[i].className.indexOf('bgWhite')!=-1){
            this.addClass(preDiv[i],'bgWhite')
          }
        }
      }
      }
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
    background: rgb(255, 255, 255,0.1);
    color: #666666;
    border: 1px solid rgba(204,204,204,1) !important;
    border-bottom: none !important;
    border-right: none !important;
  }
  .br-tn{
    border-top: none !important;
  }
  .br-b{
    border-bottom: 1px solid rgba(204,204,204,1) !important;
  }
  .br-bn{
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
  }
  .changeBg{
    background: #E4EBD4 !important;
  }
  .change{
    background: #E4EBD4
  }
  .tableClass{
    width: 750px;
    margin: 0px;
    padding: 0px;
    background: rgba(247,248,250,1);
    /* border-right: 1px solid rgba(204,204,204,1) !important; */
  }
  td{
    padding: 0px;
    margin: 0px;
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
  .td{
    margin-right: 0px !important;
    padding-right: 0px !important;
  }
  .br-r{
    border-right: 1px solid rgba(204,204,204,1) !important;
  }
  .bgWhite{
    background: white
  }
</style>