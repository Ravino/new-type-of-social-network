<template>
    <div class="chat-header-action-menu">
        <button class="btn btn-link --plizi-friend-item-settings"
                id="chatHeaderMenu"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
            <i class="dots-vertical"></i>
        </button>

        <div class="dropdown-menu dropdown-menu-right py-3" aria-labelledby="chatHeaderMenu">
            <div class="nav-item">
                <span class="dropdown-item px-3 py-1 cursor-pointer" @click.prevent="onAddAttendeeClick">
                    создать групповой чат
                </span>
            </div>
            <div class="nav-item">
                <a href="#" class="dropdown-item px-3 py-1">
                    Какое-то действие
                </a>
            </div>

            <div class="nav-item">
                <a href="#" class="dropdown-item px-3 py-1">
                    Какое-то действие
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name : 'ChatHeaderMenu',

methods: {
    onAddAttendeeClick(){
        this.$emit(`showAddAttendeeToDialogModal`, {});
    }
}

}
</script>
