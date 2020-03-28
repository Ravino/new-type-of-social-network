<template>
    <div id="accountSettingsSecurity" class="card bg-light container-fluid">
        <form>
            <div class="form-group row mb-0 mt-2 border-bottom">
                <div class="col-12"><h6><b>Безопасность</b></h6></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Двухэтапная аутентификация</label>
                <div class="col-5">
                    <i class="fas fa-check d-inline-block mr-2"></i><span class="form-control-plaintext d-inline-block w-auto">Включена</span>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Подтверждение через SMS</label>
                <div class="col-5">
                    <span class="form-control-plaintext d-inline-block w-auto">Выключено</span>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 --border-bottom">
                <label class="col-4 col-form-label text-secondary">Пароль</label>
                <div class="col-5">
                    <button type="button" class="btn btn-link px-0 text-body">Изменить</button>
                </div>
                <div class="col-3"></div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
name: 'AccountSettingsSecurity',
data () {
    return {
    }
},

methods: {
}

}
</script>
