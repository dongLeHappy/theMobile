import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { loadingShow, loadingHidden } from '@/components/Loading/index' // Loading
import Cookies from 'js-cookie' // 设置cookie

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 300000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        // config.headers.channel = drive();
        // config.headers.channel = 'PC';
        if(getToken() || store.getters.token){
            config.headers.authtoken = getToken() || store.getters.token;
            Cookies.set('uid', getToken() || store.getters.token) // 登入加cookies  uid
            setToken(getToken() || store.getters.token) // 登入加cookies  GGPC-Token
        }
        // if(getToken()){
        //   config.headers.channel = 0;
        //   config.headers.Authorization = getToken();
        // }
        // if (store.getters.token) {
        //     // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        //     config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    // response => {
    //     return response;
    // },

    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        if (response.status == 200 || response.status == 304) {
            const res = response.data
            if (res.version) {
                if (res.data.success == 1) {
                    return res.data
                } else {
                    MessageBox.alert(res.data.respMsg)
                    return res
                }
            } else {
                if (res.success == 1) {
                    return res
                } else {
                    MessageBox.alert(res.respMsg)
                    if (res.respCode == 'cp4_210009') {
                        removeToken() // 清除cookies
                        Cookies.remove('uid') // 清除cookies
                        MessageBox.alert('网络错误，请重新登入。')
                        setTimeout(() => {
                            location.href = '/login'
                        }, 2000)
                    }
                    return res
                }
            }
        }

        // if (res.code !== 20000) {
        //   MessageBox({
        //     message: res.message,
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //     // 请自行在引入 MessageBox
        //     // import { Message, MessageBox } from 'element-ui'
        //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //       confirmButtonText: '重新登录',
        //       cancelButtonText: '取消',
        //       type: 'warning'
        //     }).then(() => {
        //       store.dispatch('FedLogOut').then(() => {
        //         location.reload() // 为了重新实例化vue-router对象 避免bug
        //       })
        //     })
        //   }
        //   return Promise.reject('error')
        // } else {
        //   return response.data
        // }
    },
    error => {
        loadingHidden() // 去掉Loading加载 
        MessageBox.alert(error).then(action => {

        });
        return Promise.reject(error)
    }
)

export default service