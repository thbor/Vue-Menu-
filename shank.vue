<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <!-- <template slot="header">
        <el-dropdown  @command="handleCommand2">
          <span>
            刀柄編號<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in filterStatus"
              :key="item.id" :command="item.text">
              {{item.text}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template> -->
          <img class="float-left mr-1" src="../../assets/images/edit.png">
          <span style="font-size:1.2rem" >刀柄信息</span>
        </div>
        <div class="mt-2">
          <span class="ml-1" style="font-size:1.2rem">
            數量：
            <span class="text-danger">{{count}}</span>
          </span>
        </div>
      </el-header>
      <el-main>
        <el-table :data="shankList" style="width: 100%;" class="mt-3"  header-align="center"  @filter-change="filterChange" ref="filterShank">
        <el-table-column prop="sNo" label="刀柄編號" align="center"></el-table-column>
        <el-table-column prop="sType" label="刀柄類型"  align="center"></el-table-column>
        <el-table-column prop="sStatus" :formatter = "statusFormat" :label="statusName" align="center"
          :filter-multiple="false"
          :filters="filterStatus"
          column-key="this.status"
          :filter-method="filterMethod"
        >
        </el-table-column>
        <el-table-column prop="sCode" label="設備編碼" align="center"></el-table-column>
        </el-table>
        <Page :totalCount="count" @handleCurrentChangeSub="handleCurrentChange" @handleCurrentSizeSub="handleCurrentSize" style="text-align:center;margin-top:4rem;"></Page>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import {getShankInfo} from "../../apis/api";
import Page from "../../components/data/Page"
export default {
  data(){
    return{
      count:0,
      shankList:[],
      shankStatus:[],
      sStatus:"",
      currentPage:1,
      filterStatus:[
        { id: 'b', text: '已綁定', value: 1 },
        { id: 'c', text: '已領取', value: 2 },
        { id: 'd', text: '已裝機', value: 3 },
        { id: 'e', text: '已拆除', value: 4 },
        { id: 'f', text: '領取中', value: 5 }],
      statusName:"刀柄狀態(全部)",
      status:"",
    }
  },
  mounted(){
    getShankInfo().then(res=>{
      this.shankList = res;
      this.count = this.shankList.length;
    })
  },
  methods:{
    getCount(val){
      this.count=0;
      for(let i in this.shankList){
        if(this.shankList[i].sStatus == val["this.status"][0]){
          this.count++;
        }
      }
    },
    handleCurrentChange(page){
      console.log("當前頁:"+page)
    },
    handleCurrentSize(size){
      console.log(5565645,size)
    },
    statusFormat(row){
      if(row.sStatus!==0){
        for(let i in this.filterStatus){
          if(row.sStatus === this.filterStatus[i].value){
            return this.filterStatus[i].text;
          }
      }
      }else{
        return "全部"
      }
    },
    getStatus(val){
      switch(val){
        case 1:this.status ='1';this.statusName = "刀柄狀態(已綁定)"; break;
        case 2:this.status ='2';this.statusName = "刀柄狀態(已領取)"; break;
        case 3:this.status ='3';this.statusName = "刀柄狀態(已裝機)"; break;
        case 4:this.status ='4';this.statusName = "刀柄狀態(已拆除)"; break;
        case 5:this.status ='5';this.statusName = "刀柄狀態(領取中)"; break;
      }
    },
    filterChange(val){
      if(val["this.status"].length==0){
        this.status ='0';
        this.statusName = "刀柄狀態(全部)";
        this.count = this.shankList.length;
      }else{
        this.getCount(val)
      }
    },
    filterMethod(value, row ){
      this.getStatus(value)
      // this.getCount(value,row)
      if(row.sStatus == this.status){
        return row;
      }
    },
  },
  components:{
    Page,
  }
}
</script>
<style lang="css" scoped>
  body {
    font-size: 1.2rem;
}
  .mr-1 {
    margin-right: 1rem;
  }
  .float-left {
    float: left;
  }
  .mt-2{
    margin-top:2rem!important;
  }
  .mt-3{
    margin-top:3rem!important;
  }
  .text-danger{
    color: red;
  }
  .ml-1 {
    margin-left: 1rem;
  }
  .el-table-filter__list{
    text-align:center ;
    min-width: 180px !important;
  }
  .el-table-filter__list-item{
    text-align:center ;
    min-width: 180px !important;
  }
</style>