<template>
    <div class="fillialToggler">
        <div class="fillialToggler__item" :class="{ 'fillialToggler__item-active': isItemActive }" @click="toggleActiveItem('ДокторОст')">
            ДокторОст
        </div>
        <div
            class="fillialToggler__item"
            :class="{ 'fillialToggler__item-active': !isItemActive }"
            @click="toggleActiveItem('Дети Индиго')"
        >
            Дети Индиго
        </div>
    </div>
</template>

<script>
export default {
    name: 'FillialToggler',
    data() {
        return {
            isItemActive: true,
        };
    },
    methods: {
        toggleActiveItem(newFillial) {
            this.isItemActive = !this.isItemActive;
            if (this.$store.state.currentFillial !== newFillial) {
                this.$store.commit('updateCurrentFillial', newFillial);
            }
        },
    },
};
</script>

<style scoped lang="scss">
.fillialToggler {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    &__item {
        min-width: 180px;
        padding: 8px 15px;
        border: 1px solid var(--orange-color);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--black-color);
        font-size: 20px;
        font-weight: 500;
        line-height: normal;
        background: var(--white-color);
        transition: background 0.4s ease, color 0.4s ease;
        cursor: pointer;
        &-active {
            color: var(--white-color);
            background: var(--orange-color);
        }
    }
}
</style>
