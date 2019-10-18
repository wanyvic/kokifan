import Vue from 'vue'
import Vuex from 'vuex'
import IPFS from 'ipfs'
import PeerId from 'peer-id'
import dagPB from 'ipld-dag-pb'
import hls from 'hlsjs-ipfs-loader'
import Html5DashJS from 'videojs-contrib-dash'
Vue.use(Vuex)
const state = {
    node: undefined,
    webID: undefined
}

const getters = {
    node: state => state.node,
    webID: state => state.webID
}

const mutations = {
    async getWebID() {
        state.webID = config.webID
    }
}
const actions = {
    createNewKey(context) {
        return new Promise((resolve, reject) => {
            PeerId.create().then(
                peerId => resolve(peerId),
                err => reject(err)
            )
        });
    },
    createIpfs(context, data) {
        // state.webID = 'QmdhKoLjJL4ge8D5xinZaWxKF4djBs82dk7An3z2E6Ve85'QmerHzFtTzsHB95Gc7zFQU72fghz4qVzWgQjhA3Yh8Qzjw
        state.webID = 'QmbkCQYnsyTyK5wsf2F9X7bMPAS81hDTJ8nop9AeBMt2pk'
        // state.webID = 'QmU5nKhwGmcBuRTDctKwvP4hbStGQVToHtUuMbCzkd62cg'
        data.Bootstrap = ['/ip4/119.3.66.159/tcp/4002/ws/ipfs/Qmd6d5aSVoC1bxbake6JtmdBjLhWioUEYbPDsbJebU5Mqz']
        return new Promise((resolve, reject) => {
            const node = IPFS.create({
                // pubsub: {
                //   enabled: true
                // },
                repo: 'ipfs-' + Math.random(),
                config: {
                    Addresses: {
                        Swarm: data.Swarm
                    },
                    Bootstrap: data.Bootstrap
                },
                init: {
                    privateKey: data.PrivKey
                }
            })
            node.then(ipfs => {
                state.node = ipfs
                resolve(state.node)
            }, err => reject(err))
        });
    },
    async getIndex(context, data) {
        state.node.get(data.Cid).then(files => {
            console.log("getIndex", files)
            resolve(files)
        }, err => reject(err))
    },
    async upload(context, data) {
        console.log("upload", data.fileObj)

        const obj = {
            path: data.fileObj.name, // The file path
            content: data.fileObj.file
        }
        let hash = await state.node.add(obj, { wrapWithDirectory: true })
        console.log(hash)

        // state.node.object.get(state.webID, function (err, data) {
        //     if (err != null) {
        //         console.error(err)
        //     }
        //     console.log(data)
        //     console.log(data.Data.toString('utf8'))
        //     // console.log(files)
        //     // files.forEach((file) => {
        //     //     console.log(file.path)
        //     //     console.log(file.content.toString('utf8'))
        //     // })
        // })

    },
    async getIpfsObject(content, data) {
        state.node.object.get(data.Cid).then(data => {
            console.log(data)
            resolve(data)
        }, err => reject(err))
    },
    async getIpfsFile(content, data) {
        console.log(data.Cid)
        return new Promise((resolve, reject) => {
            state.node.get(data.Cid).then(res => {
                console.log(res)
                resolve(res)
            }, err => reject(err))
        })
    },
    async cat(context, data) {
        console.log("cat", data.ipfsPath)
        const file = await state.node.cat(data.ipfsPath)
        console.log(file.toString('utf8'))
        return file
    },
    async publish(context, data) {
        const res = await state.node.name.publish(data.addr)
        console.log(res, `https://gateway.ipfs.io/ipns/${res.name}`)
        return res
    },
    async catIndex(context) {
        state.node.get(state.webID, function (err, files) {
            files.forEach((file) => {
                console.log(file.path)
                console.log(file.content.toString('utf8'))
            })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}