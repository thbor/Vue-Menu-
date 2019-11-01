<template>
    <div class="errorBorder">
        <div class="errorNumber"><h1 >404</h1></div>
        <div class="errorMessage">
            <h3>
            Sorry but we couldn't find this page
            </h3>
            <h3>
            This page you are looking for does not exist Report this?
            </h3>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{}
    }
}
</script>
<style >
    html{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .errorBorder{
        /* align-items: center;
        justify-content: center; */
        margin: 0px;
        padding: 0px;
        color: #73879C;
        
        height: 100%;

    }
    .errorNumber{
        font-size: 60px;
        line-height: 90px;
        margin: 20px 0;
        text-align: center;

    }
    .errorMessage{
        font-size: 25px;
        line-height: 90px;
        margin: 20px 0;
        text-align: center;
    }
   

</style>