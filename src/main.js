import Vue from 'vue';
import VueX from 'vuex';
import router from './config/PageRoutes';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// plugins
import VueRouter from 'vue-router';
import VueBootstrap from 'bootstrap-vue';
import VueNVD3 from 'vue-nvd3';
import VueInsProgressBar from 'vue-ins-progress-bar';
import VueEventCalendar from 'vue-event-calendar';
import Cookies from 'js-cookie';
import VueSparkline from 'vue-sparklines';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vueditor from '@agametov/vueditor';
import VueHljs from 'vue-hljs';
import VueSweetalert2 from 'vue-sweetalert2';
import VueNotification from 'vue-notification';
import VuePanel from './plugins/panel/';
import VueDateTimePicker from 'vue-bootstrap-datetimepicker';
import VueSelect from 'vue-select';
import VueDatepicker from 'vuejs-datepicker/dist/vuejs-datepicker.esm.js';
import VueMaskedInput from 'vue-maskedinput';
import VueInputTag from 'vue-input-tag';
import VueSlider from 'vue-slider-component';
import VueGoodTable from 'vue-good-table';
import VueFullCalendar from 'vue-full-calendar';
import VueCountdown from '@chenfengyuan/vue-countdown';
import VueColorpicker from 'vue-pop-colorpicker';
import VueCustomScrollbar from 'vue-custom-scrollbar';
import VueApexCharts from 'vue-apexcharts';
// plugins css
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'nvd3/build/nv.d3.min.css';
import 'vue-event-calendar/dist/style.css';
import 'vue-hljs/dist/vue-hljs.min.css';
import '@agametov/vueditor/dist/style/vueditor.min.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'ionicons/dist/css/ionicons.min.css';
import 'vue-good-table/dist/vue-good-table.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'vue-select/dist/vue-select.css';
import 'vue-slider-component/theme/antd.css';
// color admin css
import './assets/css/default/app.min.css';
import './scss/vue.scss';
import 'bootstrap-social/bootstrap-social.css';
import App from './App.vue';
import store from './store/index';
import './services/axios';
import axios from 'axios';
import Message from './tools/Message';
// api
import account from './services/api/account/account';
import order from './services/api/order/order';
import user from './services/api/user/user';
import client from './services/api/client/client';
// 复制
Vue.prototype.$account = account.account;
Vue.prototype.$client = client.client;
Vue.prototype.$order = order.order;
Vue.prototype.$user = user.user;
// api

Vue.prototype.$axios = axios;
Vue.prototype.$Message = Message.MessageFuntion;
Vue.prototype.cookies = Cookies;
Vue.use(VueX);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueBootstrap);
Vue.use(VueNVD3);
Vue.use(VueEventCalendar, { locale: 'en' });
Vue.use(VueSparkline);
Vue.use(Vueditor);
Vue.use(VueHljs);
Vue.use(VueSweetalert2);
Vue.use(VueNotification);
Vue.use(VuePanel);
Vue.use(VueDateTimePicker);
Vue.use(VueGoodTable);
Vue.use(VueFullCalendar);
Vue.use(VueColorpicker);
Vue.use(VueGoogleMaps, {
    load: {
        key: '',
        libraries: 'places'
    }
});
Vue.use(VueInsProgressBar, {
    position: 'fixed',
    show: true,
    height: '3px'
});
Vue.component('v-select', VueSelect);
Vue.component('datepicker', VueDatepicker);
Vue.component('masked-input', VueMaskedInput);
Vue.component('input-tag', VueInputTag);
Vue.component('vue-slider', VueSlider);
Vue.component('vue-custom-scrollbar', VueCustomScrollbar);
Vue.component('apexchart', VueApexCharts);
Vue.component(VueCountdown.name, VueCountdown);

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
