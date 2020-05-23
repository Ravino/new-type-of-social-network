<template>
    <div class="plz-gallery-description d-flex flex-column justify-content-between">
        <div class="plz-gallery-description-header px-4 pt-4 pb-0 border-bottom">
            <div class="plz-gallery-description--holder d-flex">
                <div class="plz-gallery-description--holder-avatar mr-3">
                    <img class="plz-gallery-description--holder-avatar-item" :src="userAvatar" :alt="userName +' '+ userSurname">
                </div>
                <div class="plz-gallery-description--holder-data d-flex flex-column w-100 justify-content-center">
                    <p class="plz-gallery-description--holder-data-author d-flex mb-0">
                        {{ userName +' '+ userSurname }}
                    </p>
                    <p class="plz-gallery-description--holder-data-time mb-0">
                        {{getTimePost}}
                    </p>
                </div>
                <div class="post-poster-actions my-auto ml-auto">
                    <button class="btn btn-link post-settings"
                            :id="`postSettings` + getTimePost"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                        <i class="dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right py-3 px-0"
                         :aria-labelledby="`postSettings` + getTimePost">

                        <div class="nav-item">
                            <button class="btn dropdown-item text-left px-3 py-1">
                                Редактировать
                            </button>
                        </div>
                        <div  class="nav-item">
                            <button class="btn dropdown-item text-left px-3 py-1">
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="plz-gallery-description--post-data d-flex">
                <div class="plz-gallery-description--post-data-option post-watched-counter"
                     :class="{'is-active': image.alreadyLiked}"
                     @click="onLike">
                    <IconFillHeard v-if="image.alreadyLiked"/>
                    <IconHeard v-else/>
                    <span>{{ image.likes | space1000 }}</span>
                </div>
                <div class="plz-gallery-description--post-data-option post-watched-counter ml-4">
                    <IconMessage/>
                    <span>{{ post.commentsCount | space1000 }}</span>
                </div>
                <div class="plz-gallery-description--post-data-option post-watched-counter ml-4">
                    <IconShare/>
                    <span>{{ post.sharesCount | space1000 }}</span>
                </div>
            </div>
        </div>
        <div class="plz-gallery-description-header-body d-flex w-100 flex-column align-items-end">
            <div class="plz-gallery-description--footer d-flex w-100 p-3 mt-auto">
                <div class="plz-gallery-description--footer-pic mr-2">
                    <img class="plz-gallery-description--footer-img" :src="userAvatar" alt="user photo">
                </div>

                <TextEditor :clazz="`plz-text-editor h-auto  align-items-start flex-grow-1 `"
                            :editorPlaceholder="'Оставить комментарий...'"
                            :dropToDown="true"
                            :maximumCharacterLimit="10000"
                            workMode="post">
                </TextEditor>

            </div>
        </div>
    </div>
</template>

<script>
 import moment from "moment";
 import IconHeard from "../icons/IconHeard.vue";
 import IconFillHeard from '../icons/IconFillHeard.vue';
 import IconMessage from "../icons/IconMessage.vue";
 import IconShare from "../icons/IconShare.vue";
 import TextEditor from "./TextEditor.vue";

 export default {
  name: "GalleryDescription",
  components: {TextEditor, IconShare, IconMessage, IconHeard, IconFillHeard},
  props: {
   post: {
    type: Object,
   },
      image: {
          type: Object,
          default: null,
      },
  },
  data() {
      return {
        noAvatar: '../images/noavatar-256.png'
      };
  },
  computed: {
   userAvatar() {
       if (this.post.author.profile.avatar === null) {
           return this.noAvatar;
       }

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
    async onLike() {
        let response = null;

        try {
            response = await this.$root.$api.$image.likePostImage(this.post.id, this.image.id);
        } catch (e) {
            console.warn(e.detailMessage);
        }

        if (response !== null) {
            if (this.image.alreadyLiked) {
                this.image.alreadyLiked = false;
                this.image.likes--;
                let userLikeIndex = this.image.usersLikes.findIndex((userLike) => {
                    return userLike.id === this.$root.$auth.user.id;
                });
                this.image.usersLikes.splice(userLikeIndex, 1);
            } else {
                this.image.alreadyLiked = true;
                this.image.likes++;
                this.image.usersLikes.push(this.$root.$auth.user);
            }
        }
    }
   },
 }
</script>
