import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// import routerConfig from './router'
// import * as filters from './filters'
import App from './App'
import VueTzt from "./TZT/TZT";
require('./sm.js');

/* eslint-disable no-new */
Vue.config.debug = true
Vue.config.devtools = true
// Router
Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: false,
  suppressTransitionError: false
})

routerConfig(router,Vue)

// Resource
Vue.use(VueResource)

Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next)  => {

    // modify request
    // request.method = 'POST';
    if(request.isToken){
    	request.body.MobileCode = '($MobileCode)';
    	request.body.Token = '($Token)';
    	request.body.newindex = '1';
    }
    console.log(request.body);
    if(!request.body.ReqlinkType && request.body.ReqlinkType !== 0){
    	request.body.ReqlinkType = '1';
    }

    // continue to next interceptor
    next((response) => {
    	let data = response.json();
    	if(data.ERRORNO && data.ERRORNO<0){
            if(data.ERRORMESSAGE){
                alert(data.ERRORMESSAGE);
            }
    		// console.log(response);
    		/*next(request.respondWith(response.body, {
		         status: 404,
		         statusText: 'Not found'
		    }));*/
            /*response.body = '{}';
            response.data = '{}';
            response.status = 404,
            response.statusText = 'Not found'*/
    	}
        // modify response
        // response.body = '...';

    });
});
Vue.use(VueTzt);

// Filters
Vue.filter('date', filters.dateFilter)

router.start(App, '#app')

window.router = router;
