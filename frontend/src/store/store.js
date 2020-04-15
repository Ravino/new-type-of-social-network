import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        gwToken : ``,
        chatChannel : ``,
        lastSearch : ``,
        activeDialog: -1,
    },

    getters : {
        isAuth : state => {
            return state.isAuth;
        },

        activeDialog : state => {
            let acId = state.activeDialog;

            if (!acId  ||  acId<=0) {
                acId = window.localStorage.getItem('pliziActiveDialog')+'';
                acId = acId >>> 0;
            }

            if (acId >= 0) {
                state.activeDialog = acId;
                return acId;
            }

            return state.activeDialog;
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

        lastSearch : state => {
            let lst = state.lastSearch;

            if (!lst  ||  ``===lst) {
                lst = window.localStorage.getItem('pliziLastSearch');
            }

            if (lst  &&  lst !== ``) {
                state.lastSearch = lst;
                return lst;
            }

            return state.lastSearch;
        },

        chatChannel : state => {
            let pc = state.chatChannel;

            if (pc===null  ||  pc===``){
                pc = window.localStorage.getItem('pliziChatChannel');

                if (pc!==null  &&  pc!==``){
                    return pc;
                }
            }

            return state.chatChannel;
        },

        /**
         * @deprecated
         * @param state
         * @returns {null|{headers: {Authorization: string}}}
         */
        getHTTPConfig : state => {
            const gwt = state.gwToken;
            window.console.warn(`getHTTPConfig deprecated!!!`);

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
        SET_GWT : (state, payload) => {
            state.gwToken = payload;
            window.localStorage.setItem('pliziJWToken', payload);
        },

        SET_LAST_SEARCH : (state, payload) => {
            state.lastSearch = payload;
            window.localStorage.setItem('pliziLastSearch', payload);
        },

        SET_CHAT_CHANNEL: (state, payload) => {
            state.chatChannel = payload;
            window.localStorage.setItem('pliziChatChannel', payload);
        },

        SET_ACTIVE_DIALOG: (state, payload) => {
            state.activeDialog = payload;
            window.localStorage.setItem('pliziActiveDialog', payload);
        },
    },

    actions: {
        SET_GWT : (context, payload) => {
            context.commit('SET_GWT', payload);
        },

        SET_LAST_SEARCH : (context, payload) => {
            context.commit('SET_LAST_SEARCH', payload);
        },

        SET_CHAT_CHANNEL : (context, payload) => {
            context.commit('SET_CHAT_CHANNEL', payload);
        },

        SET_ACTIVE_DIALOG : (context, payload) => {
            context.commit('SET_ACTIVE_DIALOG', payload);
        },
    },
});

export default store;
