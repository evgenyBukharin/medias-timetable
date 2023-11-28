<template>
    <div class="header">
        <UserForm />
        <div class="header__container">
            <div class="header__column">
                <CustomSelect :valuesList="$store.state.citiesList" :currentValue="$store.state.currentCity" />
                <!-- <FillialToggler /> -->
            </div>
            <PeriodToggler />
        </div>
    </div>
</template>

<script>
import CustomSelect from './CustomSelect.vue';
import FillialToggler from './FillialToggler.vue';
import PeriodToggler from './PeriodToggler.vue';
import UserForm from './UserForm.vue';

export default {
    name: 'Header',
    components: { CustomSelect, FillialToggler, PeriodToggler, UserForm },
};
</script>

<style scoped lang="scss">
.header {
    &__column {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }
    &__container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
}
</style>
