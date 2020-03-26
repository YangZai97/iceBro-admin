import axios from 'axios';

let client = {
    getUserInfo,
    handleEdit,
    handleDelete,
    addUser
};

/**
 * 获取用户列表
 * @param data
 * @returns {AxiosPromise}
 */
function getUserInfo(data) {
    return axios({
        url:'/api/user/client',
        method: 'get',
        params: data
    });
}

/**
 * 更新用户信息
 * @param id
 * @param data
 * @returns {AxiosPromise}
 */
function handleEdit(id, data) {
    return axios({
        url:'/api/user/client/' + id + '/',
        method: 'put',
        data: data
    });
}

/**
 * 删除用户
 * @param id
 * @returns {AxiosPromise}
 */
function handleDelete(id) {
    return axios({
        url:'/api/user/client/' + id + '/',
        method: 'delete',
    });
}

/**
 * 增加用户
 * @param data
 * @returns {AxiosPromise}
 */
function addUser(data) {
    return axios({
        url:'/api/user/client',
        method: 'post',
        data: data
    });
}

export default {

    client

};
