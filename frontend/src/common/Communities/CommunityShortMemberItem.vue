<template>
    <div class="plz-short-members-item d-flex align-items-center py-2 px-3">

        <router-link tag="a" class="plz-short-member-userpic text-body" :to="`/user-`+member.id">
<!--            TODO: @TGA Серёжа - потом стиль отсюда уберёшь и сделаешь классами -->
            <img class="plz-short-userpic rounded-circle" :src="member.userPic" :alt="member.firstName" style="max-width: 50px; height: auto" />

            <span v-if="member.isOnline" class="plz-short-isonline" title="в сети"></span>
            <span v-else class="plz-short-isoffline"></span>
        </router-link>

        <div class="plz-short-member-title flex align-items-center mr-auto ">
            <router-link :to="`/user-`+member.id" class="plz-short-member-name">
                {{member.firstName}}
            </router-link>

            <div class="plz-short-member-status">
                <p>лет {{member.birthDate | calcAge}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import PliziMember from '../../classes/PliziMember.js';

export default {
name : 'CommunityShortMemberItem',
components : {},
props : {
    member : PliziMember,
},

data(){
    return {
        isInRedirecting : false
    }
}

}
</script>
