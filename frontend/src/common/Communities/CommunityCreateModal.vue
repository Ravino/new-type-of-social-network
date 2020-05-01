<template>
    <div class="modal" id="communityCreateModal" tabindex="-1" role="dialog" aria-labelledby="communityCreateModal"
         aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
         @click.stop="hideCommunityCreateModal">

        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20">

                <div id="resendMessageModalBody" class="modal-body p-4">
                    <h5 class="resend-message-title text-left mb-3">Создать сообщество</h5>

                    <div class="text-center my-5">
                        Публикуйте материалы разных форматов, общайтесь с читателями, изучайте статистику и подключайте монетизацию.<br />
                        Для начала выберите тип сообщества.
                    </div>

                    <form class="form" @submit.prevent="">
                        <div class="form-group row">
                            <label for="commType" class="col-4 col-form-label">Тип сообщества:</label>
                            <div class="col-8">
                                <select v-model="community.type"
                                    id="commType" ref="commType" class="form-control">
                                    <option value="bussines">Бизнес</option>
                                    <option value="tematic">Тематическое сообщество</option>
                                    <option value="brand">Бренд или организация</option>
                                    <option value="interest">Группа по интересам</option>
                                    <option value="public">Публичная страница</option>
                                    <option value="event">Мероприятие</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commName" class="col-4 col-form-label">Название<b class="text-danger">*</b>:</label>
                            <div class="col-8">
                                <input v-model="community.name" type="text" id="commName" ref="commName" class="form-control" required />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commDescription" class="col-4 col-form-label">Описание<b class="text-danger">*</b>:</label>
                            <div class="col-8">
                                <input v-model="community.description" type="text" id="commDescription" ref="commDescription" class="form-control"  required />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commNotice" class="col-4 col-form-label">Notice<b class="text-danger">*</b>:</label>
                            <div class="col-8">
                                <input v-model="community.notice" type="text" id="commNotice" ref="commNotice" class="form-control" required />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commTema" class="col-4 col-form-label">Тематика:</label>
                            <div class="col-8">
                                <select v-model="community.tema" id="commTema" ref="commType" class="form-control">
                                    <option value="auto">Авто</option>
                                    <option value="cities">Города</option>
                                    <option value="games">Игры</option>
                                    <option value="gardens">Садоводство</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commURL" class="col-4 col-form-label">Сайт (url)<b class="text-danger">*</b>:</label>
                            <div class="col-8">
                                <input v-model="community.url" type="text" id="commURL" ref="commURL" class="form-control" required />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commWebSite" class="col-4 col-form-label">URL (website)<b class="text-danger">*</b>:</label>
                            <div class="col-8">
                                <input v-model="community.website" type="url" id="commWebSite" ref="commWebSite" class="form-control" required />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commPrivacy" class="col-4 col-form-label">Приватность:</label>
                            <div class="col-8">
                                <select v-model="community.privacy" id="commPrivacy" ref="commPrivacy" class="form-control">
                                    <option value="public">Открытая</option>
                                    <option value="protected">Закрытая</option>
                                    <option value="private">Частная</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commLocation" class="col-4 col-form-label">Адрес<b class="text-danger">*</b>:</label>
                            <div class="col-8">
                                <input v-model="community.location" type="text" id="commLocation" ref="commLocation" class="form-control" required />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="commLocation" class="col-4"></label>
                            <div class="col-8">
                                <button @click.stop="startCreateCommunity()" type="button" class="btn btn-primary rounded-pill">Создать сообщество</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
name: 'CommunityCreateModal',
components: {
},
props: {
},
data(){
    return {
        community: {
            type: `interest`,
            name: ``,
            description: ``,
            notice: ``,
            tema: `games`,
            url: ``,
            website: ``,
            privacy: `protected`,
            location: ``,
        }
    }
},
methods: {
    hideCommunityCreateModal() {
        this.$emit('HideCommunityCreateModal', {});
    },

    startCreateCommunity(){
        window.console.dir( JSON.parse( JSON.stringify(this.community) ) );

        if (this.community.name &&  this.community.description  &&  this.community.notice  &&  this.community.url  &&  this.community.location) {
            this.createCommunity();
        }
    },

    async createCommunity() {
        let apiResponse = null;

        let formData = {
            name: this.community.name.trim(),
            description: this.community.description.trim(),
            notice: this.community.notice.trim(),
            url: this.community.url.trim(),
            website: this.community.website.trim(),
            location: this.community.location.trim()
        };

        try {
            apiResponse = await this.$root.$api.$communities.communityCreate(formData);
            this.hideCommunityCreateModal();
        }
        catch (e) {
            console.warn(e.detailMessage);
        }

        if (apiResponse) {
            this.$emit('AddNewCommunity', apiResponse);
        }
    }
},
}
</script>
