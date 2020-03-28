<template>
    <div id="accountSettingsPrivacy" class="card bg-light container-fluid mb-5">
        <form>
            <div class="form-group row mb-0 mt-2 border-bottom">
                <div class="col-12"><h6><b>Приватность</b></h6></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Тип страницы</label>
                <div class="col-5">
                    <i class="fas fa-lock d-inline-block mr-2"></i><span class="form-control-plaintext d-inline-block w-auto">Закрытая</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Кто может оставлять сообщения</label>
                <div class="col-5">
                    <span class="form-control-plaintext d-inline-block w-auto">Друзья и друзья друзей</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Вас могут</label>
                <div class="col-5">
                    <span class="form-control-plaintext d-inline-block w-auto">Добавить в друзья</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Раздел сообщества</label>
                <div class="col-5">
                    <i class="fas fa-lock d-inline-block mr-2"></i><span class="form-control-plaintext d-inline-block w-auto">Закрыт</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Кто может оставлять записи на стене</label>
                <div class="col-5">
                    <i class="fas fa-lock d-inline-block mr-2"></i><span class="form-control-plaintext d-inline-block w-auto">Только я</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Кто может видеть мой список друзей</label>
                <div class="col-5">
                    <span class="form-control-plaintext d-inline-block w-auto">Мои друзья</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3"></div>
            </div>


            <div class="form-group row mt-3 mb-0">
                <div class="col-4">
                    <button class="btn btn-primary btn-block rounded-pill w-75" id="btnSubmit">Сохранить</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
name: 'AccountSettingsPrivacy',
data () {
    return {
    }
},

methods: {
}

}
</script>
