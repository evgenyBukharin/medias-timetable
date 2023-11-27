<template>
    <div class="periodToggler" @click="toggleActive">
        <div class="periodToggler__item">
            <span
                class="periodToggler__value"
                :class="{
                    'periodToggler__value-active': !isItemActive,
                }"
            >
                7 дней
            </span>
        </div>
        <div class="periodToggler__item">
            <span
                class="periodToggler__value"
                :class="{
                    'periodToggler__value-active': isItemActive,
                }"
            >
                14 дней
            </span>
        </div>
        <div
            class="periodToggler__mask"
            :class="{
                'periodToggler__mask-transformed': isItemActive,
            }"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'PeriodToggler',
    data() {
        return {
            isItemActive: true,
        };
    },
    methods: {
        toggleActive() {
            this.isItemActive = !this.isItemActive;
            if (this.$store.state.currentPeriod == 7) {
                this.$store.commit('updateCurrentPeriod', 14);
            } else {
                this.$store.commit('updateCurrentPeriod', 7);
            }
        },
    },
};
</script>

<style scoped lang="scss">
.periodToggler {
    position: relative;
    display: flex;
    border-radius: 10px;
    background: var(--dark-grey-color);
    max-width: 356px;
    width: 100%;
    &__item {
        padding-top: 8px;
        padding-bottom: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        position: relative;
        z-index: 10;
        cursor: pointer;
    }
    &__value {
        color: var(--black-color);
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        line-height: normal;
        transition: color 0.3s ease;
        &-active {
            color: var(--white-color);
        }
    }
    &__mask {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 50%;
        background: var(--blue-color);
        border-radius: 10px;
        transition: transform 0.3s ease;
        &-transformed {
            transform: translateX(100%);
        }
    }
}
</style>
