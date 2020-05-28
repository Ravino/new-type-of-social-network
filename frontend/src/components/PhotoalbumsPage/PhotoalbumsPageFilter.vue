<template>
    <div id="photoalbumPageFilter" class="row bg-white-br20 mb-4 pt-0 px-4">
        <div class="col-12 d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-between px-0 ">
            <nav class="videos-filter-links col-lg-7 nav pt-2 pt-sm-0" role="tablist">
                <span class="nav-link py-2 py-sm-3 px-1 mr-sm-4" :class="{ 'active': wMode === 'my' }" id="tabMyPhotoalbums" role="tab"
                      @click.stop="ontabChange">Мои альбомы</span>
            </nav>

            <div class="additionalBtns col-12 col-sm-5 d-flex justify-content-between justify-content-sm-end px-0  my-3 my-sm-0">
                <template v-if="wMode === 'my'">
                    <PhotoalbumCreateBlock></PhotoalbumCreateBlock>
                </template>
                <template v-else>
                    <button type="button" @click.stop="onAttachBtnClick($event)"
                            :class="{'attach-file--disallow cursor-non-drop' : isDisallowUpload}"
                            class="attach-file btn-add-file w-100 d-flex align-items-center justify-content-center add-photos btn btn-link my-0 mx-0 mr-md-2 px-1 position-relative">
                        Добавить фотографии
                        <input type="file" class="plz-text-editor-file-picker"
                               :disabled="isDisallowUpload" @change="onSelectFile()" ref="editorFiler" multiple />
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import PhotoalbumCreateBlock from "./PhotoalbumCreateBlock.vue";

export default {
    name: "PhotoalbumsPageFilter",
    components: {
        PhotoalbumCreateBlock
    },
    data() {
        return {
            wMode: `my`
        }
    },
    methods: {
        onAttachBtnClick(ev){
            let $btn = null;
            if (ev.target.tagName.toUpperCase() === 'BUTTON') {
                $btn = $(ev.target);
            }
            else {
                $btn = $(ev.target).closest('button.attach-file');
            }

            const $file = $btn.find('input.plz-text-editor-file-picker');
            $file.click();
        },
        ontabChange() {
            if (this.$route.name !== 'PhotoalbumsListPage') {
                this.$router.push({ path: '/photoalbums-list' });
                this.wMode = 'album';
            }
        }
    },
    mounted() {
        if (this.$route.name !== 'PhotoalbumsListPage') {
            this.wMode = 'album';
        }
    }
}
</script>


