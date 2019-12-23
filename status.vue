<template>
  <div>
    <el-table center :cell-style="cellStyle" :header-cell-style="headerCellStyle" :span-method="objectSpanMethod" :data="filterData" max-height="800" border  
    row-key="id" :tree-props="{children: 'children',hasChildren:''}" @filter-change="filterChange" >
      <el-table-column prop="name" align="center" width="100"></el-table-column>
        <el-table-column label="位" prop="child1" width="190" align="center" :formatter="formatterChild1"></el-table-column>
        <el-table-column label="置" prop="child2" width="190" align="center" :formatter="formatterChild2"></el-table-column>
        <el-table-column label="編" prop="child3" width="190" align="center">
           <template slot-scope="scope">
            <span v-if="scope.row.hasChildren">{{scope.row.cheetahNo}}</span>
            <span v-else>
              <span v-if="scope.row.child3">{{scope.row.child3}}</span>
              <span v-else>{{text}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="號" prop="child4" width="190" align="center" column-key="cheetahNo" :formatter="formatterChild4" :filters="cheetahNoSelect" :filter-multiple="false"></el-table-column>
        <el-table-column label="狀態" prop="child5" align="center" column-key="cheetahTypeVal" :filters="statusSelect"  :filter-multiple="false">
          <template slot-scope="scope">
            <span v-if="scope.row.hasChildren">{{scope.row.cheetahTypeVal}}</span>
            <span v-else>
              <span v-if="scope.row.child5">{{scope.row.child5}}</span>
              <span v-else>{{text}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="更新" prop="child6" align="center" >
           <template slot-scope="scope">
            <span v-if="scope.row.hasChildren">{{scope.row.updatatime}}</span>
            <span v-else>
              <span v-if="scope.row.child6">{{scope.row.child6}}</span>
              <span v-else>{{text}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="時間" prop="child7" :formatter="formatterChild7" align="center" ></el-table-column>
        <el-table-column label="庫存" prop="handleSize" align="center" >
          <template slot-scope="scope">
             <span v-if="scope.row.hasChildren">{{scope.row.handleSize}}</span>
            <span v-else>
              <span v-if="scope.row.child8">{{scope.row.child8}}</span>
                <span v-else>{{text}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操" prop="child9"  align="center" >
           <template slot-scope="scope">
            <el-button v-if="scope.row.hasChildren" type="primary" @click="clickBtn(scope.row)">補刀</el-button>
            <span v-else>
              <span v-if="scope.row.child9">{{scope.row.child9}}</span>
              <span v-else>{{text}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="作" prop="child10" :formatter="formatterChild10" align="center" ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import {queryCheetahInfoByDTO,replenishToolByCheetah} from "../../apis/Knife/status";
import {parseDatetime, random} from "../../plugins/utils"
import axios from "axios"
import { filter } from 'minimatch';
export default {
  data(){
    return{
      allData:[],
      statusSelect:[],
      cheetahNoSelect:[],
      child:[],
      No:"",
      status:"",
      filterData:[],
      keys:[],
      objs:[],
      text:"-",
      redStyleArr:[],
      redStyleArr2:[],
      allChild:[],
      allNo:[], //所有編號
      allType:[],  //所有型號
     
    }
  },
  mounted(){
    this.checkAuth().then(()=>this.init())
  },
  watch:{
    
  },
  methods:{
    init(){
      this.allChild=[];
      queryCheetahInfoByDTO.params.punit = this.$store.state.userinfo.punit;
      queryCheetahInfoByDTO.params.factoryNo = this.$store.state.userinfo.factoryno;
      axios(queryCheetahInfoByDTO).then(data=>{
        this.allData = data;
        this.filterData=[...this.allData]
        this.addChildTitle(this.allData);
        this.getStatusSelect(data,"cheetahTypeVal",this.statusSelect);
        this.getStatusSelect(data,"cheetahNo",this.cheetahNoSelect);
        
        })
    },
    //增加每一欄的編號和型號，3組
    addChildTitle(data){
      var noArr=[];
      var typeArr=[];
      for(let i=0;i<data.length;i++){
        data[i].id = Math.random().toString(32).slice(2,10);
        let arr = [{name:"編號"},{name:"型號"},{name:"編號"},{name:"型號"},{name:"編號"},{name:"型號"}]
        for(let j of arr){
          j.id = Math.random().toString(32).slice(2,10);
        }
        data[i].children = arr;
        data[i].hasChildren = true;
        //將handlesDTOs加入arr中
        for(var k=0;k<data[i].handlesDTOs.length;k++){
          noArr.push(data[i].handlesDTOs[k].handleno)
          typeArr.push(data[i].handlesDTOs[k].handleType)
         
        }
        this.allNo[i] = noArr
        this.allType[i] = typeArr
        noArr=[];
        typeArr=[];
      }
      // allNo爲0，2,4；allType爲1,3,5
      this.getAllChild(this.allNo,this.allType)
    },
  
   getAllChild(data,typeData){
     for(let i=0;i<data.length;i++){
         for(let c=0;c<=9;c++){
           for(let r=0;r<=5;r++){
             let x = (r-(Math.floor((r+1)/2)))*10+c;
             let key ="child"+(c+1);  //1-10
               if(r%2==0){
                 this.allData[i].children[r][key] = data[i][x]
               }
           }
         }
     }
      for(let i=0;i<typeData.length;i++){
       for(let j=0;j<typeData[i].length;j++){
         let row = Math.floor(j/10);  //0-5行
         let col = j%10;  //0-9列
         for(let c=0;c<=col;c++){
           for(let r=0;r<=5;r++){
             let x = (r-(Math.floor((r+1)/2)))*10+c;
             let key ="child"+(c+1);  //1-10
               if(r%2!=0){
                 this.allData[i].children[r][key] = typeData[i][x]
               }
           }
         }
       }
     }
   },
    //獲取所有狀態
    getStatusSelect(data,key,selects){
      var statusArr=[];
      data.forEach(item => {
        let itemStatus = item[key];
        if(!statusArr.includes(itemStatus)){
          statusArr.push(itemStatus);
          let statusObj = {text:itemStatus,value:itemStatus}
          selects.push(statusObj)
        };
      });
      
    },
    //獲取filter的key和value
    getFilterKeysAndObjs(filters){
      let key = Object.keys(filters)[0];
      let value = filters[key][0];
      if(!this.keys.includes(key)){
        this.keys.push(key);
        let obj = {key:key,value:value}
        this.objs.push(obj);
      }
      //替換原來有key的value,併//去掉爲空的key和value
      else{
        for(let i=0;i<this.objs.length;i++){
          if(this.objs[i].key == key && this.objs[i].value!=value){
            this.objs[i].value = value;
          }
          if((value==""|| value==undefined) && key == this.objs[i].key){
            //就將objs的該值和keys的該值去掉
            this.keys.splice(i,1);
            this.objs.splice(i,1);
            i--;
          }
        }
      }
    },
    //獲取filter的table的數據
    filterChange(filters){
      this.filterData = [...this.allData];
      this.getFilterKeysAndObjs(filters);
      if(this.objs.length<=0){this.filterData = [...this.allData]}
      else{
        this.filterData=[...this.allData];
        for(let i=0;i<this.objs.length;i++){
          let key = this.objs[i].key;
          let value = this.objs[i].value;
          this.filterData = this.filterData.filter(item=>{return item[key]==value})
        }
      }
    },
    updatatimeFormatter(row, column){
      if(!row.updatatime){return "-"}
      else{
        return parseDatetime(row.updatatime)
      }
    },
    
    
    clickBtn(row){
      // replenishToolByCheetah.params.factoryNo = this.$store.state.userinfo.factoryno;
      // replenishToolByCheetah.params.punit = this.$store.state.userinfo.punit;
      replenishToolByCheetah.params.cheetahNo = row.cheetahNo;
      axios(replenishToolByCheetah).then(()=>{
        this.openComfirm("補刀成功");
        this.init();
      }).catch(error=>{
        this.openComfirm("補刀失敗,"+error)
      })
    },
    //爲空時將添加"-"字符
    formatterChild1(row){
      if(!row.child1){return "-"}
      else{return row.child1}
    },
    formatterChild2(row){
      if(!row.child2){return "-"}
      else{return row.child2}
    },
    formatterChild4(row){
      if(!row.child4){return "-"}
      else{return row.child4}
    },
    formatterChild7(row){
      if(!row.child7){return "-"}
      else{return row.child7}
    },
    formatterChild10(row){
      if(!row.child10){return "-"}
      else{return row.child10}
    },
    openComfirm(title){
      this.$alert(title, {
      confirmButtonText: '确定',
      });
    },
    getChildRed(row, column, rowIndex, columnIndex){
      for(let i=0;i<this.allData.length;i++){
        if(this.allData[i].handlesDTOs){
          for(let j=0;j<this.allData[i].handlesDTOs.length;j++){
            if((this.allData[i].handlesDTOs[j].handleno&&!this.allData[i].handlesDTOs[j].handleType)||(!this.allData[i].handlesDTOs[j].handleno&&this.allData[i].handlesDTOs[j].handleType)){
              let colF =(j%10)+1;
              let rowF = (Math.ceil((j+1)/10))*2+(i*7);
              let rowF2 = (Math.ceil((j+1)/10))*2+(i*7)-1;
              if(columnIndex==colF&&(rowIndex==rowF||rowIndex==rowF2)){
                return 'color:#D93232'
              }

          }
        }
      }
      }
    },
    cellStyle({row, column, rowIndex, columnIndex}){
      //設置紅色字體
      return this.getChildRed(row, column, rowIndex, columnIndex);
      //  //設置紅色字體  結束
      //  //設置行顏色
       if(rowIndex%7==0){return 'background:#F7F8FA'}
        //設置行顏色  結束
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }){
      let l = [1,3,6,9];
      for(let i of l){
        if(rowIndex==0&&(columnIndex==i)){return  {color:'',borderRight:'0px',textAlign:'right'} } //隱藏
        if(rowIndex==0&&(columnIndex==i+1)){return {textAlign:'left'}} 
      }
    },
    //合併單元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }){
      if(row.handlesDTOs){
          let colNeedSpan = [1,3,6,9];  //需要合併的列數 +1爲需要爲0的列數
          for(let i=0;i<colNeedSpan.length;i++){
            if(columnIndex==colNeedSpan[i]&&(rowIndex%7==0)){
              return{
                rowspan:1,
                colspan:2
              }
            }
            if(columnIndex==colNeedSpan[i]+1&&(rowIndex%7==0)){
              return{
                rowspan:0,
                colspan:0
              }
            }
          } 
      }
      else{
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    },
  
    
  }
}
</script>
<style scoped>
  .red{
    color:red
  }
</style>
