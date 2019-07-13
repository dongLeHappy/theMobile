const home = {
    state: {
        openapiDataList: [], // openapiList
        flag_oAlert: false, // openapi弹出框是否显示
        alertState: '', // 充值取款状态
    },
    getters: {

    },
    mutations: {
        SET_OPENDATALIST: (state, data) => { // openapiList
            state.openapiDataList = data
        },
        SET_ALERTSTATE: (state, data) => { // 充值取款状态
            state.alertState = data
        }
    },
    actions: {
        getOpenDataList({ commit }, data) { // openapiList
            commit('SET_OPENDATALIST', data)
        },
        getAlertState({ commit }, data) { // 充值取款状态
            commit('SET_ALERTSTATE', data)
        }

    }
}
export default home