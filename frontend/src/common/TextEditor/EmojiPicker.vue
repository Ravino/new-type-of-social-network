<template>
    <div>
        <Picker @emoji="insert">
            <div slot="emoji-invoker"
                 slot-scope="{ events: { click: clickEvent } }"
                 @click.stop="clickEvent"
                 class="picker-btn">
                <IconAddSmile />
            </div>

            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                <div class="picker" :style="transform">
                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                        <h5 class="picker-category">{{ category }}</h5>
                        <div>
                            <span v-for="(emoji, emojiName) in emojiGroup"
                                  :key="emojiName"
                                  @click="insert(emoji)"
                                  :title="emojiName"
                                  class="picker-emoji">
                                {{ emoji }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Picker>
    </div>
</template>

<script>
/** @link https://github.com/DCzajkowski/vue-emoji-picker **/

import Picker from 'vue-emoji-picker';
import IconAddSmile from '../../icons/IconAddSmile.vue';

export default {
name: 'EmojiPicker',
components: { Picker, IconAddSmile },
props: {
    transform: {
        type: String,
        default: null,
    },
},
methods: {
    insert(emoji) {
        this.$emit('addEmoji', emoji);
    },
},
}
</script>

<style lang="scss">
.picker-btn {
    position: relative;
}

.picker {
    position: absolute;
    width: 200px;
    height: 300px;
    overflow-y: scroll;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;

    .picker-category {
        margin: 10px 0;
    }

    .picker-emoji {
        &:hover {
            background-color: #1554F7;
        }
    }
}
</style>
