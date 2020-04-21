<template>
    <div class="modal" id="resendMessageModal" tabindex="-1" role="dialog" aria-labelledby="resendMessageModal"
          aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
          @click.stop="hideMessageResendModal">

        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">

                <div id="resendMessageModalBody" class="modal-body p-4">
                    <h5 class="resend-message-title text-left mb-3">Переслать собщение</h5>

                    <form id="resendMessageModalForm" novalidate="novalidate">
                        <div class="form-group">
                            <multiselect v-model="value"
                                         :options="options"
                                         :searchable="false"
                                         :close-on-select="true"
                                         :show-labels="false"
                                         :multiple="true"
                                         placeholder="Pick a value"></multiselect>
                        </div>

                        <div class="form-group position-relative">
                            <h5 class="title-h5 ml-1">Ваше сообщение</h5>
                            <div class="d-flex resend-message-row mb-3">
                                <div class="col-8 py-0 px-0">

                                    <textarea-autosize
                                        class="form-control profileWhatsNew-textarea pb-0 pl-2"
                                        placeholder="Начните печатать текст..."
                                        ref="myTextarea"
                                        v-model="textareaValue"
                                        :min-height="10"
                                        :max-height="200"
                                    />
                                </div>
                                <div class="col-4 ml-auto py0 pr-0 d-flex align-items-center justify-content-end">
                                    <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-file position-relative">
                                        <IconAddFile />
                                        <input type="file">
                                    </label>
                                    <label class="attach-file btn btn-link my-0 ml-0 mr-2 px-1 btn-add-camera position-relative">
                                        <IconAddCamera />
                                        <input type="file">
                                    </label>

                                    <button class="btn btn-link mx-0 px-1 btn-add-smile" type="button">
                                        <IconAddSmile />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group mb-4">
                            <div class="message-resend pl-3 ml-1 mt-3" >
                                <div class="message-user-data  d-flex align-items-center mb-2 ">
                                    <div class="media-pic border rounded-circle  mr-3">
                                        <img src="/images/user-photos/user-photo-01.png" alt="Дарья">
                                    </div>
                                    <div class="media-body">
                                        <h6 class="chatHeader-title w-75 align-self-start mt-2 pb-0 mb-0 pull-left text-body"
                                            style="line-height: 20px;"> Дарья </h6>
                                        <p class="chatHeader-subtitle p-0 mb-0 mt-1 w-100 d-block"> Понедельник </p>
                                    </div>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, sit!</p>
                            </div>
                        </div>
                    </form>

                    <button id="resendMessageSacces"
                            type="submit"
                            class="btn plz-btn plz-btn-primary mt-4">
                        Отправить
                    </button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import IconAddFile from '../icons/IconAddFile.vue';
import IconAddCamera from '../icons/IconAddCamera.vue';
import IconAddSmile from '../icons/IconAddSmile.vue';

export default {
name: 'ResendMessageModal',
components: { IconAddCamera, IconAddSmile, IconAddFile },
props: {
    pickedID: Number,
},
data() {
    return {
        value: [
             'Pitter Pen'
        ],
        options: ['Vue.js', 'Javascript', 'Open Source', 'os' ],
        textareaValue: ''
    }
},
methods: {
    hideMessageResendModal() {
        this.$root.$emit('hideMessageResendModal', {});
    },

    addTag (newTag) {
        const tag = {
            name: newTag,
            code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        };
        this.options.push(tag);
        this.value.push(tag);
    }
}
}
</script>
