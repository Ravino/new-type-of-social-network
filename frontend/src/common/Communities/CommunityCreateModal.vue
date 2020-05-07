<template>
    <div class="modal community-create-modal" id="communityCreateModal"
         tabindex="-1" role="dialog" aria-labelledby="communityCreateModal"
         aria-hidden="true" style="display: block; background-color: rgba(0, 0, 0, .7);"
         @click.stop="hideCommunityCreateModal">

        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop="">
            <div class="modal-content bg-white-br20 overflow-hidden">

                <div class="modal-body p-0 pt-3">
                    <div class="community-create-modal-box p-4">
                        <h5 class="community-create-modal-title text-center mb-2">Создать сообщество</h5>

                        <div class="d-flex align-items-center justify-content-center">
                            <img src="images/icons/icon-communities.png" alt="image">
                        </div>

                        <p class="community-create-modal-desc text-center mb-4 mt-3">
                            Публикуйте материалы разных форматов, общайтесь с читателями, изучайте статистику и подключайте монетизацию.<br />
                            Для начала выберите тип сообщества.
                        </p>
                    </div>

                    <form class="form community-create-modal-form p-0"
                          @submit.prevent="">
                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commType" class="col-4 community-create-modal-label text-right">Тип сообщества:</label>
                            <div class="col-8 position-relative">
                                <select v-model="community.type"
                                    id="commType" ref="commType" class="form-control  community-create-modal-select">
                                    <option value="bussines">Бизнес</option>
                                    <option value="tematic">Тематическое сообщество</option>
                                    <option value="brand">Бренд или организация</option>
                                    <option value="interest">Группа по интересам</option>
                                    <option value="public">Публичная страница</option>
                                    <option value="event">Мероприятие</option>
                                </select>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commName" class="col-4 community-create-modal-label  text-right">Название<b class="text-danger">*</b>:</label>
                            <div class="col-8  position-relative">
                                <input v-model="community.name" type="text" id="commName" ref="commName" class="form-control  community-create-modal-select" required />
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commDescription" class="col-4 community-create-modal-label  text-right">Описание<b class="text-danger">*</b>:</label>
                            <div class="col-8  position-relative">
                                <input v-model="community.description" type="text" id="commDescription" ref="commDescription" class="form-control  community-create-modal-select"  required />
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commNotice" class="col-4 community-create-modal-label  text-right">Notice<b class="text-danger">*</b>:</label>
                            <div class="col-8  position-relative">
                                <input v-model="community.notice" type="text" id="commNotice" ref="commNotice" class="form-control  community-create-modal-select" required />
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commTema" class="col-4 community-create-modal-label  text-right">Тематика:</label>
                            <div class="col-8  position-relative">
                                <select v-model="community.tema" id="commTema" ref="commType" class="form-control  community-create-modal-select">
                                    <option value="auto">Авто</option>
                                    <option value="cities">Города</option>
                                    <option value="games">Игры</option>
                                    <option value="gardens">Садоводство</option>
                                </select>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commURL" class="col-4 community-create-modal-label  text-right">Сайт (url)<b class="text-danger">*</b>:</label>
                            <div class="col-8  position-relative">
                                <input v-model="community.url" type="text" id="commURL" ref="commURL" class="form-control  community-create-modal-select" required />
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commWebSite" class="col-4 community-create-modal-label  text-right">URL (website)<b class="text-danger">*</b>:</label>
                            <div class="col-8  position-relative">
                                <input v-model="community.website" type="url" id="commWebSite" ref="commWebSite" class="form-control  community-create-modal-select" required />
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commPrivacy" class="col-4 community-create-modal-label  text-right">Приватность:</label>
                            <div class="col-8  position-relative">
                                <select v-model="community.privacy" id="commPrivacy"
                                        ref="commPrivacy"
                                        class="form-control community-create-modal-select">
                                    <option value="public">Открытая</option>
                                    <option value="protected">Закрытая</option>
                                    <option value="private">Частная</option>
                                </select>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5">
                            <label for="commLocation" class="col-4 community-create-modal-label  text-right">Адрес<b class="text-danger">*</b>:</label>
                            <div class="col-8  position-relative">
                                <input v-model="community.location" type="text" id="commLocation" ref="commLocation" class="form-control  community-create-modal-select" required />
                            </div>
                        </div>

                        <div class="form-group d-flex align-items-center px-5 py-4 community-create-modal-footer mb-0">
                            <label for="communityRules" class="col-7 radio mb-0">
                                <input class="mb-0"
                                       type="checkbox" name="communityRules"
                                 ref="communityRules" id="rules" checked />
                                <span class="mb-0">Я прочитал и согласен с  <a class="text-link" href="#">правилами</a> </span>
                            </label>
                            <div class="col-5 d-flex align-items-center justify-content-end">
                                <button @click.stop="startCreateCommunity()" type="button" class="btn w-100 btn-primary rounded-pill">Создать сообщество</button>
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
