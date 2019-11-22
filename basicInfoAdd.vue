<template>
  <div>
    <el-dialog title="編輯設備" :visible.sync="dialogFormVisible" @close="close" @open="open" width="600px" center>
    <el-form :model="form" ref="form" status-icon :rules="rules">
      <el-row>
        <el-col :span="14"><label>品&nbsp;牌&nbsp;：&nbsp;</label><el-form-item prop="brand"><el-input prop="brand" v-model="form.brand" autocomplete="off" ></el-input></el-form-item></el-col>
        <el-col :span="10"><label>廠&nbsp;區：</label> <el-form-item prop="cLocation"><el-input v-model="form.cLocation" autocomplete="off"></el-input></el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="14"><label>位&nbsp;&nbsp;置：</label><el-form-item prop="location"><el-input v-model="form.location" autocomplete="off"></el-input></el-form-item></el-col>
        <el-col :span="10"><label>產&nbsp;品&nbsp;處：</label><el-form-item prop="pLocation"><el-input v-model="form.pLocation" autocomplete="off"></el-input></el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="14"><label>設備編號：</label><el-form-item prop="fNo"><el-input v-model="form.fNo" autocomplete="off"></el-input></el-form-item></el-col>
        <el-col :span="10"><label>管制編號：</label><el-form-item prop="mNo"><el-input v-model="form.mNo" autocomplete="off"></el-input></el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="14"><label>設備評級：</label><el-form-item prop="rank"><el-input v-model="form.rank" autocomplete="off"></el-input></el-form-item></el-col>
        <el-col :span="10"><label>費用代碼：</label><el-form-item prop="code"><el-input v-model="form.code" autocomplete="off"></el-input></el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="14"><label >設備名稱：</label><el-form-item prop="name"><el-input v-model="form.name" autocomplete="off" ></el-input></el-form-item></el-col>
        <el-col :span="10"><label>規格型號：</label><el-form-item prop="model"><el-input v-model="form.model" autocomplete="off"></el-input></el-form-item></el-col>
      </el-row>
      <el-row>
        <el-col :span="14"><label>使用狀態：</label>
        <el-form-item prop="status">
          <el-select v-model="form.status" clearable placeholder="请选择">
          <el-option
            v-for="item in stausOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="10"><label>生產日期：</label><el-form-item prop="birth"><el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker></el-form-item></el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save('form')">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import "../../../views/factorytool/basicInfo"
export default {
  props:{
    ifVisible:Boolean,
    formInfo:Object,
    updateFlag:Number
  },
  data(){
    return{
      form:{
        name:'',
        model:'',
        brand:'',
        mNo:'',
        fNo:'',
        cLocation:'',
        pLocation:'',
        code:'',
        location:'',
        birth:'',
        status:'',
        rank:'',
      },
      stausOption:[{"value":"1","label":"使用中"},{"value":"0","label":"未使用"}],
      rules:{
        name:[ {required:true,message:"请输入設備名稱"}],
        model:[ {required:true,message:"请输入規格型號"}],
        brand:[ {required:true,message:"请输入品牌"}],
        mNo:[ {required:true,message:"请输入管制編號"}],
        fNo:[ {required:true,message:"请输入設備編號"}],
        cLocation:[ {required:true,message:"请输入廠區"}],
        pLocation:[ {required:true,message:"请输入產品處"}],
        code:[ {required:true,message:"请输入費用代碼"}],
        location:[ {required:true,message:"请输入位置"}],
        birth:[ {required:true,message:"请输入生產日期"}],
        status:[ {required:true,message:"请输入使用狀態"}],
        rank:[ {required:true,message:"请输入設備評級"}],
      },
      formLabelWidth: '60px',
      dialogFormVisible: false,
      dialogTableVisible: false,
    }
  },
  mounted(){
    this.dialogFormVisible = this.ifVisible;
  },
  watch:{
    form:function(){
    },
    ifVisible:function(){
      this.dialogFormVisible = this.ifVisible;
    },
    formInfo:function(){
      //新增時this.formInfo爲undefined
      if(this.formInfo!=undefined){
        this.form = this.formInfo;
      }else{
        this.form = {};
      }
    }
  },
  methods:{
    statusFormat(){
      for(let i in this.stausOption){
        if(this.stausOption[i].label==this.form.status){
          return this.stausOption[i].value;
        }
      }
    },
    cancel(){
      this.dialogFormVisible = false;
      this.$emit("cancel",this.dialogFormVisible)
    },
    save(formValid){
      this.validateForm(formValid);
    },
    open(){
      if(this.updateFlag!=-1){
        this.form = this.formInfo;
        this.form.status =  this.statusFormat();
      }else{
        console.log(this.$refs['form'])
        this.$refs['form'].resetFields();
        this.form={};
      }
    },
    close(){
      this.dialogFormVisible = false;
      this.$emit("cancel",this.dialogFormVisible)
    },
      validateForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log(789,{formInfo:this.form,ifVisible:this.dialogFormVisible})
            this.$emit("save",{formInfo:this.form,ifVisible:this.dialogFormVisible,updateFlag:this.updateFlag})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>
<style lang="css" scoped>
  .el-input{
    width: 220px !important;
    margin-right:15px;
  }
  .el-form-item{
    margin-bottom: 20px !important;
  }
</style>