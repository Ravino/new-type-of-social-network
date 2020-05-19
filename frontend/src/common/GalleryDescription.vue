<template>
    <div class="plz-gallery-description">
        <div class="plz-gallery-description__holder">
            <div class="plz-gallery-description__holder-avatar">
            <img class="plz-gallery-description__holder-avatar-item" :src="userAvatar" alt="user photo">
            </div>
            <div class="plz-gallery-description__holder-data">
                <div class="plz-gallery-description__holder-data-author">
                    <p class="plz-gallery-description__holder-credentials">{{userName}}</p>
                    <p class="plz-gallery-description__holder-credentials plz-gallery-description__holder-surname">{{userSurname}}</p>
                </div>
                <div class="plz-gallery-description__holder-data-time">
                  <p class="plz-gallery-description__holder-credentials">{{getTimePost}}</p>
                </div>
            </div>
        </div>
        <div class="plz-gallery-description__post-data d-flex">
            <div class="plz-gallery-description__post-data-option post-watched-counter"
                 @click="onLike">
                <IconHeard/>
                <span>{{ post.likes | space1000 }}</span>
            </div>
            <div class="plz-gallery-description__post-data-option post-watched-counter ml-4">
                <IconMessage/>
                <span>{{ post.commentsCount | space1000 }}</span>
            </div>
            <div class="plz-gallery-description__post-data-option post-watched-counter ml-4">
                <IconShare/>
                <span>{{ post.sharesCount | space1000 }}</span>
            </div>
        </div>
        <div class="plz-gallery-description__text-field">
            <img class="plz-gallery-description__holder-avatar-item" :src="userAvatar" alt="user photo">
            <TextEditor :clazz="`row plz-text-editor mb-4 p-4 h-auto  align-items-start bg-white-br20`"
                        :editorPlaceholder="'Оставить комментарий...'"
                        :dropToDown="true"
                        :maximumCharacterLimit="10000"
                        :errors="errors"
                        workMode="post">
            </TextEditor>
        </div>
    </div>
</template>

<script>
 import moment from "moment";
 import IconHeard from "../icons/IconHeard";
 import IconMessage from "../icons/IconMessage";
 import IconShare from "../icons/IconShare";
 import TextEditor from "./TextEditor";

 export default {
  name: "GalleryDescription",
  components: {TextEditor, IconShare, IconMessage, IconHeard},
  props: {
   post: {
    type: Object,
   },
  },
  computed: {
   userAvatar() {
    return this.post.author.profile.avatar.image.thumb.path;
   },
   userName() {
    return this.post.author.profile.firstName;
   },
   userSurname() {
    return this.post.author.profile.lastName;
   },
   getTimePost() {
    return moment(this.post.createdAt).fromNow();
   },
  },
  methods: {
    onLike() {
        alert('U liked it');
    }
   },
 }
</script>
