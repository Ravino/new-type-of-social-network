<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" :aria-labelledby="modalId"
         aria-hidden="true">
        <div class="modal-dialog"
             :class="{'modal-dialog-centered': vertically}"
             role="document">
            <div class="modal-content">
                <slot name="header"></slot>
                <div class="modal-body">
                    <slot></slot>
                </div>

                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            modalId: {
                type: String,
                default: null,
                required: true,
            },
            vertically: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>

<style scoped>

</style>
