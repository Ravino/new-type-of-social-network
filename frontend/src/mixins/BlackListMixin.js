const BlackListMixin = {
data(){
    return {
        isAddedToBlacklist: false,
    }
},
methods: {
    async addToBlacklist() {
        if (this.isAddedToBlacklist) {
            this.$root.$alert(`Пользователь уже внесен в чёрный список`, 'bg-warning', 3);
            return true;
        }

        let apiResponse = null;
        try {
            apiResponse = await this.$root.$api.$users.blacklistAdd(this.userData.id);
        } catch (e) {
            if (e.status === 422) {
                (console.log('выбранный пользователь уже добавлен в Ваш чёрный список'));
                this.isAddedToBlacklist = true;
                return;
            }
            window.console.warn(e.detailMessage);
        }

        this.isAddedToBlacklist = true;
        this.$root.$alert(`Вы добавили пользователя в чёрный список`, 'bg-success', 3);
    },
    async deleteFromBlacklist(userId) {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$users.blacklistDelete(userId);
        } catch (e) {
            window.console.warn(e.detailMessage);
            throw e;
        }

        this.isAddedToBlacklist = false;
        this.$root.$alert(`Вы удалили пользователя из чёрного списка`, 'bg-success', 3);
    }
}

};

export {BlackListMixin as default}
