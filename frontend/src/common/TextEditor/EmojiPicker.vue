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
                            <span v-for="(emojiItem, emojiName) in emojiGroup"
                                  :key="emojiName"
                                  @click="insert({event: $event, emoji: emojiItem})"
                                  :title="emojiName"
                                  class="picker-emoji">
                                {{ emojiItem }}
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
    insert(eventData) {
        this.$emit('addEmoji', {
            emoji : eventData.emoji,
            keys : {
                altKey: eventData.event.altKey,
                ctrlKey: eventData.event.ctrlKey,
                shiftKey: eventData.event.shiftKey
            }
        });
    },
},
}
</script>

