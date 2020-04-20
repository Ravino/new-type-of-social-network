<template>
    <router-link :to="`/user-`+srItem.id" tag="li" class="plizi-sr-item-user media m-0 px-4 py-2">
        <div class="plizi-sr-item d-flex col-12">
            <div class="plizi-sr-item-pic mr-3 ">
                <img class="plizi-sr-item-img rounded-circle overflow-hidden" v-bind:src="srItem.userPic" v-bind:alt="srItem.fullName" />
                <span v-if="srItem.isOnline" class="plizi-sr-item-isonline" title="онлайн"></span>
                <span v-else class="plizi-sr-item-isoffline"></span>
            </div>

            <div class="plizi-sr-item-body m-0 col-12 pr-5 ">
                <div class="plizi-sr-item-top d-flex align-items-end justify-content-between">
                    <h6 class="plizi-sr-item-name my-0">
                        {{ srItem.fullName }}
                    </h6>
                </div>

                <div class="plizi-sr-item-body-bottom d-flex pr-5">
                    <p class="plizi-sr-item-desc p-0 my-0  d-inline ">
                        <time :datetime="srItem.lastActivity" class="">
                            {{ srItem.lastActivity | lastEventTime }}
                        </time>
                    </p>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import PliziUser from '../classes/PliziUser.js';

export default {
name : 'SearchResultItem',
props : {
    srItem : PliziUser
}

}
</script>

<style lang="scss">
$srUserPicSize: 48px;
$srItemTimeColor: #9A9A9A;
$srItemNameColor: #363636;
$srItemOnlineColor: #9FCD48;
$srItemOfflineColor: #CACAC9;


.plizi-sr-item-user {
    transition: .4s;
    &:hover {
        background-color: #e6e7eb !important;
    }

    .user-friend-desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.plizi-sr-item {
    cursor: pointer;

    &-pic {
        display: inline-block;
        position: relative;
        height: $srUserPicSize;
        width: $srUserPicSize;

        img {
            display: inline-block;
            width: $srUserPicSize;
            height: $srUserPicSize;
        }
    }

    &-isonline {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        right: 0px;
        bottom: 0px;
        background-color: $srItemOnlineColor;
        border: 1px solid white;
        border-radius: 100%;
    }

    &-isoffline {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        right: 0px;
        bottom: 0px;
        background-color: $srItemOfflineColor;
        border: 1px solid white;
        border-radius: 100%;
    }

    &-body {
        &-top {
            time {
                font-size: 11px;
                color: $srItemTimeColor; // add color to var
            }

        }
    }

    &-name {
        font-size: 13px;
        font-weight: 600;
        color: $srItemNameColor;
        line-height: 20px;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
            color: $srItemTimeColor;
        }
    }

    &-desc {
        font-size: 12px;
        color: $srItemTimeColor;
    }

    &-details {
        font-size: 12px;
        color: $srItemNameColor;
    }

}
</style>
