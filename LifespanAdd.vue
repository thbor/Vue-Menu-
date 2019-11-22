<template>
  <div>
    <el-dialog title="添加標準壽命" :visible.sync="formVisible" @close="close" center width="600px">
    <el-form :model="form">
      <el-row>
        <el-col :span="12"><label>刀具名稱：</label> <el-input ref="refName" v-model="form.name" autocomplete="off" class="inputClass"></el-input></el-col>
        <el-col :span="12"><label>刀具規格：</label><el-input ref="refModel" v-model="form.model" autocomplete="off" class="inputClass"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><label>標準壽命：</label><el-input ref="refLife" v-model="form.life" autocomplete="off" class="inputClass"></el-input></el-col>
        <!-- <el-col :span="12"><label>折算係數：</label><el-input ref="refNumber1" v-model="form.number1" autocomplete="off" class="inputClass"></el-input></el-col> -->
      </el-row>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    ifFormVisible:Boolean,
    tableData:Array
  },
  data(){
    return{
      formVisible:false,
      form:{
        name:"",
        model:"",
        life:"",
        number1:null,
      },
      formLabelWidth:"140px",
      validateFlag:false,
      copeTable:[],
    }
  },
  watch:{
    ifFormVisible:function(){
      this.formVisible = this.ifFormVisible;
    },
  },
  mounted(){
    this.formVisible = this.ifFormVisible;
    this.copeTable = this.tableData
  },
  methods:{
    cancel(){
      this.close();
    },
    validate(){
      this.validateFlag = false;
      var validateArr=[];
      for(let i in this.$refs){
        if(this.$refs[i].value=="" || this.$refs[i].value==null){
          validateArr.unshift(this.$refs[i])
        }
      }
      for(let j in validateArr){
        validateArr[j].focus();
      }
      if(validateArr.length==0){
        this.validateFlag = true
      }
    },
    submitForm(){
      this.validate();
      if(this.validateFlag){
        this.copeTable.push(this.form);
        let allNumberInfo = [];
        //aioxs提交  TODO
        // allNumberInfo.push({""})
        // this.copeTable.push({})
        // this.$emit("save",)
        //提交成功後關閉
        this.close();
      }
    },
    close(){
      this.formVisible = false;
      this.$emit("close",this.formVisible);
      this.form={};
    },
  }
}
</script>
<style scoped>
  .inputClass{
    width:200px
  }
</style>