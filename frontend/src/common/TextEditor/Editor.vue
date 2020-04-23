<template>
    <div class="editor" ref="getHeight">
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
        editorH: 32,
        editorChangedH: 0,
    }
},

methods: {
    addEmoji(emoji) {
        let currText = this.editor.getHTML();
        currText = (currText.toLowerCase() === `<p></p>`) ? '' : currText;

        if  (`` === currText) {
            this.editor.setContent(`<p class="big-emoji">${emoji}</p>`);
            return;
        }

        currText = currText.substr(0, currText.length - 4) + `<span class="emoji">${emoji}</span>` + `</p>`;

        this.editor.setContent(currText);
    },


    getChatFooterStartHeight(){
        // FIXME: @TGA не работает - падает с ошибкой - исправить
        //let chatFooterHeight = document.getElementById('chatFooter').offsetHeight;
        //this.editorH = chatFooterHeight; // TODO: пересчитать высоту chatMessagesBody при изменении высоты chatFooter
    },

    checkEditorHeight() {
        // FIXME: @TGA падает с ошибкой
        //const chatMessageBody = document.getElementById('chatMessagesBody');
        //let chatMessageBodyH = chatMessageBody.offsetHeight;
        //let getChatFooterChangedHeight = document.getElementById('chatFooter').offsetHeight;
        //
        //if (this.editorH !== getChatFooterChangedHeight) {
        //
        //    let chatMessageBodyNewHeight = chatMessageBodyH - (getChatFooterChangedHeight - this.editorH);
        //
        //    chatMessageBody.style.height = chatMessageBodyNewHeight + 'px';
        //    this.editorH = getChatFooterChangedHeight; // TODO проверить
        //}
    },

    onEditorKeyDown(ev) {
        if (13 === ev.keyCode && ev.ctrlKey === true) {
            const editorText = this.editor.getHTML();

            this.editor.setContent(``);

            this.$emit('editorPost', { postText : editorText });
        }

        //this.editorH = this.$refs.getHeight.offsetHeight;

        this.checkEditorHeight();
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
    }
},

mounted() {
    this.getChatFooterStartHeight()
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

