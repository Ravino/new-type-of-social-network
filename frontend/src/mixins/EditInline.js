import {debounce} from "../utils/Debonce.js";

/**
 * Пример использования смотри в "CommunitySettingsMain.vue"
 * @type {{methods: {startFieldEdit(*=): void, inputFieldEdit(*, *): void, getRef(*): (*|null), finishFieldEdit(*=): (undefined), formatFormData(*, *): {}, clickField: (function(...[*]=))}}}
 */

const EditInline = {
    methods: {
        getRef(refKey) {
            for (let [key, value] of Object.entries(this.$refs)) {
                if (refKey === key)
                    return value;
            }
            return null;
        },
        clickField: debounce(function (fieldName) {
            this.serverRegMessages[fieldName] = null;
            this.isEdit[fieldName] = !this.isEdit[fieldName];
            console.log(fieldName, this.isEdit, 'clickField');
            if (this.isEdit[fieldName]) {
                this.startFieldEdit(fieldName);
            } else {
                this.finishFieldEdit(fieldName);
            }
        }, 200),
        startFieldEdit(fieldName) {
            const inpRef = this.getRef(fieldName);

            if (inpRef) {
                inpRef.focus();
            } else {
                window.console.warn('Ошибка редактирования поля', 's');
            }
        },
        finishFieldEdit (fieldName) {
            this.$v.model[fieldName].$touch();
            const inpRef = this.getRef(fieldName);
            if (this.$v.model[fieldName].$error) {
                this.isEdit[fieldName] =true;
                return;
            }
            setTimeout(() => {
                console.log(fieldName, this.model[fieldName], 'setTimeout');
                if (inpRef) {
                    console.log(fieldName, this.model[fieldName], 'in1');
                    inpRef.blur();
                    if (!this.isSend[fieldName]) {

                        console.log(fieldName, this.model[fieldName], 'in2');
                        this.accountStartSaveData(this.model[fieldName], fieldName);
                    }
                } else {
                    window.console.warn('Ошибка редактирования поля', 'f');
                }
            }, 50);
        },
        formatFormData(newValue, fieldName) {
            let formData = {};
            formData[fieldName] = newValue;
            return formData;
        },
        inputFieldEdit($event, fieldName) {
            this.serverRegMessages[fieldName] = null;
            this.$v.model[fieldName].$touch();
        },
    }
};

export {EditInline as default}
