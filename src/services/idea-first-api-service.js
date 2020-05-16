import axios from 'axios'

export default class IdeaFirstApiService {


    host = "https://apps.smit.studio/skyeng_vk-mini-app/api";


    useAuth = () => {
        return {
            headers: {
                // 'Authorization': 'Url ' + window.location.href
                'Authorization': 'Url ' + this.host2 + window.location.href.slice(23)

            }
        }
    };

    toFormData = (obj) => {
        console.log(obj)
        let fd = new FormData()
        Object.keys(obj).map(key => {
            fd.append(key, obj[key])
        })

        return fd
    }

}