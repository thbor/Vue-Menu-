<template>
  <div>
    <div class="table1">
      <img class="float-left mr-1" src="../../assets/images/edit.png">
      <span style="font-size:1.2rem" >CNC壽命實時監控</span>
      <el-table :data="dashList" max-height="400" style="width: 100%;" header-align="center" class="mt-2" :row-style="rowStyle" :default-sort = "{prop: 'rTime', order: 'Ascending'}">
          <el-table-column prop="model" label="機種" align="center"></el-table-column>
          <el-table-column prop="cPosition" label="夾位" align="center"></el-table-column>
          <el-table-column prop="fLocation" label="設備位置" align="center"></el-table-column>
          <el-table-column prop="fNo" label="設備編號" align="center"></el-table-column>
          <el-table-column prop="sLocation" label="刀位" align="center"></el-table-column>
          <el-table-column prop="currentLife" label="當前壽命" align="center"></el-table-column>
          <el-table-column prop="totalLife" label="額定壽命" align="center"></el-table-column>
          <el-table-column prop="CT" label="CT" align="center"></el-table-column>
          <el-table-column prop="rTime" label="剩餘時間" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="更新時間" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="table2 mt-2">
      <img class="float-left mr-1" src="../../assets/images/edit.png">
      <span style="font-size:1.2rem">人工領刀提醒表</span>
      <el-table class="table2 mt-2" :data="knifeRemindList" style="width: 100%;" header-align="center" max-height="400">
        <el-table-column prop="orderNumber" label="工單號" align="center" width="180px;"></el-table-column>
        <el-table-column prop="person" label="領用人" align="center"></el-table-column>
        <el-table-column prop="model" label="機種" align="center"></el-table-column>
        <el-table-column prop="cPosition" label="夾位" align="center"></el-table-column>
        <el-table-column prop="fNo" label="設備編號" align="center"></el-table-column>
        <el-table-column prop="sLocation" label="刀位" align="center"></el-table-column>
        <el-table-column prop="type1" label="刀柄類型" align="center"></el-table-column>
        <el-table-column prop="type2" label="刀具類型" align="center"></el-table-column>
        <el-table-column prop="length" label="伸出長度" align="center"></el-table-column>
        <el-table-column prop="prepare" label="備刀" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {getDashInfo,getKnifeRemindInfo} from "../../apis/api"
export default {
  data(){
    return{
      dashList:[],
      knifeRemindList:[],
      flag:true,
    }
  },
  mounted(){
    this.getTableList();
    this.changeFlag();
  },
  watch:{
    flag:function(){
      setTimeout(this.changeFlag,6000)
      setTimeout(this.getTableList,6000)
      // console.log(this.flag)
    }
  },
  methods:{
    rowStyle({ row}){
      if(row.rTime<=0){
        return 'background:rgb(106, 42, 28);color:white;'
      }
    },
    getDashTable(){
        getDashInfo().then(res=>{
        this.dashList = res;
        console.log(111,this.dashList);
    })
    },
    getKnifeRemindTable(){
      getKnifeRemindInfo().then(res=>{
      this.knifeRemindList = res;
      console.log(222,this.knifeRemindList);
    })
    },
    getTableList(){
      this.getDashTable();
      this.getKnifeRemindTable();
    },
    /*定時6s改變i的值，每次i的值發生改變後，就調用獲取數據的方法*/
    changeFlag(){
      if(this.flag){
        this.flag=false;
      }else{
        this.flag=true;
      }
    }
  },
}
</script>
<style lang="css">
  .mr-1 {
    margin-right: 1rem;
  }
  .float-left {
    float: left;
  }
  .mt-2{
    margin-top:2rem;
  }
  .table1 img{
    height: 1.5rem;
  }
  .table2 img{
    height: 1.5rem;
  }
  .table1 .el-table--enable-row-hover .el-table__body tr:hover > td{
    color:#666666 !important;
  }

</style>
