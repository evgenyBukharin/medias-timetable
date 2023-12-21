<template>
    <h2 class="form__title">Заполните данные о пациенте</h2>
    <form class="form">
        <input
            type="text"
            id="surname"
            v-model="$store.state.userFormData.surname.value"
            class="form__input form__input-text"
            :class="{
                'form__input-text-invalid':
                    !$store.state.userFormData.surname.isValid &&
                    $store.state.userFormData.surname.isValid !== null,
            }"
            placeholder="Фамилия"
            @input="checkValidity('surname')"
        />
        <input
            type="text"
            id="name"
            v-model="$store.state.userFormData.name.value"
            class="form__input form__input-text"
            :class="{
                'form__input-text-invalid':
                    !$store.state.userFormData.name.isValid &&
                    $store.state.userFormData.name.isValid !== null,
            }"
            placeholder="Имя"
            @input="checkValidity('name')"
        />
        <input
            type="text"
            id="fatherName"
            v-model="$store.state.userFormData.fatherName.value"
            class="form__input form__input-text"
            :class="{
                'form__input-text-invalid':
                    !$store.state.userFormData.fatherName.isValid &&
                    $store.state.userFormData.fatherName.isValid !== null,
            }"
            placeholder="Отчество"
            @input="checkValidity('fatherName')"
        />
        <input
            type="text"
            id="phone"
            v-model="$store.state.userFormData.phone.value"
            class="form__input form__input-text"
            :class="{
                'form__input-text-invalid':
                    !$store.state.userFormData.phone.isValid &&
                    $store.state.userFormData.phone.isValid !== null,
            }"
            placeholder="Номер телефона"
            @input="checkValidity('phone')"
        />
        <div class="form__container-date">
            <div class="form__text form__text-nowrap">Дата рождения</div>
            <input
                type="date"
                id="birthday"
                v-model="$store.state.userFormData.birthday.value"
                class="form__input form__input-date"
                :class="{
                    'form__input-text-invalid':
                        !$store.state.userFormData.birthday.isValid &&
                        $store.state.userFormData.birthday.isValid !== null,
                }"
                placeholder="Дата рождения"
                @input="checkValidity('birthday')"
            />
        </div>
    </form>
</template>

<script>
export default {
    name: 'UserForm',
    methods: {
        checkValidity(key) {
            const currInput = this.$store.state.userFormData[key];
            if (currInput.value.length > 0) {
                currInput.isValid = true;
            } else {
                currInput.isValid = false;
            }
        },
    },
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
        &-text {
            outline: none;
            &-invalid {
                border: 2px solid crimson;
            }
        }
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
