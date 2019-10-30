<template>
<!--
    1.静态页面
    2.数据校验 ①自定义校验规则 ②与prop绑定 ③在refs上面验证是否与定义的rules的规则一样
    3.@click.native  在封装好的组件上使用，所以要加上.native才能click
-->
    <div class="loginBorder">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRule">
            <h3 style="text-align: center;">用户登录</h3>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input type="password" v-model="loginForm.passWord"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox><br><br>
            <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" :loading="logining" @click.native.prevent="handleSubmit">登录</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
// import {requestLogin} from '../api/api'
import axios from 'axios' 
export default {
    data(){
        return{
            loginForm:{
                name:'admin',
                passWord:'123',
            },
            //自定义校验规则
            loginRule:{
                name:[ {required:true,message:"请输入用户名"}],
                passWord:[{required:true,message:"请输入密码"}]
            },
            checked:true,
            logining:false  
        }
    },
    methods:{
          handleSubmit() {
        // _this  在一个代码片段里this有可能代表不同的对象,而编码者希望_this代表最初的对象
        // var _this = this;
        this.$refs.loginForm.validate((valid) => {
          console.log(valid)
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.loginForm.name, passWord: this.loginForm.passWord };
             const url = "../data/user.json";
             let ttt = axios.get(url).then(res=>{
              // console.log(res.data);
              return res.data;
            }).catch((error)=>{
              console.log(error)
            })
            ttt.then(data => {
               //验证从解救获取的数据是否与绑定输入的数据一致
              if(data.username===loginParams.username && data.passWord===loginParams.passWord){
                this.logining = true;
                this.$router.push({path:'/table'})
              }else{
                this.logining = false;
                console.log("账号或密码错误")
                this.$message({
                  message: '账号或密码错误',
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
        
    },
    mounted(){
      
    }
}
</script>
<style>
    .loginBorder{
        width:25%;
        margin: 8% auto;
        padding: 35px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
</style>