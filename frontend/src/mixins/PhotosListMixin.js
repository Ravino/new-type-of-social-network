import PliziAttachment from "../classes/PliziAttachment";

const PhotosListMixin = {
data(){
    return {
        userPhotos: [],
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
            apiResponse.forEach((image) => {
                this.userPhotos.push(new PliziAttachment(image));
            });
            this.isPhotosDataReady = true;
        }
    },
}

};

export {PhotosListMixin as default}
