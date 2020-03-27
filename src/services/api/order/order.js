import axios from 'axios';

let order = {
    orderList,
    deleteRow,
    fianceList,
    editRow
};

function orderList(data) {
    return axios({
        url:'/api/user/order',
        method: 'get',
        params: data
    });
}

function deleteRow(id) {
    return axios({
        url:'/api/user/order/' + id + '/',
        method: 'delete',
    });
}

function editRow(id, data) {
    return axios({
        url:'/api/user/order/' + id + '/',
        method: 'put',
        data: data
    });
}
function fianceList(data) {
    return axios({
        url:'/api/admin/fiance',
        method: 'get',
        params: data
    });
}

export default {

    order

};
