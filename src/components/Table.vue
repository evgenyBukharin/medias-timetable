<template>
    <div
        class="table"
        :class="{
            'table-disabled': $store.state.isTimetableLoaded !== true,
        }"
    >
        <div class="table__row table__row-header">
            <div class="table__cell table__cell-time table__cell-time-empty"></div>
            <div
                class="table__cell table__cell-day"
                :class="{
                    'table__cell-button': index == 0 || index == $store.state.visiblePeriod.length - 1,
                    'table__cell-button-reversed': index == $store.state.visiblePeriod.length - 1,
                    'table__cell-button-period-7': $store.state.currentPeriod == 7,
                }"
                v-for="(item, index) in $store.state.visiblePeriod"
                @click="changePeriod($event)"
            >
                <div class="table__container-cell">
                    <span class="table__text table__text-date">{{ removeYearFromDate(item.date) }}</span>
                    <span class="table__text table__text-weekday">{{ item.weekDay }}</span>
                </div>
            </div>
        </div>
        <div class="table__row" v-for="row in $store.state.currentTimetable">
            <div class="table__cell table__cell-time">{{ row.time }}</div>
            <div
                class="table__cell table__cell-day"
                :class="{
                    'table__cell-day-bronned': isBronned.status,
                    'table__cell-day-selected': isBronned.isSelected,
                }"
                v-for="(isBronned, idx) in getTimetableRows(row.days, row.time)"
                @click="selectCell($event.target, isBronned.status, { time: row.time, day: $store.state.visiblePeriod[idx].date })"
            ></div>
        </div>
        <div
            class="table__banner"
            :class="{
                'table__banner-hidden': $store.state.isTimetableLoaded == true,
            }"
        >
            <h4
                class="table__text-banner"
                :class="{
                    'table__text-banner-hidden': $store.state.isTimetableLoaded == 'pending',
                }"
            >
                Выберите сотрудника или кабинет
            </h4>
            <span
                class="table__loader"
                :class="{
                    'table__loader-visible': $store.state.isTimetableLoaded == 'pending',
                }"
            ></span>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'Table',
    data() {
        return {
            format: 'DD.MM.YYYY',
            daysArray: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
            starterDate: moment(),
        };
    },
    methods: {
        getDays(direction = null) {
            const result = [];
            result.length = this.$store.state.currentPeriod;
            if (direction == 'next') {
                this.starterDate.add({ w: this.$store.state.currentPeriod == 7 ? 1 : 2 });
            }
            if (direction == 'prev') {
                this.starterDate.subtract({ w: this.$store.state.currentPeriod == 7 ? 1 : 2 });
            }
            for (let i = 0; i < result.length; i++) {
                const currMoment = moment(this.starterDate);
                result[i] = {
                    date: currMoment.add({ d: i }).format(this.format),
                    weekDay: currMoment.day() < 7 ? this.daysArray[currMoment.day()] : this.daysArray[currMoment.day() - 7],
                };
            }
            this.$store.commit('setNewVisiblePeriod', result);
        },
        getTimetableRows(days, time) {
            const result = [];
            result.length = this.$store.state.currentPeriod;
            for (let i = 0; i < result.length; i++) {
                result[i] = {
                    status: false,
                    isSelected: false,
                };
            }
            days.forEach((day) => {
                this.$store.state.visiblePeriod.forEach((obj, idx) => {
                    if (this.$store.state.userSelectedCells.length > 0) {
                        this.$store.state.userSelectedCells.forEach((selectedCell) => {
                            if (selectedCell.time == time && selectedCell.day == obj.date) {
                                result[idx].isSelected = true;
                            }
                        });
                    }
                    if (obj.date == day) {
                        result[idx].status = true;
                    }
                });
            });
            return result;
        },
        selectCell(domEl, isBronned, cell) {
            if (!isBronned) {
                if (domEl.classList.contains('table__cell-day-selected')) {
                    this.$store.commit('removeUserSelectedCell', cell);
                } else {
                    this.$store.commit('addUserSelectedCell', cell);
                }
                domEl.classList.toggle('table__cell-day-selected');
            }
        },
        removeYearFromDate(item) {
            let arr = item.split('.');
            arr.pop();
            arr = arr.join('.');
            return arr;
        },
        changePeriod(event) {
            // удаляем у всех активных ячеек класс, что бы в новом периоде небыло ранее выделенных
            document.querySelectorAll('.table__cell-day-selected').forEach((cell) => {
                cell.classList.remove('table__cell-day-selected');
            });
            const classList = event.target.classList;
            if (classList.contains('table__cell-button-reversed')) {
                // next period
                this.getDays('next');
            } else if (classList.contains('table__cell-button')) {
                // prev period
                this.getDays('prev');
            }
        },
    },
    created() {
        this.getDays();
    },
    computed: {
        period() {
            return this.$store.state.currentPeriod;
        },
    },
    watch: {
        period() {
            this.getDays();
        },
    },
};
</script>

<style scoped lang="scss">
.table {
    position: relative;
    border: 1px solid var(--blue-color);
    border-radius: 10px;
    width: 100%;
    &-disabled {
        & .table__row {
            opacity: 0;
            visibility: hidden;
        }
    }
    &__container {
        &-cell {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            pointer-events: none;
        }
    }
    &__row {
        display: flex;
        border-bottom: 1px solid var(--table-border-color);
        min-height: 45.1px;
        & .table__cell {
            &:not(:last-child) {
                border-right: 1px solid var(--table-border-color);
            }
        }
        &:last-child {
            border-bottom: none;
        }
        &-header {
            & .table__cell {
                cursor: default;
            }
        }
    }
    &__cell {
        padding: 2px 2px 3px;
        &-time {
            min-width: 79px;
            padding-top: 10px;
            padding-bottom: 10px;
            color: var(--black-color);
            opacity: 0.5;
            text-align: center;
            font-size: 13px;
            font-weight: 500;
            line-height: normal;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &-day {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
            cursor: pointer;
            &-bronned {
                background: var(--blue-color);
                cursor: not-allowed;
            }
            &-selected {
                background: var(--light-blue-color);
            }
        }
        &-button {
            position: relative;
            align-items: flex-end;
            cursor: pointer !important;
            & .table__container-cell {
                margin-right: 3px;
            }
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 12px;
                height: 100%;
                background: var(--table-border-color) url('../assets/img/arrow.svg') no-repeat 1px center;
            }
            &-reversed {
                align-items: flex-start;
                & .table__container-cell {
                    margin-right: 0;
                    margin-left: 3px;
                }
                &::before {
                    right: 0;
                    left: unset;
                    rotate: 180deg;
                    border-bottom-left-radius: 10px;
                }
            }
            &-period-7 {
                align-items: center;
            }
        }
    }
    &__text {
        color: var(--black-color);
        opacity: 0.5;
        text-align: center;
        font-weight: 500;
        line-height: normal;
        &-date {
            font-size: 16px;
        }
        &-weekday {
            font-size: 13px;
        }
        &-banner {
            margin: 0;
            color: var(--white-color);
            text-align: center;
            font-size: 28px;
            font-weight: 500;
            line-height: 39px;
            &-hidden {
                display: none;
            }
        }
    }
    &__banner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 250px;
        display: flex;
        padding: 0px 26px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: var(--blue-color);
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 20;
        &-hidden {
            opacity: 0;
            visibility: hidden;
        }
    }
    &__loader {
        display: none;
        width: 48px;
        height: 48px;
        border: 5px solid #fff;
        border-bottom-color: transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        &-visible {
            display: inline-block;
        }

        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
}
</style>
