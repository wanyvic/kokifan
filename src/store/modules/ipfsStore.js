import Vue from 'vue'
import Vuex from 'vuex'
import IPFS from 'ipfs'
import PeerId from 'peer-id'
Vue.use(Vuex)
const state = {
    node: undefined
}

const getters = {
    node: state => state.node
}

const mutations = {
    //   async createWithPrivKey(state, privKey) {
    //     console.log("as", privKey)
    //     privKey = "CAASqAkwggSkAgEAAoIBAQDAa/fDHDiLk9Nw6XV8xeKBBVVQobS0pk3USVReSbS+W1U65yF9C/oA3g7vvl64SZY8sDR0BvYYlKqcIgndeDxWmq3olq/US1DVhuc9PUCwN0XPdmTyXa+bwHziIAAweY0OIxhpZUiWjQrWBWOV7vonFoyeWjwpcDc9enWFa7JiNaCnsYbXzZfGMcXiT6D3SztXAILxFQ3vmhRjKfPV2lzhQbKcSUskDuLTBm1dycF+S6IlgWNDQ6jEQ1EXE6AphjX2Ho3B8P0T0Nyzv6T1/N9meXhy14mKnMJJsjE59JOsXlJNEA+rXUmsf73xL1yIKY4YuyUcQCIu/kRKQAiZUlSlAgMBAAECggEADcOrZXmPUeyxI1KP5O0C1tfa0nm+w21iA916+4OqOjOuVRhTfO5uY8F+sAeeHvCknpK8LdCRqhB4Y9LLgdwn9Mn7xreAvF7m2V9dCzRmfDR3+e8uKWgqN6n9RO+lE9KeFHTOOjvUhXBxZf3cscz2d/VU+b7artwoF227GmAp0nyDqf0pbsLBTadIidFUsrL9Ywcl8/KBa4+j8gyHhaZ3ptq/+pnt/6MtB5OE03qnpJBCr61VIBWilJgVzkYOHmZ5aOySO1f2teL88maxkTdjRlPz+3rOaGpJM44WkUOm0a3m69YPENMhzYVmsqiQ+Ik/HglerZ2w7URezVyGF0BiAQKBgQD0sX8Oz+oLl0lGM5++dRfdV5AVvNji8PPK4R4n7TcKCJIBxBAFaV/isxA4Pp7sEUW7gvC7yanBb+E/wTa7XIW/kEhU3u6TRrRoKI8mHW/kfdW9nu007qbCXbG5gMFf8L8jeXE1z2AW0LpX9w2nYS7xKvZK9EPz5qpFt5VS8cQeDQKBgQDJUCUtHRD6P+nod/o7aHFliF2WiWXQO8CGk36a3IQEW5z4MoyuDZ90nb9cDphQqcB7K7zzoTRoFOSOzcnecQKoO5JWKTlYcbby8FeYoCTDHYqz3ndVTplMDa3JA8gqtF/OL4aqTXPhkRyKO7NrsxcHH/szxJRJpKc2ZX0WbmkC+QKBgQCqP2zlw2dWFTaYL4bvnsyx5iCL308P5xHYkHTI1tU6l+fubpmvCjf6pRed6oPsP8BCzMHuBkukGNGh6C7KgX9VX2/UDR/1PHZ9GesvW7/kPGEgg5kLARjplwL2zEy/EeQLLI3GILj8ZtGgLnZDhOyCQ6AFWpqE8nJ5+1db1HbdaQKBgCW4lr61S5EYmMOud3zaPSVBQAgNBr7V82VEDd0GpNYMNIVtM18Jvm8jf8/IDFJQ/HgX4ffkpOU7xPfdJ44+rrjHMMxkPRKNfDJZRpCasUi+KFc7wDCD4cWWapHX25Hk6m7ACQOwL558ilR8i0oK7K2xGGjC1OZXq91NdvrVBWhBAoGBAKRTjbBRrjQ0uKE8utmC8MZ3USbBkT6lGm4t4m3qZv/mtEJ0XKFExYu+CSVwogK4I97078I4Nq7DoPNgDIbEaIM45gCnUUUqZRKKExnogXiL6CMkE8Nx7aqEZfF7pxWyqdO09AQt2WyLtUhfYC/+B9NgQu1EV8qRAHPH2qC3P2sa"
    //     state.node = await IPFS.create({
    //       repo: '',
    //       init: {
    //         privateKey: privKey
    //       }
    //     })
    //     console.log("createWithPrivKey", state.node)
    //   }
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
    createWithPrivKey(context, data) {
        return new Promise((resolve, reject) => {
            const node = IPFS.create({
                // pubsub: {
                //   enabled: true
                // },
                repo: 'ipfs-' + Math.random(),
                config: {
                    Addresses: {
                        Swarm: ['/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star']
                    }
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
    async upload(context, data) {
        console.log("upload", data.str)
        const content = IPFS.Buffer.from(data.str)
        const results = await state.node.add(content)
        const hash = results[0].hash

        console.log("upload", hash)
        return hash
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
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}