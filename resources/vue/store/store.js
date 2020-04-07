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
        isAuth : state => {
            return state.isAuth;
        },

        gwToken : state => {
            let gwt = state.gwToken;

            if (!gwt  ||  ``===gwt) {
                gwt = window.localStorage.getItem('pliziJWToken');
            }

            if (gwt !== ``) {
                state.gwToken = gwt;
                return gwt;
            }

            return state.gwToken;
        },

        userData : state => {
            return state.userData;
        },

        chatChannel:state => {
            if(!state.chatChannel){
                state.chatChannel = window.sessionStorage.getItem('pliziChatChannel')
            }
            return state.chatChannel;
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
        SET_AUTH : (state, payload) => {
            state.isAuth = payload;
        },

        SET_GWT : (state, payload) => {
            state.gwToken = payload;
            window.localStorage.setItem('pliziJWToken', payload);
        },

        SET_USER : (state, payload) => {
            if (payload !== null) {
                state.userData = payload;
                window.localStorage.setItem('pliziUser', JSON.stringify(payload));
            }
        },

        SET_CHAT_CHANNEL: (state, payload) => {
            state.chatChannel = payload;
            window.localStorage.setItem('pliziChatChannel', payload);
        },
    },

    actions: {
        SET_AUTH : (context, payload) => {
            context.commit('SET_AUTH', payload);
        },

        SET_GWT : (context, payload) => {
            context.commit('SET_GWT', payload);
        },

        SET_USER : (context, payload) => {
            context.commit('SET_USER', payload);
        },

        SET_CHAT_CHANNEL : (context, payload) => {
            context.commit('SET_CHAT_CHANNEL', payload);
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
