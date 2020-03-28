<template>
    <div id="accountSettingsMain" class="card bg-light container-fluid mb-5">
        <form>
            <div class="form-group row mb-0 mt-2 border-bottom">
                <div class="col-12"><h6><b>Основные</b></h6></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="firstName" class="col-4 col-form-label text-secondary">Имя</label>
                <div class="col-5">
                    <input type="text" readonly class="form-control-plaintext" id="firstName" value="Дмитрий" />
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-link text-body">Изменить</button>
                </div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="lastName" class="col-4 col-form-label text-secondary">Фамилия</label>
                <div class="col-5">
                    <input type="text" readonly class="form-control-plaintext" id="lastName" value="-" />
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-link text-body">Сохранить</button>
                </div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Пол</label>
                <div class="col-5">
                    <span class="form-control-plaintext d-inline-block w-auto">Мужской</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label class="col-4 col-form-label text-secondary">Семейной положение</label>
                <div class="col-5">
                    <span class="form-control-plaintext d-inline-block w-auto">В активном поиске</span><i class="fas fa-chevron-down ml-2"></i>
                </div>
                <div class="col-3"></div>
            </div>

            <div class="form-group row mb-0 border-bottom">
                <label for="birthDate" class="col-4 col-form-label text-secondary">Дата рождения</label>
                <div class="col-5">
                    <input type="text" readonly class="form-control-plaintext" id="birthDate" value="14 сентября 1990 г." />
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-link text-body">Изменить</button>
                </div>
            </div>

            <div class="form-group row mb-0 --border-bottom">
                <label for="location" class="col-4 col-form-label text-secondary">Месторасположение</label>
                <div class="col-5">
                    <i class="fas fa-map-marker-alt d-inline-block mr-2"></i> <input type="text" readonly class="form-control-plaintext d-inline-block w-50" id="location" value="Киев, Украина" />
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-link text-body">Изменить</button>
                </div>
            </div>

<!--            убрано по согласованию-->
<!--            <div class="form-group row mt-3 mb-0">-->
<!--                <div class="col-4">-->
<!--                    <button class="btn btn-primary btn-block rounded-pill w-75" id="btnSubmit">Сохранить</button>-->
<!--                </div>-->
<!--            </div>-->
        </form>
    </div>
</template>

<script>
export default {
name: 'AccountSettingsMain',
data () {
    return {
    }
},

methods: {
}

}
</script>
