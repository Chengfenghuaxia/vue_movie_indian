import {
    createRouter,
    createWebHistory,
    createWebHashHistory
} from "vue-router";

// 1.定义路由组件
import IndexHome from "../views/IndexHome.vue";
import Home from "../views/index/Home.vue";
import Copyright from "../views/index/Copyright.vue";
import Privacy from "../views/index/privacy.vue";
import FilmDetails from "../views/index/FilmDetails.vue";
import Play from "../views/index/Play.vue";
import SearchFilm from "../views/index/SearchFilm.vue";
import NotFound from '../views/error/Error404.vue'
import FilmClassifySearch from "../views/index/FilmClassifySearch.vue";
import FilmClassify from "../views/index/FilmClassify.vue";
import ManageIndex from "../views/manage/Index.vue"
import Login from "../views/Login.vue"
import ManageHome from "../views/manage/ManageHome.vue";
import { getToken } from "../utils/token";
import CollectManage from "../views/manage/collect/CollectManage.vue";
import SiteConfig from "../views/manage/system/SiteConfig.vue";
import CronManage from "../views/manage/cron/CronManage.vue";
import Temp from "../views/manage/file/Temp.vue";
import FilmClass from "../views/manage/film/FilmClass.vue";
import Film from "../views/manage/film/Film.vue";
import FileUpload from "../views/manage/file/FileUpload.vue";
import FilmAdd from "../views/manage/film/FilmAdd.vue";
import { useStore } from 'vuex';
import { ApiPost } from "../utils/request";
let list = []


async function getrouter() {
    let res = (await ApiPost("/category/all", {name:"测试111"}))
    let routerList = []
    res.data.map(item => {
        if (item.children) {
            item.children.forEach(item1 => {
                let data = {
                    path: item1.name,
                    component: Home
                }
                console.log('跳路由',data);
                
                routerList.push(data)
            })
        }

    })
    return routerList
}




// 2. 定义一个路由
const routes = [
    {
        path: '/',
        component: IndexHome,
        redirect: '/index',
        children: [
            {
                path: 'index', component: Home,

                children: [
                    
                    { path: 'cartoon', component: Home },
                    { path: 'Occident', component: Home },
                    { path: 'Taiwan', component: Home },
                    { path: 'Japanese', component: Home },
                    { path: 'india', component: Home },
                    { path: 'Occident Best', component: Home },
                ]
            },
            { path: 'filmDetail', component: FilmDetails },
            { path: 'play', component: Play },
            { path: 'search', component: SearchFilm },
            { path: 'filmClassify', component: FilmClassify },
            { path: 'filmClassifySearch', component: FilmClassifySearch },
            { path: 'copyright', component: Copyright },
            { path: 'privacy', component: Privacy },
        ]
    },
    { path: '/login', component: Login },
    {
        path: '/manage',
        component: ManageHome,
        redirect: '/manage/index',
        children: [
            { path: 'index', component: ManageIndex },
            { path: 'collect/index', component: CollectManage },
            { path: 'system/webSite', component: SiteConfig },
            { path: 'cron/index', component: CronManage },
            { path: 'file/upload', component: FileUpload },
            { path: 'file/gallery', component: Temp },
            { path: 'film', component: Film },
            { path: 'film/class', component: FilmClass },
            { path: 'film/add', component: FilmAdd },
            { path: 'film/detail', component: Temp },

        ]
    },
    { path: `/:pathMatch(.*)*`, component: NotFound },
]



// 创建路由实例并传递 routes配置
const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes: routes

})

let newchildren: any = ""
// setTimeout(() => {
//     newchildren = getrouter()
//     newchildren.then(res => {
//         res.forEach(item => {
//             router.addRoute
//         })
//         // router.addRoute( { path: 'film/detail', component: Temp }); // 添加动态路由
//     })
// }, 1000);









// 添加全局前置守卫拦截未登录的跳转
router.beforeEach((to, from, next) => {
    console.log('路由从', from.fullPath, '变为', to.fullPath);
    const store = useStore();
    let info = JSON.parse(localStorage.getItem("routerInfo"))


    list = store.state.movietypeList.map(item => {
        return { ...item.children }
    })


    list.forEach(item1 => {
        for (var key in item1) {
            if (to.fullPath.includes(item1[key].name)) {
                info = item1[key]
            }
        }
    });
    if (info) {
        console.log(info, '路由变化的参数');
        if (to.fullPath !== '/index') {
            let data = { category_id: info.id, limit: info.limit || 10, page: info.page || 1, type: info.type || 2 }
            setTimeout(() => {
                store.dispatch('gelMoveiList', data);
            }, 600);
          
        }

    }




    // 如果访问的是 /manage 下的路由, 且 token信息为空 则跳转到登录界面
    let matchPath = new RegExp(/^\/manage\//).test(to.path)
    let token = getToken()
    if (matchPath && !token) {
        next('/login')
    } else {
        next()
    }
})
router.afterEach((to, from) => {
    window.scrollTo(0, 0);
});





export { router }

