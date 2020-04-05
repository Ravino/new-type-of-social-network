import Vuex from 'vuex';
import Vue from 'vue';
import {HTTPer} from "../httper/httper";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userData : {
            user_id: -1,
            firstname: ``,
            lastname: ``,
            sex: ``,
            birthday: ``,
            city: ``,
            created_at: ``,
            updated_at: ``,
            user_pic: `https://habrastorage.org/storage2/b92/bcf/532/b92bcf532c0a2889272ffd72ffb1f2b5.png`,
        },
        gwToken : ``,
        chatChannel : ``,
        isAuth: false
    },

    getters : {
        userData : state => {
            return state.userData;
        },
        gwToken : state => {
            let gwt = state.gwToken;

            if (!gwt  ||  ``===gwt) {
                gwt = window.localStorage.getItem('pliziJWToken');
            }

            if (gwt !== ``) {
                store.dispatch('SET_GWT', gwt);
                return gwt;
            }

            return state.gwToken;
        },
        chatChannel:state => {
            if(!state.chatChannel){
                state.chatChannel = window.sessionStorage.getItem('pliziChatChannel')
            }
            return state.chatChannel;
        },
        isAuth : state => {
            return state.isAuth;
        },
        getHTTPConfig : state => {
            const gwt = state.gwToken;

            if (!gwt ||  ``===gwt) {
                window.console.warn('store->getHTTPConfig: gwToken null or empty!');
                return null;
            }

            return {
                headers : {
                    Authorization: `Bearer ${gwt}`
                }
            };
        },
    },

    // setters
    mutations: {
        SET_USER : (state, payload) => {
            state.userData = payload;
        },
        SET_GWT : (state, payload) => {
            window.localStorage.setItem('pliziJWToken', payload+'');
            state.gwToken = payload;
        },
        SET_CHAT_CHANNEL: (state, payload) => {
            window.sessionStorage.setItem('pliziChatChannel', payload);
            state.chatChannel = payload;
        },
        SET_AUTH : (state, payload) => {
            state.isAuth = payload;
        },
    },

    actions: {
        SET_GWT : (context, payload) => {
            context.commit('SET_GWT', payload);
        },
        SET_CHAT_CHANNEL : (context, payload) => {
            context.commit('SET_CHAT_CHANNEL', payload);
        },
        SET_AUTH : (context, payload) => {
            context.commit('SET_AUTH', payload);
        },

        SET_USER : (context, payload) => {
            window.localStorage.setItem('pliziUser', JSON.stringify(payload));
            context.commit('SET_USER', payload);
        },

        GET_USER : async (context, payload) => {
            const gwt = store.getters.gwToken+'';

            if (!gwt || ``===gwt)
                return null;

            const config = {
                headers : {
                    Authorization: `Bearer ${gwt}`
                }
            };

            let response = await HTTPer.get('api/user', config);
            if (200 === response.status) {
                context.commit('SET_USER', response.data.data);
                context.commit('SET_CHAT_CHANNEL', response.data.channel);
                return response.data.data;
            }

            window.console.warn(response);
            return null;
        },

    },
});
