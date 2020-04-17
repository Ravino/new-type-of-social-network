<template>
    <div id="navbarWatcher" class="--btn-block mt-2 d-inline-block">
        <NavBarNotifications></NavBarNotifications>

        <NavBarMessages></NavBarMessages>

        <NavBarFriends></NavBarFriends>
    </div>
</template>

<script>
import NavBarNotifications from './NavBarNotifications.vue';
import NavBarMessages from './NavBarMessages.vue';
import NavBarFriends from './NavBarFriends.vue';

export default {
name : 'NavBarWatcher',
components : { NavBarNotifications, NavBarMessages, NavBarFriends}
}
</script>
