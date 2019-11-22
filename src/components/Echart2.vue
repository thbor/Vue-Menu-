<template>
    <div>
        echart2
        <div id="echart2"></div>
    </div>
</template>
<script>
import {getTableJson} from '../api/api'
export default {
    data(){
        return{
            //1.获取json数据
            getTableJson2:[],
        }
    },
    mounted(){
        getTableJson().then(res=> {
            this.getTableJson2 = res.data;
        }).catch(error=>window.console.log(error));
       
    }
}
</script>
<style>

</style>