import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'iview/dist/styles/iview.css';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(iView);
Vue.prototype.$Util = Util;

// 路由配置
const RouterConfig = {
    mode: 'hash',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);

    let token = Util.$getStorage('token');
    if(to.path == '/login'){
        if(token){
            router.push({
                path : '/'
            })
        }
        else{
           next();
        }
    }
    else{
        if(token){
            next();
        }
        else{
            router.push({
                path : '/login'
            })
        }
    }
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

const vm = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

export {
    router,
    vm
};