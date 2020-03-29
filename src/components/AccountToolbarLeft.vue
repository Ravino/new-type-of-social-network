<template>
    <div id="accountToolbarLeft" class="--card py-2">

        <AccountToolbarLeftGrey></AccountToolbarLeftGrey>

        <AccountToolbarLeftColor></AccountToolbarLeftColor>

    </div>
</template>

<script>
import AccountToolbarLeftGrey from '../components/AccountToolbarLeftGrey.vue';
import AccountToolbarLeftColor from '../components/AccountToolbarLeftColor.vue';

export default {
name: 'AccountToolbarLeft',
components: { AccountToolbarLeftGrey, AccountToolbarLeftColor },
    data () {
    return {
    }
},

methods: {
}

}
</script>
