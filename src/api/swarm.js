
import { SwarmClient } from '@erebos/swarm'
import HlsjsSwarmLoader from 'hlsjs-swarm-loader'
import Hls from 'hls.js'
const bzzDefaultUrl = 'https://swarm-gateways.net'
export class Swarm {
    bzzUrl = bzzDefaultUrl;
    constructor(config) {
        this.bzzUrl = config.bzzUrl
        if (config.debug === false) {
            this.debug = function () { }
        } else if (config.debug === true) {
            this.debug = console.log
        } else {
            this.debug = config.debug
        }
        this.Client = new SwarmClient({ bzz: { url: this.bzzUrl } })
    }
    parseJson = async function (item) {
        this.debug('parse url to blob', item)
        await this.recursionSwapUrl(item)
        this.debug('resolve parse', item)
        return item
    }
    recursionSwapUrl = async function (item) {
        for (var p in item) {
            if (typeof item[p] === 'string' && item[p].indexOf('bzz') == 0) {   //如果是bzz地址则替换
                const url = item[p].split('://')[1]
                const rootPos = url.indexOf('/')
                const rootHash = url.substring(0, rootPos)
                const filePath = url.substring(rootPos + 1, url.length)
                this.debug(`requesting ${rootHash}/${filePath}`)
                let res = await this.download(rootHash, { path: filePath })
                item[p] = res
            }
            else if (typeof item[p] === 'object') {
                await this.recursionSwapUrl(item[p])
            }
        }
    }
    download = function (rootHash, options) {
        return new Promise((resolve, reject) => {
            this.Client.bzz.download(rootHash, options).then(res => {
                this.debug(`Received data for file `, res)
                res.arrayBuffer().then(value => {
                    let blob = new Blob([value], { type: "text/plain" });
                    resolve(URL.createObjectURL(blob))
                })
            })
        })
    }
    hlsVideo = function (rootHash, fileName, element) {
        Hls.DefaultConfig.loader = HlsjsSwarmLoader;
        if (Hls.isSupported()) {
            const video = element;
            const hls = new Hls();
            hls.config.bzz = this.Client.bzz;
            hls.config.bzzHash = rootHash;
            hls.loadSource(fileName);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        }
    }
}
let swarm
export function createNewSwarm(config) {
    swarm = new Swarm(config)
}
export function getSwarmInstance() {
    return swarm
}
export const swarmdata = {
    "bangumi": {
        "0": {
            "aid": 1,
            "videos": 51, //数量
            "tid": 32,
            "tname": "完结动画",
            "category": "bangumi",
            "copyright": 2,
            "pic": "bzz://095bafabe3ea953085d9426681abbb5a6e4df57c52ec0776892e01655420c765/3.png", //http:... //bzz://
            "title": "【合集】游戏王 怪兽之决斗 1-51",
            "pubdate": 1533902985, //上传时间 (修改)
            "ctime": 1533902279, //创建时间
            "desc": "武藤游戏是童实野高中的一名普通学生，除了喜欢玩各种游戏外没有任何优点，运动神经也不好，除了青梅竹马的真崎杏子外没有任何朋友。经常自己一个人玩的游戏其实心里很想要有朋友。",
            "state": 0,
            "attribute": 93696,
            "duration": 67519, //时长
            "redirect_url": "cb52dd2cc60be214b3f05d91a6323346a4211290967d874515e7c1074a1fbcb9/master.m3u8", //http:... //bzz://
            "rights": {
                "bp": 1,
                "elec": 0,
                "download": 0,
                "movie": 0,
                "pay": 0,
                "hd5": 0,
                "no_reprint": 0,
                "autoplay": 0,
                "ugc_pay": 0,
                "is_cooperation": 0,
                "ugc_pay_preview": 0
            },
            "owner": {
                "mid": 1, //uid
                "name": "wanyvic",
                "face": "http://i2.hdslb.com/bfs/face/60a9153609998b04301dc5b8ed44c41b537a2268.jpg"
            },
            "stat": {
                "aid": 29024055,
                "danmaku": 75941,
                "reply": 5693,
                "favorite": 1269,
                "coin": 7777,
                "now_rank": 0,
                "his_rank": 0,
                "like": 1627,
                "dislike": 0
            },
            "dynamic": "",
            "cid": 50349307,
            "dimension": {
                "width": 0,
                "height": 0,
                "rotate": 0
            }
        },
        "1": {
            "aid": 2,
            "videos": 51, //数量
            "tid": 32,
            "tname": "完结动画",
            "category": "bangumi",
            "copyright": 2,
            "pic": "bzz://095bafabe3ea953085d9426681abbb5a6e4df57c52ec0776892e01655420c765/3.png", //http:... //bzz://
            "title": "【合集】游戏王 怪兽之决斗 1-51",
            "pubdate": 1533902985, //上传时间 (修改)
            "ctime": 1533902279, //创建时间
            "desc": "武藤游戏是童实野高中的一名普通学生，除了喜欢玩各种游戏外没有任何优点，运动神经也不好，除了青梅竹马的真崎杏子外没有任何朋友。经常自己一个人玩的游戏其实心里很想要有朋友。",
            "state": 0,
            "attribute": 93696,
            "duration": 67519, //时长
            "redirect_url": "cb52dd2cc60be214b3f05d91a6323346a4211290967d874515e7c1074a1fbcb9/master.m3u8", //http:... //bzz://
            "rights": {
                "bp": 1,
                "elec": 0,
                "download": 0,
                "movie": 0,
                "pay": 0,
                "hd5": 0,
                "no_reprint": 0,
                "autoplay": 0,
                "ugc_pay": 0,
                "is_cooperation": 0,
                "ugc_pay_preview": 0
            },
            "owner": {
                "mid": 1, //uid
                "name": "wanyvic",
                "face": "http://i2.hdslb.com/bfs/face/60a9153609998b04301dc5b8ed44c41b537a2268.jpg"
            },
            "stat": {
                "aid": 29024055,
                "danmaku": 75941,
                "reply": 5693,
                "favorite": 1269,
                "coin": 7777,
                "now_rank": 0,
                "his_rank": 0,
                "like": 1627,
                "dislike": 0
            },
            "dynamic": "",
            "cid": 50349307,
            "dimension": {
                "width": 0,
                "height": 0,
                "rotate": 0
            }
        }
    }
}