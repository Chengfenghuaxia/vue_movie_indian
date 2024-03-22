import { createStore } from 'vuex';
import { ApiGet, ApiPost } from "../utils/request";

// 创建Vuex存储实例
export default createStore({
    state: {
        Navigation: false,
        Search: false,
        Video: false,
        Comics: false,
        Novel: false,
        HD: false,
        MovieList: [],
        advertiseList:[],
        movietypeList:[]
    },
    mutations: {
        setNavigation(state, value) {
            state.Navigation = value;
        },
        setSearch(state, value) {
            state.Search = !state.Search;
        },
        setVideo(state, value) {
            state.Video = value;
        },
        setComics(state, value) {
            state.Comics = value;
        },
        setNovel(state, value) {
            state.Novel = value;
        },
        setHD(state, value) {
            state.HD = value;
        },
        SetMovieList(state, value) {
            state.MovieList = value
        },
        SetadvertiseList(state, value){
            state.advertiseList = value
        },
        SetmovietypeList(state, value){
            state.movietypeList = value
        }
    },
    actions: {
        gelMoveiList({ commit }, data) {
            // ApiPost("/movie/pagebyhits", data).then(res => {
            ApiPost("/movie/pagebytype", data).then(res => {
                console.log(res.data.list,'拿到电影了吧');
                commit("SetMovieList",res.data.list)
            })
        },
        getadvertiseList({ commit }, data){
            ApiPost("/advertise/getdata", data).then(res => {
                if(res.code == 0){
                    commit("SetadvertiseList",res.data.list)
                }
               
            })
        },
        getmovietypeList({ commit }, data){
            ApiPost("/category/all", data).then(res => {
                commit("SetmovietypeList",res.data)
            })
        }
    },
    modules: {}
});

