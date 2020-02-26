<script>
    import Home from '../pages/Home.vue';
    import VueRouter from "vue-router";

    const routes = [
        {path: '/', component: Home},
    ];

    const router = new VueRouter({
        routes
    });

    export default router;
</script>
