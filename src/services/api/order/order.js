import axios from 'axios';

let order = {
    orderList,
    deleteRow,
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
export default {

    order

};
