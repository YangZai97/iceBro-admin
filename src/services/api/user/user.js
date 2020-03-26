import axios from 'axios';

let user = {
    getUserList, // 获取用户信息
    createUserList,
    deleteUserList,
    updateUserList
};

function getUserList(data) {
    return axios({
        url: '/api/admin/account/',
        method: 'get',
        params: data
    });
}

function createUserList(data) {
    return axios({
        url: '/api/admin/account/',
        method: 'post',
        data: data
    });
}

function deleteUserList(id) {
    return axios({
        url: '/api/admin/account/' + id,
        method: 'delete'
    });
}

function updateUserList(id, data) {
    return axios({
        url: '/api/admin/account/' + id,
        method: 'put',
        data: data
    });
}

export default {

    user

};
