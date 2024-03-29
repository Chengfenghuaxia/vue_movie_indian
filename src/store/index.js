import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import { ApiGet, ApiPost } from "../utils/request";

// 创建Vuex存储实例
export default createStore({
    plugins: [createPersistedState({
        paths: ['MovieInfo'] // 需要持久化的状态
    })],
    state: {
        Navigation: false,
        Search: false,
        Video: false,
        Comics: false,
        Novel: false,
        HD: false,
        TopMovieList:[],
        MovieList: [],
        advertiseList: [],
        movietypeList: [],
        MovieInfo: {},
        MovieTotal: 0,
        res_url_prefix: "",
        ADres_url_prefix: ""
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
        setMovieInfo(state, value) {
            state.MovieInfo = value
        },
        SetMovieList(state, data) {
            state.MovieList = data.list
            state.MovieTotal = data.total
            state.res_url_prefix = data.res_url_prefix
        },
        SetTopMovieList(state, data) {
            state.TopMovieList = data.list
        },
        SetadvertiseList(state, data) {
            state.advertiseList = data.list,
                state.ADres_url_prefix = data.res_url_prefix
        },
        SetmovietypeList(state, value) {
            state.movietypeList = value
        }
    },
    actions: {
        gelMoveiList({ commit }, data) {
            ApiPost("/movie/pagebytype", data).then(res => {
                commit("SetMovieList", res.data)
            })
        },
        gelTopMoveiList({ commit }, data) {
            ApiPost("/movie/pagebytype", data).then(res => {
                commit("SetTopMovieList", res.data)
            })
        },
        getadvertiseList({ commit }, data) {
            ApiPost("/advertise/getdata", data).then(res => {
                if (res.code == 0) {
                    commit("SetadvertiseList", res.data)
                }
            })
        },
        getmovietypeList({ commit }, data) {
            ApiPost("/category/all", data).then(res => {
                commit("SetmovietypeList", res.data)
            })
        }
    },
    modules: {}
});

