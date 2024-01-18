<template>
    <div class="field">
        <input
            type="text"
            class="field__input"
            placeholder="Выберите услугу"
            @click="toggleList()"
            v-model="$store.state.filterValue"
        />
        <simplebar
            data-simplebar-auto-hide="false"
            class="field__simplebar"
            :class="{
                'field__simplebar-visible': isListVisible,
            }"
        >
            <ul class="field__list">
                <li
                    class="field__item"
                    :class="{
                        'field__item-disabled': service?.disabled,
                    }"
                    v-for="(service, idx) in filterServiceList()"
                    :key="'service' + idx"
                    @click="updateCurrentService(service)"
                >
                    {{ service.name }}
                </li>
            </ul>
        </simplebar>
        <button class="field__button" @click="clearField()">Очистить</button>
    </div>
</template>
<script>
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';
export default {
    name: 'ServiceField',
    components: { simplebar },
    data() {
        return {
            isListVisible: false,
        };
    },
    methods: {
        toggleList() {
            this.isListVisible = !this.isListVisible;
        },
        updateCurrentService(service) {
            if (this.$store.state.isTimetableLoaded == true) {
                this.$store.commit('updateIsTimetableLoaded', false);
            }
            if (!this.$store.state.isServiceSelected) {
                this.$store.commit('updateIsServiceSelected', true);
            }
            if (this.$store.state.isThereAnySelectedCells == true) {
                this.removeSelectedCells();
            }
            if (this.$store.state.activeItemIndex !== null) {
                this.$store.dispatch('clearActiveDoctor');
            }

            this.$store.commit('updateCurrentService', service);
            this.$store.commit('updateCurrentFilterValue', service.name);
            this.$store.dispatch('loadDoctorsList');

            this.toggleList();
        },
        filterServiceList() {
            if (this.$store.state.filterValue.length == 0) {
                return this.$store.state.serviceList;
            }
            const filteredValues = this.$store.state.serviceList.filter((service) => {
                return service.name
                    .toLowerCase()
                    .includes(this.$store.state.filterValue.toLowerCase());
            });
            return filteredValues.length !== 0
                ? filteredValues
                : [{ name: 'Совпадений нет', disabled: true }];
        },
        clearField() {
            this.$store.commit('clearServiceField');
            if (this.$store.state.activeItemIndex !== null) {
                this.$store.dispatch('clearActiveDoctor');
            }
            if (this.$store.state.isServiceSelected == true) {
                this.$store.commit('updateIsServiceSelected', false);
            }
            if (this.$store.state.isThereAnySelectedCells == true) {
                this.removeSelectedCells();
            }
        },
        removeSelectedCells() {
            this.$store.commit('setIsThereAnySelectedCells', false);
            this.$store.commit('setNewSelectedCellsData', {
                date: null,
                time: null,
            });
            this.$store.dispatch('clearUserSelectedCells');
        },
    },
};
</script>

<style lang="scss">
.field {
    position: relative;
    &__input {
        padding: 8px 11px;
        color: var(--real-black-color);
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        line-height: normal;
        border-radius: 10px !important;
        border: 1px solid var(--blue-color);
        min-width: 410px;
        font-family: var(--font-family);
        cursor: pointer;
    }
    &__list {
        list-style: none;
        margin: 0;
        padding: 14px 42px 14px 20px;
    }
    &__item {
        cursor: pointer;
        border-bottom: 1px solid var(--orange-color);
        padding: 8px 0 5px;
        &:first-child {
            padding-top: 0;
        }
        &:last-child {
            padding-bottom: 0;
            border-bottom: 0;
        }
        &-disabled {
            pointer-events: none;
        }
    }
    &__simplebar {
        position: absolute;
        top: calc(100% + 8px);
        width: 100%;
        min-width: 410px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        max-height: 337px;
        z-index: 10;
        background: var(--white-color);
        border-radius: 10px;
        border: 1px solid var(--orange-color);
        &-visible {
            opacity: 1;
            visibility: visible;
        }
        & .simplebar {
            &-vertical {
                top: 12px;
                bottom: 12px;
                right: 15px;
                width: 6px;
                background: #d9d9d9;
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
    &__button {
        margin-left: 12px;
        border: none;
        background: var(--blue-color);
        color: var(--white-color);
        padding: 7px 14px;
        border-radius: 10px;
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
