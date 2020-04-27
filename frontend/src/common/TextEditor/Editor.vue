<template>
    <div class="editor" ref="getHeight" :style="calcEditorH">
        <editor-content class="editor-content"
                        :editor="editor"
                        @keydown.native="onEditorKeyDown"/>
        <span v-if="!isFocusedEditor"
              class="placeholder">
            {{ placeholder }}
        </span>
    </div>
</template>

<script>
/** @link https://github.com/scrumpy/tiptap **/
import {Editor, EditorContent, EditorMenuBar} from 'tiptap';
import {
    //HardBreak,
    HorizontalRule,
    //Bold,
    //Italic,
    Link,
    History,
} from 'tiptap-extensions';

export default {
name: 'Editor',
components: {
    EditorContent,
    EditorMenuBar,
},
props: {
    emoji: {
        type: String,
        default: null,
    },
    placeholder: {
        type: String,
        default: null,
    },
    height: {
        type: Number,
        required: false,
        default: 100
    }
},

data() {
    return {
        editor: new Editor({
            extensions: [
                //new HardBreak(),
                new HorizontalRule(),
                new Link(),
                //new Bold(),
                //new Italic(),
                new History(),
            ],
            onFocus: this.onFocus,
            onBlur: this.onBlur,
        }),
        isFocusedEditor: false,
        editorH: 32,
        editorChangedH: 0,
    }
},

computed: {
    calcEditorH(){
        return 'height: '+this.height+'px';
    },
},

methods: {
    addEmoji(emoji) {
        let currText = this.editor.getHTML();
        currText = (currText.toLowerCase() === `<p></p>`) ? '' : currText;

        if  (`` === currText) {
            this.editor.setContent(`<p class="big-emoji">${emoji}</p>`);
        }

        currText = currText.substr(0, currText.length - 4) + `<span class="emoji">${emoji}</span>` + `</p>`;

        this.editor.setContent(currText);
    },

    onEditorKeyDown(ev) {
        this.$emit('editorKeyDown', ev);
        this.$parent.checkUpdatedChatContainerHeight();

        if (13 === ev.keyCode && ev.ctrlKey === true) {
            let editorText = this.editor.getHTML();
            let str = editorText.replace(/<p>|<\/p>/g, '').trim();

            if (!(!!str.replace(/[\u{1F300}-\u{1F6FF}]/gu, '').trim())) {
                if (str.match(/[\u{1F300}-\u{1F6FF}]/gu).length === 1) {
                    editorText = `<p class="big-emoji">${str}</p>`;
                }
            }

            this.editor.setContent(``);
            this.$emit('editorPost', { postText : editorText });
        }
    },

    onEditorKeyUp () {
        this.$parent.checkUpdatedChatContainerHeight();
    },

    onFocus(event) {
        this.isFocusedEditor = true;
    },

    onBlur(event) {
        let str = this.editor.getHTML().replace(/<\/?[^>]+>/g, '').trim();

        if (!(!!str)) {
            this.isFocusedEditor = false;
        }
    },

    getContent(){
        return this.editor.getHTML();
    },

    focus() {
        this.editor.focus();
    }
},

beforeDestroy() {
    this.editor.destroy()
}
}
</script>

<style lang="scss">
    .editor {
        position: relative;

        .placeholder {
            position: absolute;
            top: 25%;
        }
    }
</style>

