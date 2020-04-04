<template>
    <div id="accountToolbarLeft" class="--card py-2">

        <AccountToolbarLeftGrey></AccountToolbarLeftGrey>

        <AccountToolbarLeftColor></AccountToolbarLeftColor>

    </div>
</template>

<script>
import AccountToolbarLeftGrey from './AccountToolbarLeftGrey.vue';
import AccountToolbarLeftColor from './AccountToolbarLeftColor.vue';

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
