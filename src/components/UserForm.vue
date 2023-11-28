<template>
    <h2 class="form__title">Заполните данные о пациенте</h2>
    <form class="form">
        <input
            type="text"
            id="surname"
            v-model="$store.state.userFormData.surname"
            class="form__input form__input-text"
            placeholder="Фамилия"
        />
        <input type="text" id="name" v-model="$store.state.userFormData.name" class="form__input form__input-text" placeholder="Имя" />
        <input
            type="text"
            id="fatherName"
            v-model="$store.state.userFormData.fatherName"
            class="form__input form__input-text"
            placeholder="Отчество"
        />
        <input
            type="text"
            id="phone"
            v-model="$store.state.userFormData.phone"
            class="form__input form__input-text"
            placeholder="Номер телефона"
        />
        <div class="form__container-date">
            <div class="form__text form__text-nowrap">Дата рождения</div>
            <input
                type="date"
                id="birthday"
                v-model="$store.state.userFormData.birthday"
                class="form__input form__input-date"
                placeholder="Дата рождения"
            />
        </div>
    </form>
</template>

<script>
export default {
    name: 'UserForm',
};
</script>

<style scoped lang="scss">
.form {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 15px;
    &__container {
        &-date {
            display: flex;
            align-items: center;
            flex-direction: row;
            gap: 15px;
        }
    }
    &__title {
        margin: 0;
        margin-bottom: 15px;

        font-size: 28px;
        line-height: 120%;
    }
    &__input {
        padding: 8px 11px;
        color: var(--real-black-color);
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        line-height: normal;
        border-radius: 10px;
        border: 1px solid var(--blue-color);
        width: 100%;
        max-width: 210px;
        font-family: var(--font-family);
    }
    &__text {
        color: var(--real-black-color);
        font-size: 20px;
        font-weight: 500;
        line-height: normal;
        &-nowrap {
            white-space: nowrap;
        }
    }
}
</style>
