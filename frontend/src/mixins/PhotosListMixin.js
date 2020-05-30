const PhotosListMixin = {
data(){
    return {
        userPhotos: null,
        isPhotosDataReady: false
    }
},
methods: {
    async getUserPhotos(userId) {
        let apiResponse = null;
        try {
            apiResponse = await this.$root.$api.$users.lastPhotos(userId);
        }
        catch (e){
            window.console.warn(e.detailMessage);
            throw e;
        }
        if (apiResponse) {
            this.userPhotos = apiResponse;
            this.isPhotosDataReady = true;
        }
    },
}

};

export {PhotosListMixin as default}
