<template>
 
<div>
<el-tag v-for="tag in sendMenu" :key="tag.name" closable @close="handleClose(tag)" @click="clickTag(tag)" >
  <!-- <span v-bind:class="{active1:tag.name==faceValue}">{{tag.name}}</span> -->
  {{tag.name}}
  
</el-tag>
                                                         

    </div>
</template>
<script>
export default {
    props:['sendMenu'],
    data(){
        return{
          clickClass:"",
          isClick:false,
          faceValue:''
        }
    },
    methods:{
        handleClose(tag){
          console.log(787878,this.sendMenu)
           this.sendMenu.splice(this.sendMenu.indexOf(tag), 1);
        },
        clickTag(tag){
          console.log(111,tag)
          //去重，避免当前页面重复点击
          if(tag.href.indexOf(this.$router.history.current.path)==-1){
            this.$router.push(tag.href);
          }
          this.faceValue = tag.name;
          //点击标签也会打开左边的菜单栏
           
        },
     
       
    },
    components:{
    },
    mounted(){
    }
}

</script>
<style>
    
    /* .active1{
      color:  blue;
          } */
          
</style>