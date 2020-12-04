import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        goodsId:"",
        shareId:""
    },
    mutations: {
        setGoodsId(state,goodid){
          state.goodsId = goodid
          uni.setStorageSync('goodsId', goodid)
        },
        setShareId(state,shareid){
          state.shareId = shareid
          uni.setStorageSync('shareid', shareid)
        }
    },
    actions: {

    }
})
export default store