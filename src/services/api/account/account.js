import axios from 'axios';

let account = {
    getUserInfo, // 获取用户信息
    login,  //登录 ， 参数：用户名 密码
};

function getUserInfo() {
// todo 用户信息
    return axios({
        url: '/api/accounts/identify/',
        method: 'get'
    });
}

function login(data) {
// todo 用户登录
    return axios({
        url: '/api/login/',
        method: 'post',
        data: data
    });
}

export default {

    account

};
