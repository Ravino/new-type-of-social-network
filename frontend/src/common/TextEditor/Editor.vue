<template>
    <div class="editor">
        <editor-content class="editor-content" :editor="editor" @keydown.native="onEditorKeyDown" />
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
        }),
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
},
beforeDestroy() {
    this.editor.destroy()
},
}
</script>

<style lang="scss">
.menubar {
    .btn {
        i {
            color: #1554F7;
        }
    }
}

.editor-content {
    height: 100%;

    .ProseMirror {
        height: 100%;
        outline: none;
    }
}

</style>
