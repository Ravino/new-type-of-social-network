<template>
    <div class="editor">
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
    }
},

methods: {
    addEmoji(emoji) {
        let data = document.querySelector('.ProseMirror p');
        data.innerHTML += emoji;
    },

    onEditorKeyDown(ev) {
        if (13 === ev.keyCode && ev.ctrlKey === true) {
            const editorText = this.editor.getHTML();

            this.editor.setContent(``);

            this.$emit('editorPost', { postText : editorText });
        }
    },
    onFocus(event) {
        this.isFocusedEditor = true;
    },
    onBlur(event) {
        // this.isFocusedEditor = false;
    },
},
beforeDestroy() {
    this.editor.destroy()
},
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

