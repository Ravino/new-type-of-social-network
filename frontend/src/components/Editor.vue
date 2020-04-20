<template>
    <div class="editor">
        <editor-content class="editor_content" :editor="editor"/>
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
                <button
                    class="btn bg-transparent"
                    :class="{ 'is-active': isActive.bold()}"
                    @click="commands.bold">
                    <i class="fas fa-bold"></i>
                </button>
                <button
                    class="btn bg-transparent"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic">
                    <i class="fas fa-italic"></i>
                </button>
            </div>
        </editor-menu-bar>
    </div>
</template>

<script>
    // @link https://github.com/scrumpy/tiptap
    import {Editor, EditorContent, EditorMenuBar} from 'tiptap';
    import {
        HardBreak,
        HorizontalRule,
        Bold,
        Italic,
        Link,
        History,
    } from 'tiptap-extensions';

    export default {
        name: "Editor",
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
                        new HardBreak(),
                        new HorizontalRule(),
                        new Link(),
                        new Bold(),
                        new Italic(),
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

    .editor_content {
        height: 100%;

        .ProseMirror {
            height: 100%;
            outline: none;
        }
    }
</style>
