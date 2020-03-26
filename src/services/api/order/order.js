import axios from 'axios';

let order = {
    orderList
};

function orderList(data) {
    return axios({
        url:'/api/user/order',
        method: 'get',
        params: data
    });
}

export default {

    order

};
