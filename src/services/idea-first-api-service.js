import axios from 'axios'

export default class IdeaFirstApiService {


    origin = "https://onlineshow.marketingforum.com.ua";
    host = "https://onlineshow.marketingforum.com.ua/api";

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

    getMessages(chatId) {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/group/messages?chat_id=${chatId}`, this.useAuth())
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

    getVipMessages(userId) {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/personal/messages/from/${userId}`, this.useAuth())
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


    getUser() {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/users/get`, this.useAuth())
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

    getScenes() {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/stream/all`, this.useAuth())
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

    getPersonalMessages() {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/personal/messages`, this.useAuth())
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

    updateMessages(chatId, id) {
        return new Promise((resolve, reject) => {
            axios.get(this.host + `/group/messages/from/${id}?chat_id=${chatId}`, this.useAuth())
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


    postMessage(chatId, text) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + "/group/messages", this.toFormData({
                chat_id: chatId,
                text: text
            }), this.useAuth())
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

    postUrl(url) {
        console.log('postUrl', url)
        return new Promise((resolve, reject) => {
            axios.post(this.host + "/statistics/url", this.toFormData({
                url: url
            }), this.useAuth())
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

    postVipMessage(userId, text) {
        return new Promise((resolve, reject) => {
            axios.post(this.host + "/personal/messages", this.toFormData({
                user_id: userId,
                text: text
            }), this.useAuth())
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
            axios.post(this.host + "/stream/reaction", this.toFormData({
                scene_id: scene_id,
                reaction_id: reaction_id
            }), this.useAuth())
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

    // getScenes() {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(this._ScenesResponse());
    //         }, 700);
    //     });
    // }


}