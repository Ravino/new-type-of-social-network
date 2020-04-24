<template>
    <videoPlayer :options="generatePlayerOptions"
                 class="w-100"/>
</template>

<script>
    // @link https://github.com/surmon-china/vue-video-player

    import 'video.js/dist/video-js.css';
    import {videoPlayer} from 'vue-video-player';
    import 'videojs-youtube/dist/Youtube.min';

    export default {
        name: "VideoPlayer",
        components: {
            videoPlayer,
        },
        props: {
            videoLink: {
                type: String,
                default: null,
            },
        },
        computed: {
            detectYoutubeLink() {
                let str = this.videoLink.replace(/<\/?[^>]+>/g, '').trim();
                let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                let match = str.match(regExp);

                return (match && match[7].length === 11) ? str : false;
            },
            generatePlayerOptions() {
                return {
                    techOrder: this.detectYoutubeLink ? ["youtube"] : null,
                    sources: [{
                        type: this.detectYoutubeLink ? 'video/youtube' : 'video/mp4',
                        src: this.detectYoutubeLink ? this.detectYoutubeLink : null,
                    }],
                    youtube: this.detectYoutubeLink ? { "iv_load_policy": 1 } : null,
                }
            },
        },
        data() {
            return {
                playerOptions: {
                    sources: [{
                        type: "video/youtube",
                        src: "https://www.youtube.com/watch?v=xjS6SftYQaQ"
                    }],
                    techOrder: ["youtube"],
                    youtube: { "iv_load_policy": 1 },
                },
            }
        },
    }
</script>

<style lang="scss">
    .video-player {
        .video-js {
            width: 100%;
            height: 500px;

            .vjs-big-play-button {
                left: 45%;
                top: 50%;
            }
        }
    }
</style>
