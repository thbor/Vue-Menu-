<template>
    <div>
        <el-form :model="formInfo" >
        <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="formInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="formInfo.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input v-model="formInfo.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="formInfo.birth" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
    </el-date-picker>
        <!-- <el-input v-model="formInfo.birth" autocomplete="off"></el-input> -->
       
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="formInfo.address" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    
   
    </div>
</template>
<script>
export default {
    //props声明接受属性，这个属性就会成为组件对象的属性
   // props: ['formInfo'],  //只制定属性名
    props:{
        formInfo:Object
    },
    data(){
        return{
           formLabelWidth: '60px',
           
        }
    },
    mounted(){
        
    }
}
</script>
<style>
    .dialog-footer{
        text-align: center;
    }
</style>