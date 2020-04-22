const ChatMixin = {
    data() {
        return {

        }
    },

    props : {
    },

    methods: {
        killBrTrail(sText){
            const brExample = `<br/>`;

            while (true){
                const pos = sText.length - brExample.length;
                const trail = sText.substr(pos).toLowerCase();

                if (trail === brExample) {
                    sText = sText.substr(0, pos);
                }
                else {
                    break;
                }
            }

            return sText;
        },
    },

    computed : {

    }
};

export {ChatMixin as default}
