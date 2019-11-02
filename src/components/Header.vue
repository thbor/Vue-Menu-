<template>
    <div>
        <el-tag id="elTag" v-for="tag in dynamicTags" :key="tag" closable @close="handleClose(tag)" @click="handleClick(tag)">{{tag}}</el-tag>
    </div>
</template>
<script>
export default {
    
    data(){
        return{
         dynamicTags:[],

        }
    },
    methods:{
         handleClose(tag) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        handleClick(tag){
          console.log("点击了"+tag);
        //   var str = '1';
        //   str += '<div>'+str+'</div>'
        //   document.getElementById('elTag').innerHTML=str;
          // this.showClickTagCss = true;
        },
    },
    mounted(){
         const test = JSON.parse(sessionStorage.getItem('menuTag'));
         console.log(4343434,test[test.length-1].name)
         this.dynamicTags.push(test[test.length-1].name);
         console.log("=========")
         console.log(this.dynamicTags)
         console.log("=========")

    }
}
</script>
<style>

</style>