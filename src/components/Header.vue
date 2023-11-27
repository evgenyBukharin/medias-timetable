<template>
    <div class="header">
        <div class="header__column">
            <CustomSelect :valuesList="$store.state.citiesList" :currentValue="$store.state.currentCity" />
            <!-- <FillialToggler /> -->
        </div>
        <PeriodToggler />
    </div>
</template>

<script>
import CustomSelect from './CustomSelect.vue';
import FillialToggler from './FillialToggler.vue';
import PeriodToggler from './PeriodToggler.vue';

export default {
    name: 'Header',
    components: { CustomSelect, FillialToggler, PeriodToggler },
};
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    &__column {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }
}
</style>
