<template>
    <div class="custom-select">
        <div class="custom-select__container" @click="toggleList">
            <div class="custom-select__value">
                {{ $store.state.currentCabinet }}
                <span v-show="$store.state.currentCabinet !== 'Выберите кабинет'">кабинет</span>
            </div>
            <img
                src="../assets/img/triangle.svg"
                alt="Треугольник"
                width="30"
                height="30"
                class="custom-select__icon"
                :class="{
                    'custom-select__icon-reversed': isListVisible,
                }"
            />
        </div>
        <simplebar
            data-simplebar-auto-hide="false"
            class="custom-select__simplebar"
            :class="{
                'custom-select__simplebar-visible': isListVisible,
            }"
        >
            <ul class="list-reset custom-select__list">
                <li
                    class="custom-select__item"
                    v-for="(cabinet, idx) in $store.state.cabinetsList"
                    :key="cabinet + idx"
                    @click="updateCurrentCabinet(cabinet)"
                >
                    {{ cabinet + ' кабинет' }}
                </li>
            </ul>
        </simplebar>
    </div>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';
export default {
    name: 'CustomSelectCabinet',
    components: { simplebar },
    props: {
        valuesList: {
            type: Array,
        },
        currentValue: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isListVisible: false,
        };
    },
    methods: {
        toggleList() {
            this.isListVisible = !this.isListVisible;
        },
        updateCurrentCabinet(value) {
            this.$store.commit('updateCurrentCabinet', value);
            this.$store.dispatch('loadTimetable');
            this.isListVisible = false;
        },
    },
};
</script>

<style lang="scss">
.custom-select {
    position: relative;
    &__container {
        cursor: pointer;
        width: 100%;
        width: 292px;
        padding: 5px 15px;
        border: 1px solid var(--blue-color);
        border-radius: 10px;
        display: flex;
        align-items: center;
    }
    &__value {
        color: var(--black-color);
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        line-height: normal;
        width: 100%;
    }
    &__list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-x: hidden;
        position: relative;
        z-index: 20;
        background: transparent;
    }
    &__item {
        padding: 7px 15px;
        border: 1px solid var(--blue-color);
        background: transparent;
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
        background: var(--white-color);
        &:last-child {
            margin-bottom: 1px;
        }
    }
    &__icon {
        transition: rotate 0.4s ease;
        &-reversed {
            rotate: 180deg;
        }
    }
    &__simplebar {
        position: absolute;
        top: calc(100% + 8px);
        width: 100%;
        max-width: 292px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        max-height: 337px;
        z-index: 30;
        background: transparent;
        &-visible {
            opacity: 1;
            visibility: visible;
        }
        & .simplebar {
            &-vertical {
                right: -12px;
                width: 6px;
                background: #d9d9d9;
                border-radius: 3px;
            }
            &-scrollbar {
                &::before {
                    background: var(--orange-color);
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                    opacity: 1;
                }
            }
        }
    }
}
</style>
