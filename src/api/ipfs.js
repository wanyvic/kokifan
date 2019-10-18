import IPFS from 'ipfs'

export const ipfs = {
    debug,
    setDebug(flag) {
        if (flag==true){
            this.debug = console.log
        }else{
            this.debug = function(){}
        }
    },
    create(data) {
        return new Promise((resolve, reject) => {
            const node = IPFS.create({
                pubsub: {
                    enabled: true
                },
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
                debug(ipfs)
                resolve(ipfs)
            }, err => reject(err))
        });
    },
    objectGet(data) {
        state.node.object.get(data.Cid).then(data => {
            console.log(data)
            resolve(data)
        }, err => reject(err))
    },

}