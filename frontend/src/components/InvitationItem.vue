<template>
    <li class="plizi-invitation-item-user --media m-0 px-4 py-2" :class="calcClazz()">
        <div class="plizi-invitation-item d-flex ">
            <router-link :to="`/user-`+invitation.id" tag="div" class="plizi-invitation-item-pic mr-3">
                <img class="plizi-invitation-item-img rounded-circle overflow-hidden" v-bind:src="invitation.userPic" v-bind:alt="invitation.fullName" />
                <span v-if="invitation.isOnline" class="plizi-invitation-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-invitation-item-isoffline"></span>
            </router-link>

            <div class="plizi-invitation-item-body m-0 pr-5">
                <div class="plizi-invitation-item-top d-flex align-items-start justify-content-between">
                    <router-link :to="`/user-`+invitation.id" tag="h6" class="plizi-invitation-item-name my-0"
                                 :title=" invitation.fullName ">
                        {{ invitation.fullName }}
                    </router-link>
                </div>

                <div class="plizi-invitation-item-top d-flex align-items-end justify-content-between">
                    <!--                    {{invitation.notifMessage}}-->
                    <p class="plizi-invitation-item-desc mb-1"> хочет к Вам в друзья</p>
                </div>

                <div class="plizi-invitation-item-body-bottom d-flex pr-5">
                    <p class="plizi-invitation-item-subdesc p-0 my-0  d-inline-block ">
                        <time :datetime="invitation.lastActivity" class="">
                            {{ invitation.lastActivity | lastMessageTime }}
                        </time>
                    </p>
                </div>
            </div>

            <div class="align-self-center ml-auto">
                <div class="btn-group">
                    <button class="btn btn-success btn-sm rounded" @click="acceptInvitation()">
                        <i class="fas fa-check"></i>&nbsp;Принять
                    </button>
                    <button class="btn btn-danger btn-sm ml-2 rounded" @click="declineInvitation()">
                        <i class="fas fa-stop"></i>&nbsp;Отказать
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
            response = await this.$root.$api.$friend.invitationAccept(this.invitation.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (response != null) {
            this.isAccepted = true;
            this.$root.$alert(`Вы подтвердили заявку от ${this.invitation.fullName}`, `bg-success`, 5);
            this.$root.$emit('InvitationAccept', {
                invitationId: this.invitation.id
            });
        }
        else {
            window.console.info(response);
        }
    },


    async declineInvitation(){
        let response = null;

        try {
            response = await this.$root.$api.$friend.invitationDecline(this.invitation.id);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }

        if (response != null) {
            this.isDeclined = true;
            this.$root.$alert(`Вы отклонили заявку от ${this.invitation.fullName}`, `bg-warning`, 5);
            this.$root.$emit('InvitationDecline', {
                invitationId: this.invitation.id
            });
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


