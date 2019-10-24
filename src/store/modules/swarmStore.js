import Vue from 'vue'
import Vuex from 'vuex'
import { createNewSwarm, getSwarmInstance } from '../../api/swarm'
Vue.use(Vuex)
const state = {
    web3: undefined,
    bzzClient: undefined
}

const getters = {
    web3: state => state.web3,
    bzzClient: state => state.bzzClient
}

const mutations = {
}
const actions = {
    CreateSwarmClient(context, data) {
        return new Promise((resolve, reject) => {
            let swarm = getSwarmInstance()
            if (typeof swarm === 'undefined') {
                createNewSwarm(data.config)
                swarm = getSwarmInstance()
            }
            resolve(getSwarmInstance())
        })
    },
    HasSwarmClient(context){
        return new Promise((resolve, reject) => {
            let swarm = getSwarmInstance()
            if (typeof swarm === 'undefined') {
                reject('swarm instance not found')
            }else{
                resolve(swarm)
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}