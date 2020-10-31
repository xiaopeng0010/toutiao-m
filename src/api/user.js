import request from '@/utils/request'
import store from '../store/index'

export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}
//获取用户信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        }
    })
}