// Vue JS
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import {sync} from 'vuex-router-sync';

import Moment from 'vue-moment';
import Cookie from 'vue-cookie';
import Notifications from 'vue-notification';
import Modal from 'vue-js-modal';

sync(store, router);
Vue.config.productionTip = false;

Vue.use(Moment);
Vue.use(Cookie);
Vue.use(Notifications);
Vue.use(Modal);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});