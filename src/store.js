import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        test: 1,
        added:[],
        order: localStorage.getItem('order'),
        loading: false

}
})
