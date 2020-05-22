import axios from 'axios'

export default class IdeaFirstApiService {


    origin = "http://116.203.213.27";
    host = "http://116.203.213.27/api"

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

    //--Заглушки--//

    _ScenesResponse() {
        const scenes = [
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

        return scenes;
    }

    getScenes() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this._ScenesResponse());
            }, 700);
        });
    }


}