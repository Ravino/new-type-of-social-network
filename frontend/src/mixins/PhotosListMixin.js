const PhotosListMixin = {
data(){
    return {

    }
},
methods: {
    async getUserPhotos(userId = null) {
        let apiResponse = null;
        if (userId === null) {
            try {
                apiResponse = await this.$root.$api.$users.lastPhotos();
            } catch (e) {
                if (e.status === 422) {
                    (console.log('выбранный пользователь уже добавлен в Ваш чёрный список'));
                    this.isAddedToBlacklist = true;
                    return;
                }
                window.console.warn(e.detailMessage);
            }
        }

        this.$root.$alert(`Вы добавили пользователя в чёрный список`, 'bg-success', 3);
    },
}

};

export {PhotosListMixin as default}
