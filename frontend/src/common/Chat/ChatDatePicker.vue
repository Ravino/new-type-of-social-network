<template>
    <DatePicker v-model="range"
                mode='range'
                :popover="{ placement: 'bottom', visibility: 'click' }"
                @input="dateSelected">
        <button class="btn" :class="btnStyle">
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
        computed: {
            btnStyle() {
                let dateSelected = this.range.start && this.range.end;

                return [
                    dateSelected ? 'plz-btn-primary' : 'isDisabled',
                ]
            },
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
            clearDateSelected() {
                this.range.start = this.range.end = null;
            },
        },
    }
</script>

<style lang="scss">
    .isDisabled {
        color:#fff;
        background-color: #939292;

        &:hover {
            color:#fff;
        }
    }
</style>
