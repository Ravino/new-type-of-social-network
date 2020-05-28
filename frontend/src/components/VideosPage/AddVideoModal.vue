<template>
    <div class="modal" id="chatVideoModal" tabindex="-1" role="dialog" aria-labelledby="chatVideoModal"
         aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
         @click.stop="onHide">

        <div class="modal-dialog modal-xl modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">
                <form class="p-5" @submit.prevent="store">
                    <div class="form-group">
                        <label for="link">Ссылка на видео</label>
                        <input type="text"
                               class="form-control"
                               :class="{ 'is-invalid': isLinkError}"
                               @input="onInput('link')"
                               id="link"
                               v-model="form.link">

                        <div v-if="isLinkError"
                             class="invalid-feedback">
                            {{ linkErrors }}
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                    <p v-if="isSuccess" class="text-success pt-3 mb-0">
                        Ссылка на видео успешно добавлено.
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddVideoModal",
        computed: {
            isLinkError() {
                return this.errors && this.errors.link;
            },
            linkErrors() {
                return this.errors.link[0];
            },
        },
        data() {
            return {
                form: {
                    link: null,
                },
                isSuccess: false,
                errors: null,
            }
        },
        methods: {
            onHide() {
                this.$emit('onHide');
            },
            onInput(fieldName) {
                if (this.errors && this.errors[fieldName]) {
                    this.errors[fieldName] = null;
                }
            },

            async store() {
                this.errors = null;

                let response;
                let formData = {
                    link: this.form.link
                };

                try {
                    response = await this.$root.$api.$video.storeVideo(formData);
                } catch (e) {
                    console.warn(e.detailMessage);
                    this.errors = e.data.errors;
                }

                if (response) {
                    this.isSuccess = true;
                    this.$root.$emit('onAddVideo', {
                        id: response.id,
                        link: this.form.link,
                    });

                    setTimeout(() => {
                        this.isSuccess = false;
                    }, 3000);
                }
            },
        },
    }
</script>

<style scoped>

</style>
