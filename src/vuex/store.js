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


//将当前额Storage里面的信息放在vuex里面，然后在herader里面去调用
// const menuTagState={
//     menuTag2:[]
// }
// const menuTagList={
//     // addMenu(menuTagState){
//     //     menuTagState.menuTag2.push(menuTagState)
//     // },
//     getMenu(){
//         console.log(7778787878,window.localStorage.getItem('menuTag'))
//         return window.localStorage.getItem('menuTag')
//     }
    
// }
// window.addEventListener('menuTag', storageHandler)
// window.addEventListener('menuTagState', (event) => console.log(event))
//用export default 封装代码，让外部可以引用
export default new Vuex.Store({
    state,
    mutations,
    // menuTagState,
    // menuTagList,
});
