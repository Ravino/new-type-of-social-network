<template>
    <div class="mr-3 cursor-pointer">
        <div class="media-pic border rounded-circle" @click.prevent="onPlusClick">
<!--            <IconUserPlus class="w-50 h-50 mx-2 my-2" />-->
            <IconFriends class="w-50 h-50 mx-2 my-2" />
        </div>
    </div>
</template>

<script>
import IconUserPlus from '../../icons/IconUserPlus.vue';
import IconFriends from '../../icons/IconFriends.vue';

export default {
name : 'ChatHeaderAttendeePlus',
components:{ IconUserPlus, IconFriends },

methods : {
    onPlusClick(){
        this.$emit('ShowAddAttendeeModal', {});
    }
}

}
</script>
