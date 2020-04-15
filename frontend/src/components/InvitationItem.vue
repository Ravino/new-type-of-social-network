<template>
    <li class="plizi-invitation-item-user --media m-0 px-4 py-2" :class="calcClazz()">
        <div class="plizi-invitation-item d-flex col-12">
            <router-link :to="`/user-`+invitation.id" tag="div" class="plizi-invitation-item-pic mr-3">
                <img class="plizi-invitation-item-img rounded-circle overflow-hidden" v-bind:src="invitation.userPic" v-bind:alt="invitation.fullName" />
                <span v-if="invitation.isOnline" class="plizi-invitation-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-invitation-item-isoffline"></span>
            </router-link>

            <div class="plizi-invitation-item-body m-0 pr-5">
                <div class="plizi-invitation-item-top d-flex align-items-end justify-content-between">
                    <router-link :to="`/user-`+invitation.id" tag="h6" class="plizi-invitation-item-name my-0">
                        {{ invitation.fullName }}
                    </router-link>
                </div>

                <div class="plizi-invitation-item-body-bottom d-flex pr-5">
                    <p class="plizi-invitation-item-desc p-0 my-0  d-inline ">
                        <time :datetime="invitation.lastActivity" class="">
                            {{ invitation.lastActivity | lastMessageTime }}
                        </time>
                    </p>
                </div>
            </div>

            <div class="align-self-end ml-auto">
                <div class="btn-group">
                    <button class="btn btn-primary btn-sm" @click="acceptInvitation()">
                        <i class="fas fa-check"></i>&nbsp;Принять дружбу
                    </button>
                    <button class="btn btn-warning btn-sm" @click="declineInvitation()">
                        <i class="fas fa-stop"></i>&nbsp;Отказ
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
name : 'InvitationItem',
props : {
    invitation : Object,
},
data(){
    return {
        isAccepted : false,
        isDeclined : false
    }
},

methods: {
    async acceptInvitation(){
        let response = null;

        try {
            response = await this.$root.$api.invitationAccept(this.invitation.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (response != null) {
            this.isAccepted = true;
            this.$root.$alert(`Вы подтвердили заявку от ${this.invitation.fullName}`, `bg-success`, 5);
            this.$root.$emit('invitationAccept', this.invitation);
        }
        else {
            window.console.info(response);
        }
    },


    async declineInvitation(){
        let response = null;

        try {
            response = await this.$root.$api.invitationDecline(this.invitation.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (response != null) {
            this.isDeclined = true;
            this.$root.$alert(`Вы отклонили заявку от ${this.invitation.fullName}`, `bg-warning`, 5);
            this.$root.$emit('invitationDecline', this.invitation);
        }
        else {
            window.console.info(response);
        }
    },


    calcClazz(){
        return {
            'bg-success' : this.isAccepted,
            'bg-danger'  : this.isDeclined
        };
    }

},

mounted(){
    //window.console.dir( JSON.parse( JSON.stringify(this.invitation) ), `InvitationItem` );
}

}
</script>

<style lang="scss">
$invitationUserPicSize: 48px;
$invitationTimeColor: #9A9A9A;
$invitationNameColor: #363636;
$invitationOnlineColor: #9FCD48;
$invitationOfflineColor: #CACAC9;


.plizi-invitation-item-user {
    transition: .4s;

    .user-friend-desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.plizi-invitation-item {
    &-pic {
        display: inline-block;
        position: relative;
        height: $invitationUserPicSize;
        width: $invitationUserPicSize;

        img {
            display: inline-block;
            width: $invitationUserPicSize;
            height: $invitationUserPicSize;
        }
    }

    &-isonline {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        right: 0px;
        bottom: 0px;
        background-color: $invitationOnlineColor;
        border: 1px solid white;
        border-radius: 100%;
    }

    &-isoffline {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        right: 0px;
        bottom: 0px;
        background-color: $invitationOfflineColor;
        border: 1px solid white;
        border-radius: 100%;
    }

    &-body {
        &-top {
            time {
                font-size: 11px;
                color: $invitationTimeColor; // add color to var
            }

        }
    }

    &-name {
        font-size: 13px;
        font-weight: 600;
        color: $invitationNameColor;
        line-height: 20px;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
            color: $invitationTimeColor;
        }
    }

    &-desc {
        font-size: 12px;
        color: $invitationTimeColor;
    }

    &-details {
        font-size: 12px;
        color: $invitationNameColor;
    }

}
</style>
