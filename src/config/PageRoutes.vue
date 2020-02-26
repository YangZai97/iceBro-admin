<script>
    import login from '../pages/account/login';
    import user from '../pages/user/user';
    import person from '../pages/person/person';
    import bill from '../pages/bill/bill';
    import order from '../pages/order/order';
    import VueRouter from "vue-router";

    const routes = [
        {path: '/', component: login},
        {path: '/user', component: user},
        {path: '/order', component: order},
        {path: '/bill', component: bill},
        {path: '/person', component: person},
    ];

    const router = new VueRouter({
        routes
    });

    export default router;
</script>
