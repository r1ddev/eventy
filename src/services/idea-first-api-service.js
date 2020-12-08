import axios from 'axios'

export default class IdeaFirstApiService {

    origin = window.location.protocol + "//demo.smit.events";
    host = window.location.protocol + "//api.smit.events/api";
    staticHost = window.location.protocol + "//demo.smit.events/static-api";
    
    // origin = window.location.origin;
    // host = window.location.origin + "/api";

    useAuth = () => {
        return {
            headers: {
                Authorization: window.localStorage.token
            }
        }
    }

    toFormData = (obj) => {
        let fd = new FormData()
        Object.keys(obj).map(key => {
            fd.append(key, obj[key])
        })

        return fd
    }

    addUser(user) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + "/v3/users", user, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    addGuestUser() {
        return new Promise((resolve, reject) => {
            axios.post(this.host + "/v2/users/login/guest", this.toFormData({}), this.useAuth())
                .then(res => {
                    if (res.data.status) {
                        resolve(res.data);
                    } else {
                        reject(res.data.error)
                    }
                })
                .catch(error => { reject(error) }
                )
        })
    }


    autorizate(user) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + "/v3/users/login", user, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    recoverPassword(email) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + "/v3/users/restore", { email }, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    getMessages(chatId) {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/chat/${chatId}`, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    getVipMessages(userId) {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/messages/${userId}`, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    getUser() {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/users/me`, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => { reject(error) }
                )
        })
    }

    getScenes() {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/streams`, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    getBanner(sceneId) {
        return new Promise((resolve, reject) => {
            axios.get(this.origin + `/static-api/banners/${sceneId}`, this.useAuth())
                .then(res => {
                    if (res.data.status) {
                        resolve(res.data);
                    } else {
                        reject(res.data.error)
                    }
                })
                .catch(error => { reject(error) }
                )
        })
    }

    getNotify() {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/notify`, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    updateMessages(chatId, id) {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/chat/${chatId}`, {
                    ...this.useAuth(),
                    params: {
                        from: id
                    }
                })
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    postMessage(chatId, text, reply_id = null) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + `/v3/chat/${chatId}`, {
                text: text,
                reply_id: reply_id
            }, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    postUrl(url) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + "/v3/metrics", {
                url: url
            }, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    postVipMessage(userId, text) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + `/v3/messages/${userId}`, {
                text: text
            }, this.useAuth())
                .then(res => {
                    if (res.data.status) {
                        resolve(res.data);
                    } else {
                        reject(res.data.error)
                    }
                })
                .catch(error => { reject(error) }
                )
        })
    }


    postReaction(scene_id, reaction_id) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + `/v3/streams/${scene_id}/reactions`, this.toFormData({
                reaction_id: reaction_id
            }), this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }


    //-alley

    getConversationsAlley() {

        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/conversations-alley`, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => { reject(error); }

                )
        })
    }

   

    reserveAlleyRoom(room_id, slot)  {
        return new Promise((resolve, reject) => {

            axios.patch(this.host + `/v3/conversations-alley/${room_id}/chedule`, {
                place_id: slot,
            },this.useAuth())
                .then(res => {
                    resolve(res);
                })
                .catch(error => { reject(error) }
                )
        })
    }

    cancelAlleyRoom(room_id, slot)  {
        return new Promise((resolve, reject) => {

            axios.patch(this.host + `/v3/conversations-alley/${room_id}/chedule`, {
                place_id: slot,
                type: "cancel"
            },this.useAuth())
                .then(res => {
                    resolve(res);
                })
                .catch(error => { reject(error) } )
        })
    }

    //--admin-panel

    getAdminUsers() {

        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/users`, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => { reject(error); }

                )
        })
    }

    adminBanUser(user_id, banned) {
        return new Promise((resolve, reject) => {
            axios.put(this.host + `/v3/users/${user_id}/chat`, {
                banned: banned,
            }, this.useAuth())
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    //экспо

    getExpoPartnerInfo(id){
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/v3/exposures/${id}`, this.useAuth())
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => { reject(error); }

                )
        })
    }


    //--Заглушки--//

    _ScenesResponse() {
        const streams = [
            {
                scene_id: 1,
                rus: 'https://player.vimeo.com/video/124024544',
                eng: 'https://player.vimeo.com/video/123538098'
            },
            {
                scene_id: 2,
                rus: 'https://player.vimeo.com/video/116582567',
                eng: 'https://player.vimeo.com/video/187037469'
            },
            {
                scene_id: 3,
                rus: 'https://player.vimeo.com/video/188284379',
                eng: null
            }
        ]

        const data = {
            streams: streams
        }

        return data;
    }

    _TimerResponse() {

        const data = {
            vipChatTime: 5000,
            sceneTime: 60000,
            bannerTime: 30000,
            notifyTime: 15000,
            updateTimer: 5000,
            updateMessageTimer: 20000,
            sceneChatTime: 5000
        }

        return data;
    }



    getTimers() {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.riddev.com/umf.php`, this.useAuth())
                .then(res => {
                    if (res.data.status) {
                        resolve(res.data);
                    } else {
                        reject(res.data.error)
                    }
                })
                .catch(error => { reject(error) }
                )
        })
    }

    // getTimers() {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(this._TimerResponse());
    //         }, 700);
    //     });
    // }

    // getScenes() {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(this._ScenesResponse());
    //         }, 700);
    //     });
    // }


}