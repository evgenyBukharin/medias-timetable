<template>
    <div class="header">
        <UserForm />
        <div class="header__container">
            <div class="header__column">
                <ServiceField />
                <!-- <CustomSelectCabinet
                    :valuesList="$store.state.doctorsList"
                    :currentValue="$store.state.currentDoctor"
                    v-show="$store.state.isDoctorChanged"
                /> -->
            </div>
            <PeriodToggler v-show="$store.state.isServiceChanged" />
        </div>
    </div>
</template>

<script>
import CustomSelectCity from './CustomSelectCity.vue';
import CustomSelectCabinet from './CustomSelectCabinet.vue';
import FillialToggler from './FillialToggler.vue';
import PeriodToggler from './PeriodToggler.vue';
import UserForm from './UserForm.vue';
import ServiceField from './ServiceField.vue';

export default {
    name: 'Header',
    components: {
        CustomSelectCity,
        CustomSelectCabinet,
        FillialToggler,
        PeriodToggler,
        UserForm,
        ServiceField,
    },
};
</script>

<style scoped lang="scss">
.header {
    &__column {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }
    &__container {
        display: flex;
        justify-content: space-between;
    }
}
</style>
