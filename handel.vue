<template>
  <div>
    <div>
      <img src="../../assets/images/edit.png" class="mr-1" style="height:1.5rem">
      <span style="font-size:1.2rem">未取刀工單</span>
      <el-table :data="noSendhandelList" class="mt-2" :max-height="tableHeight">
        <el-table-column prop="orderNumber" label="工單號" align="center" width="180px;"></el-table-column>
        <el-table-column prop="person" label="領用人" align="center"></el-table-column>
        <el-table-column prop="model" label="機種" align="center"></el-table-column>
        <el-table-column prop="cPosition" label="夾位" align="center"></el-table-column>
        <el-table-column prop="fNo" label="設備編號" align="center"></el-table-column>
        <el-table-column prop="sLocation" label="刀位" align="center"></el-table-column>
        <el-table-column prop="type1" label="刀柄類型" align="center"></el-table-column>
        <el-table-column prop="type2" label="刀具類型" align="center"></el-table-column>
        <el-table-column prop="length" label="伸出長度" align="center"></el-table-column>
        <el-table-column prop="sendStatus" label="發放狀態" align="center" v-if="hidden"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
        <el-button @click.native.prevent="sendRow(scope.$index, noSendhandelList)" class="sendBtn">
          發放
        </el-button>
      </template>
    </el-table-column>
      </el-table>
    </div>
      <div class="mt-2">
      <img src="../../assets/images/edit.png" class="mr-1" style="height:1.5rem">
      <span style="font-size:1.2rem">已发放工單</span>
      <el-table :data="sendhandelList" class="mt-2" :max-height="tableHeight">
        <el-table-column prop="orderNumber" label="工單號" align="center" width="180px;"></el-table-column>
        <el-table-column prop="person" label="領用人" align="center"></el-table-column>
        <el-table-column prop="model" label="機種" align="center"></el-table-column>
        <el-table-column prop="cPosition" label="夾位" align="center"></el-table-column>
        <el-table-column prop="fNo" label="設備編號" align="center"></el-table-column>
        <el-table-column prop="sLocation" label="刀位" align="center"></el-table-column>
        <el-table-column prop="type1" label="刀柄類型" align="center"></el-table-column>
        <el-table-column prop="type2" label="刀具類型" align="center"></el-table-column>
        <el-table-column prop="length" label="伸出長度" align="center"></el-table-column>
        <el-table-column prop="sendStatus" label="發放狀態" align="center" v-if="hidden"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {getHandelInfo} from "../../apis/api"
export default {
  data(){
    return{
      handelList:[],
      noSendhandelList:[],
      sendhandelList:[],
      hidden:false,
      flag:true,
      tableHeight:400,
    }
  },
  mounted(){
    getHandelInfo().then(res=>{
      this.handelList = res;
      this.getHandelList();
      this.getChange();
    });
  },
  watch:{
    flag:function(){
      const interval = 6000;
      setTimeout(this.getChange,interval);
      setTimeout(this.getHandelList,interval);
    }
  },
  methods:{
    getChange(){
      if(this.flag){
        this.flag = false;
      }else{
        this.flag = true;
      }
    },
    getHandelList(){
      this.noSendhandelList=[];
      this.sendhandelList=[];
      for(let i in this.handelList){
        if(this.handelList[i].sendStatus==0){
          this.noSendhandelList.push(this.handelList[i]);
        }else if(this.handelList[i].sendStatus==1){
          this.sendhandelList.push(this.handelList[i]);
        }
      }
      console.log(666,this.noSendhandelList);
      console.log(777,this.sendhandelList)
    },
    /*TODO api接口操作後台數據*/
    sendRow(rowIndex,noSendList){
      this.noSendhandelList.splice(rowIndex,1);
      this.sendhandelList.unshift(noSendList[rowIndex])
    }
  },
  components:{
  }
}
</script>
<style lang="css" scoped>
  .img-brand{
    height: 1.5rem;
    display: block;

  }
  .mr-1{
    margin-right: 1rem;
  }
  .mt-2{
    margin-top: 2rem
  }
  .sendBtn{
    background:linear-gradient(90deg,#55bdf2,#4a65f2);
    color: white
  }
</style>