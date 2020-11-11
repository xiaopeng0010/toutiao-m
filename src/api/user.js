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
//获取用户当前频道列表
export const getDataInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels',
    })
}
//获取文章列表
export const getDataInfoList = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        },
        params
    })
}
//获取所有频道列表
export const getAllchannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels',
    })
}
//批量修改用户频道列表
export const editChannels = channel => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels:[channel]
        },
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        }
    })
}
// 获取联想建议
export const getSearchSuggestion = q => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params:{q}
    })
}
// 获取搜索结果
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: '/app/v1_0/search',
        params
    })
}
// 获取新闻文章详情
export const getSearArticles = articleId => {
    return request({
        method: 'GET',
        url:`/app/v1_0/articles/${articleId}`
    })
}
// 获取新闻文章详情
export const removeUserChannel = channelsId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelsId}`,
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        }
    })
}

// 关注用户
export const addFollow = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target
        },
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        }
    })
}

// 取消关注用户
export const deleteFollow = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`,
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        }
    })
}
// 获取评论或评论回复
export const getListComments = params => {
    return request({
        method: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}
// 添加评论
export const addCommentsList = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data,
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        }
    })
}
// 编辑用户信息
export const getUserById = data => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile',
        data,
        headers: {
            Authorization:`Bearer ${store.state.user.token}`
        }
    })
}