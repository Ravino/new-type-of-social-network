const BlackListMixin = {

methods: {
    async deleteFromBlacklist(userId) {
        let apiResponse = null;

        try {
            apiResponse = await this.$root.$api.$users.blacklistDelete(userId);
        } catch (e) {
            window.console.warn(e.detailMessage);
            throw e;
        }

        return true;
    }
}

};

export {BlackListMixin as default}
