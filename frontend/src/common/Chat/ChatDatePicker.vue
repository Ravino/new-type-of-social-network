<template>
    <DatePicker v-model="range"
                mode='range'
                :popover="{ placement: 'bottom', visibility: 'click' }"
                @input="dateSelected">
        <button class="btn plz-btn-primary">
            <i class="far fa-calendar-alt"></i>
        </button>
    </DatePicker>
</template>

<script>
    import Calendar from 'v-calendar/lib/components/calendar.umd';
    import DatePicker from 'v-calendar/lib/components/date-picker.umd';

    export default {
        name: "ChatDatePicker",
        components: {
            Calendar,
            DatePicker,
        },
        data() {
            return {
                range: {
                    start: null,
                    end: null,
                },
            }
        },
        methods: {
            dateSelected(range) {
                this.$emit('dateSelected', range);
            },
        },
    }
</script>

<style scoped>

</style>
