<template>
    <div>
        {{msg}}
        {{$store.state.count}}
        <button @click="test">+</button>
        <button @click="$store.commit('reduce')">-</button>
    </div>
</template>
<script>


export default {
    data(){
        return{
            msg:'vuex测试'
        }
    },

    methods: {
        test() {
            window.console.log(this.$store.state);
        }
    }

}
</script>
<style>

</style>