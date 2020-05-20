const LazyLoadPosts = {
    data() {
        return {
            lazyLoadStarted: false,
            noMorePost: false,
            enabledPostLoader: true,
        }
    },
    methods: {
        async onScrollYPage(){
            if (window.scrollY >= (document.body.scrollHeight - document.documentElement.clientHeight - (document.documentElement.clientHeight/2) )){
                await this.lazyLoadPosts();
            }
        },
        async lazyLoadPosts() {
            if (this.lazyLoadStarted) return;
            if (this.noMorePost) return;

            this.enabledPostLoader = true;
            this.lazyLoadStarted = true;
            let oldSize = this.posts.length;
            let added = await this.getPosts(10, oldSize++);

            if (added === 0) {
                this.noMorePost = true;
            }

            this.lazyLoadStarted = false;
            this.onScrollYPage();
        },
    },
    async mounted() {
        await this.lazyLoadPosts();

        if (!this.lazyLoadStarted) {
            window.addEventListener('scroll', this.onScrollYPage);
        }
    },
    beforeRouteLeave(to, from, next) {
        window.removeEventListener('scroll', this.onScrollYPage);
        next();
    },
};

export default LazyLoadPosts;
