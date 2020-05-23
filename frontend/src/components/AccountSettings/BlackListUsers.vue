<template>
    <div id="blackList"
         class="plz-account-settings bg-white-br20 plz-mb20 container-fluid">
        <form class="plz-account-settings-form pb-0 px-3 mb-0">
            <div class="plz-account-settings-header row border-bottom">
                <div class="d-flex">
                    <h6>Черный список</h6>
                </div>
            </div>

            <div class="plz-account-settings-body">
                <div v-if="isBlacklistDataReady" class="form-group row border-bottom">
                    <BlackListItem v-for="userItem in blockedUsers.asArray()"
                                   :key="'blockedUserItem-' + userItem.id" :userItem="userItem">
                    </BlackListItem>
                </div>
                <div v-else>
                    <div class="alert alert-info">
                        В вашем чёрном списке нет пользователей
                    </div>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    import BlackListItem from "./BlackListItem";
    import PliziCollection from "../../classes/PliziCollection";

    export default {
        name: 'BlackListUsers',
        components: {
            BlackListItem
        },
        props: {
            blockedUsers: PliziCollection | null,
            isBlacklistDataReady: Boolean
        },
        data() {
            return {}
        },
        methods: {},
        mounted() {
        },
    }
</script>
