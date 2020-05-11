<template>
    <div id="communityMyFriends" class="bg-white-br20 mb-4 py-3 px-4 text-center ">
        <div class="plizi-community-item-body-friends d-flex flex-wrap w-100 align-items-center">
            <div class="plizi-community-item-body-friends-pics mr-4">
                <div class="plizi-community-item-body-friends-pic position-relative rounded-circle">
                    <img src="https://plizi.s3.eu-north-1.amazonaws.com/images/originals/Sx3zRic44zm2mPiMUahypL3hlKw8SuwBsKtm11Jb.png" alt="image">
                </div>
                <div class="plizi-community-item-body-friends-pic position-relative rounded-circle">
                    <img src="https://plizi.s3.eu-north-1.amazonaws.com/images/originals/Sx3zRic44zm2mPiMUahypL3hlKw8SuwBsKtm11Jb.png" alt="image">
                </div>
                <div class="plizi-community-item-body-friends-pic position-relative rounded-circle">
                    <img src="https://plizi.s3.eu-north-1.amazonaws.com/images/originals/Sx3zRic44zm2mPiMUahypL3hlKw8SuwBsKtm11Jb.png" alt="image">
                </div>
                <div class="plizi-community-item-body-friends-pic position-relative rounded-circle">
                    <img src="https://plizi.s3.eu-north-1.amazonaws.com/images/originals/Sx3zRic44zm2mPiMUahypL3hlKw8SuwBsKtm11Jb.png" alt="image">
                </div>
                <div class="plizi-community-item-body-friends-pic position-relative rounded-circle">
                    <img src="https://plizi.s3.eu-north-1.amazonaws.com/images/originals/Sx3zRic44zm2mPiMUahypL3hlKw8SuwBsKtm11Jb.png" alt="image">
                </div>
            </div>
            <p class="plizi-community-item-desc">5 друзей</p>
        </div>
    </div>


</template>

<script>
import PliziCommunity from '../../classes/PliziCommunity.js';

export default {
name : 'CommunityFriendsInformer',
props: {
    community: PliziCommunity
},
}
</script>
