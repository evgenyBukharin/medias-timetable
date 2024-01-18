<template>
    <div class="timetableColumn">
        <simplebar data-simplebar-auto-hide="false" class="timetableColumn__simplebar">
            <div class="timetableColumn__list">
                <div
                    class="timetableColumn__item"
                    v-for="(item, idx) in $store.state.doctorsList"
                    :key="'item' + idx"
                    :id="'item' + idx"
                    @click="toggleActivity($event, idx, item)"
                >
                    <h4 class="timetableColumn__title">
                        {{ item.title }}
                    </h4>
                    <h5 class="timetableColumn__job">{{ item.job }}</h5>
                </div>
            </div>
        </simplebar>
        <div class="timetableColumn__legend">
            <div class="timetableColumn__legend-item">
                <div
                    class="table__cell table__cell-day table__cell-day-inner table__cell-day-notworking"
                ></div>
                <span class="timetableColumn__text">- недоступно для записи</span>
            </div>
            <div class="timetableColumn__legend-item">
                <div class="table__cell table__cell-day table__cell-day-inner"></div>
                <span class="timetableColumn__text">- доступно для записи</span>
            </div>
            <div class="timetableColumn__legend-item">
                <div
                    class="table__cell table__cell-day table__cell-day-inner table__cell-day-selected-user"
                    title="13:45"
                ></div>
                <span class="timetableColumn__text">- выбранная вами ячейка</span>
            </div>
            <div class="timetableColumn__legend-item" v-if="$store.state.isAdmin">
                <div
                    class="table__cell table__cell-day table__cell-day-inner table__cell-day-bronned table__cell-day-bronned-allowed"
                ></div>
                <span class="timetableColumn__text">- доступна для редактирования</span>
            </div>
        </div>
    </div>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';
export default {
    name: 'TimetableColumn',
    components: { simplebar },
    methods: {
        toggleActivity(event, index, doctor) {
            if (this.$store.state.activeItemIndex !== index) {
                if (this.$store.state.activeItemIndex == null) {
                    this.$store.commit('updateIsDoctorChanged', true);
                }
                if (this.$store.state.activeItemIndex !== null) {
                    this.$store.dispatch('clearActiveDoctor');
                }
                if (this.$store.state.isThereAnySelectedCells == true) {
                    this.removeSelectedCells();
                }
                event.target.classList.add('timetableColumn__item-active');
                this.$store.commit('changeActiveItemIndex', index);
                this.$store.dispatch('loadTimetable', doctor);
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
.timetableColumn {
    border-radius: 10px;
    border: 1px solid var(--blue-color);
    padding: 20px 40px 20px 20px;
    max-width: 350px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__list {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 15px 20px;
        overflow-y: hidden;
    }
    &__item {
        position: relative;
        grid-column: 3 span;
        border-radius: 5px;
        background: #efefef;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        border: 1px solid transparent;
        transition: border 0.3s ease;
        cursor: pointer;
        min-height: 75px;
        &-active {
            border: 1px solid var(--blue-color);
        }
        & * {
            pointer-events: none;
        }
    }
    &__title {
        color: var(--black-color);
        font-size: 11px;
        font-weight: 500;
        line-height: normal;
        margin: 0;
        max-width: 97px;
        &-online {
            max-width: 90px;
        }
    }
    &__job {
        color: var(--black-color);
        opacity: 0.54;
        font-size: 10px;
        font-weight: 500;
        line-height: 11px;
        margin: 0;
    }
    &__online {
        position: absolute;
        top: 8px;
        right: 7px;
    }
    &__simplebar {
        max-height: 526px;
        & .simplebar {
            &-vertical {
                right: -20px;
                width: 5px;
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
    &__legend {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        & .table__cell {
            max-width: 60px;
            width: 60px;
            &-day-inner {
                border: 1px solid rgba(120, 120, 120, 0.4705882353);
            }
        }
        &-item {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 14px;
        }
    }
    &__text {
        margin-left: 6px;
        width: 100%;
        display: block;
        white-space: nowrap;
    }
}
</style>
