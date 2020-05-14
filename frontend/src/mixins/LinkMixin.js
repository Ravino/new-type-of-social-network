const LinkMixin = {
    data() {
        return {
            youtubeLinksRegExp: /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|www.youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig,
            youtubeIdRegExp: /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
            urlRegExp: /(https?:\/\/[^\s]+)/g,
        }
    },
    methods: {
        /**
         * Находим все ссылки на youtube видео в строке.
         *
         * @param str
         * @returns {array|null}
         */
        detectYoutubeLinks(str) {
            return str.match(this.youtubeLinksRegExp);
        },

        /**
         * Находим все id видео в ссылках на youtube видео.
         *
         * @params str
         * @returns {array|null}
         */
        detectYoutubeIds(str) {
            let youtubeIdsMatch = str.match(this.youtubeIdRegExp);

            return (youtubeIdsMatch && youtubeIdsMatch[7].length === 11) ? youtubeIdsMatch[7] : false;
        },

        /**
         * Определяем есть ли ссылки в встроке.
         *
         * @param str
         * @return {array|null}
         */
        detectLink(str) {
            return str.match(this.urlRegExp);
        },

        /**
         * Заменяем ссылки в строке.
         *
         * @param str
         * @return {str|null}
         */
        replaceLink(str) {
            return str.replace(this.urlRegExp, function (url) {
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            });
        },

        transformStrWithLinks(str) {
            let youtubeLinks = this.detectYoutubeLinks(str);
            let links = this.detectLink(str);

            if (youtubeLinks && youtubeLinks.length) {
                let youtubeIds = [];

                youtubeLinks.forEach((youtubeLink) => {
                    youtubeIds.push(this.detectYoutubeIds(youtubeLink));
                });

                let textWithoutYoutubeLinks = str.replace(this.youtubeLinksRegExp, '');
                let textTransformToLinks = this.replaceLink(textWithoutYoutubeLinks);

                return {
                    videoLinks: `<img src="//img.youtube.com/vi/${youtubeIds[0]}/0.jpg" 
                             alt="" />`,
                    text: `<p>${textTransformToLinks}</p>`,
                };
            } else if (links && links.length) {
                return {
                    text: this.replaceLink(str),
                };
            } else {
                return str;
            }
        },
    }
};

export default LinkMixin;
