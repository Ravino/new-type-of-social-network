<template>
    <div class="plz-top-watcher-item position-relative d-inline-block mr-2">
        <router-link to="/chats-list" tag="a" class="btn btn-link my-auto text-body btn-sm">
            <IconMessage/>
        </router-link>

        <span v-if="messagesNumber>0" class="counter-info" id="dropdownMenuMessages" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{messagesNumber}}
        </span>

        <div v-if="messagesNumber>0"
            class="dropdown-menu dropdown-menu-right py-3  dropdown-white w-auto" aria-labelledby="dropdownMenuMessages">

            <ul class="list-unstyled mb-0">
                <MessageNotificationItem v-for="(msgItem, msgIndex) in messagesList"
                          v-bind:key="msgIndex" v-bind:message="msgItem"></MessageNotificationItem>
            </ul>
        </div>
    </div>
</template>

<script>
import IconMessage from '../../icons/IconMessage.vue';
import MessageNotificationItem from '../../components/MessageNotificationItem.vue';

export default {
name : 'NavBarMessages',
components : { IconMessage, MessageNotificationItem },

data(){
    return {
        messagesNumber : 0,
        messagesLimit : 10
    }
},

methods : {
    updateMessages(){
        //window.console.log(this.$root.$user.dialogsNumber, `updateMessages`);
        this.messagesNumber = 0;

        this.$root.$user.dialogs.map( (dItem) => {
            if (!dItem.isLastFromMe  && !dItem.isRead) {
                this.messagesNumber++;
            }
        });

        // @TGA хак чтобы отображало актуальное кол-во
        this.$forceUpdate();
    }
},

computed: {
    messagesList(){
        let messages = this.$root.$user.dialogs.filter((dItem)=>{
            return (!dItem.isLastFromMe  && !dItem.isRead);
        });

        return messages.slice(0, this.messagesLimit);
    }
},

created(){
    /** @TGA ошибки нет - после загрузки списка мы считаем количество  **/
    this.$root.$on('dialogsLoad',  this.updateMessages);
}
}
</script>
