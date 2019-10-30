import axios from 'axios'
// import { FormItem } from 'element-ui';
let base =''
const ip = "http://localhost:8080/"
// const ip = "http://10.244.231.80:8080/"

export const requestLogin = params=>{return axios.post(`${base}/login`,params).then(res => res.data);};

export const getMenuJson = ()=>{return axios.get(ip+"data/menu.json")}
export const getTableJson = ()=>{return axios.get(ip+"data/table.json")}
// export function getdata1(empt,name){
//     axios.get(ip + "/login",{
//         params:{
//             empt,
//             name
//         }
//     })
// }

// export function getdata2(params){
//     axios.post(ip + "/urfsgfs",qs.stringify(params) )
// }