
import axios from 'axios';
import util from '../libs/util';
import {router, vm} from '../main';
const Qs = require('qs');
let HTTP = axios.create({
    baseURL : 'http://wd.console.jixiang.cn/admin',
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
      if(data && data.append){
          return data;
      }
      return Qs.stringify(data);

    }],
    transformResponse: [function (data) {
       // console.log(data);
        var res = {};
        data = JSON.parse(data);

        res.status = data.status;
        res.msg = data.msg;
        res.list = data.list;

        if(res.status == 2){
            localStorage.clear();
            vm.$Notice.warning({
                title: '请重新登录',
                duration : 3,
                onClose : function(){
                    router.push({
                        path : '/login'
                    })
                }
            });
        }
        else {
            if(data.data && data.data.token){
                util.$setStorage('realname', data.data.realname);
                util.$setStorage('token', data.data.token);
            }
        }
        return res;
    }],
})

HTTP.interceptors.request.use(function(config){
    let token = util.$getStorage('token');
    if(token){
        config.headers.token = token;
    }
    return config;
});

export const GetList = () => {
    return HTTP.get('query/all');
}

export const AddList = (arg) => {
    return HTTP.post('insert',arg);
}

export const DeleList = (arg) => {
    return HTTP.post('delete',arg);
}

export const UpdataList = (arg) => {
    return HTTP.post('modify',arg);
}

export const Login = (arg) => {
    return HTTP.post('login',arg);
}

export const Search = (arg) => {
    return HTTP.post('query/fuzzy',arg);
}

export const LogOut = () => {
    return HTTP.get('exit');
}

export const BannerAdd = (arg) => {
    return HTTP.post('banner/insert',arg);
}

export const BannerChange = (arg) => {
    return HTTP.post('banner/modify',arg);
}

export const BannerDel = (arg) => {
    return HTTP.post('banner/delete',arg);
}

export const BannerGet = () => {
    return HTTP.get('banner/query');
}