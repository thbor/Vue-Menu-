import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
    count:1
}
//加入改变state的方法
const mutations = {
    add(state){
        state.count+=1;
    },
    reduce(state){
        state.count-=1;

    }
}
//用export default 封装代码，让外部可以引用
export default new Vuex.Store({
    state,
    mutations
});
