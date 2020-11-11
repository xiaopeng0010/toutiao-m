// 封装 axios 请求模块

import axios from 'axios'
import jsonBig from 'json-bigint'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
    // transformResponse 允许自定义原始的响应数据（字符串）
    transformResponse: [function (data) {
        try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
        } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
            data
        }
        }
    }]
})

export default request