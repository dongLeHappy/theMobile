import request from '@/utils/request'
import qs from 'qs'

export function loginByToken(paramenters) {
    const data = {
        hashCode: paramenters.hashCode, // 代理商账号
        command:  paramenters.command, //  登录命令
        version:  paramenters.version, // 接口版本号
        data:  paramenters.data // 设备端
    }
    return request({
        baseURL: '/openapi', // 请求自己配的json
        url: '/app/test',
        method: 'post',
        data: qs.stringify(data)
    })
}


// export function loginByToken(paramenters) {
//     const data = {
//         agentUserId: paramenters.agentUserId, // 代理商账号
//         command:  paramenters.command, //  登录命令
//         version:  paramenters.version, // 接口版本号
//         data:  paramenters.data // 设备端
//     }
//     return request({
//         baseURL: '//192.168.50.81/mock/5cf225f244df42105956c0b8/OPENAPI/', // 请求自己配的json
//         url: '/openapi/app',
//         method: 'post',
//         data: data
//     })
// }


export function register(paramenters) {
    const data = {
        agentUserId: paramenters.agentUserId, // 代理商账号
        command:  paramenters.command, //  登录命令
        version:  paramenters.version, // 接口版本号
        data:  paramenters.data // 设备端
    }
    return request({
        baseURL: '//192.168.50.81/mock/5cf225f244df42105956c0b8/OPENAPI/', // 请求自己配的json
        url: '/openapi/register',
        method: 'post',
        data: data
    })
}

export function recharge(paramenters) {
    const data = {
        agentUserId: paramenters.agentUserId, // 代理商账号
        command:  paramenters.command, //  登录命令
        version:  paramenters.version, // 接口版本号
        data:  paramenters.data // 设备端
    }
    return request({
        baseURL: '//192.168.50.81/mock/5cf225f244df42105956c0b8/OPENAPI/', // 请求自己配的json
        url: '/openapi/recharge',
        method: 'post',
        data: data
    })
}


export function withdrawal(paramenters) {
    const data = {
        agentUserId: paramenters.agentUserId, // 代理商账号
        command:  paramenters.command, //  登录命令
        version:  paramenters.version, // 接口版本号
        data:  paramenters.data // 设备端
    }
    return request({
        baseURL: '//192.168.50.81/mock/5cf225f244df42105956c0b8/OPENAPI/', // 请求自己配的json
        url: '/openapi/withdrawal',
        method: 'post',
        data: data
    })
}