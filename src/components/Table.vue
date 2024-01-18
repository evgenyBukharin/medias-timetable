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
                    'table__cell-button':
                        index == 0 || index == $store.state.visiblePeriod.length - 1,
                    'table__cell-button-reversed': index == $store.state.visiblePeriod.length - 1,
                    'table__cell-button-period-7': $store.state.currentPeriod == 7,
                }"
                v-for="(item, index) in $store.state.visiblePeriod"
                @click="changePeriod($event)"
            >
                <div class="table__container-cell">
                    <span class="table__text table__text-date">
                        {{ removeYearFromDate(item.date) }}
                    </span>
                    <span class="table__text table__text-weekday">{{ item.weekDay }}</span>
                </div>
            </div>
        </div>
        <div class="table__container-columns">
            <!-- колонка со всем временем -->
            <div class="table__column table__column-time">
                <div class="table__row-pseudo" v-for="chunk in getChunkedTimetableKeys()">
                    <div
                        class="table__cell table__cell-time"
                        :class="{
                            'table__cell-time-none': idx !== 0,
                        }"
                        v-for="(quarterTime, idx) in chunk"
                    >
                        {{ quarterTime }}
                    </div>
                </div>
            </div>
            <!-- основная таблица -->
            <div class="table__column" v-for="(column, columnIdx) in getVisibleColumns()">
                <div
                    v-for="(cell, idx) in getCells(column, columnIdx)"
                    class="table__cell table__cell-day table__cell-day-inner"
                    :class="{
                        'table__cell-day-bronned': cell.isBronned,
                        'table__cell-day-bronned-allowed': $store.state.isAdmin && cell.isBronned,
                        'table__cell-day-selected': cell.isSelected,
                        'table__cell-day-notworking': cell.notWorking,
                        'table__cell-day-lastCell': cell.isLastCell,
                    }"
                    @mouseover="cellEntered($event)"
                    @mouseleave="cellLeaved($event)"
                    @click="selectCell(columnIdx, idx, $event, cell.appointmentId)"
                    :title="idx"
                ></div>
            </div>
        </div>
        <!-- баннер для скрытия таблицы -->
        <div
            class="table__container-banner"
            :class="{
                'table__container-banner-hidden': $store.state.isTimetableLoaded == true,
            }"
        >
            <div class="table__banner">
                <h4
                    class="table__text-banner"
                    :class="{
                        'table__text-banner-hidden': $store.state.isTimetableLoaded == 'pending',
                    }"
                >
                    Выберите сотрудника
                </h4>
                <span
                    class="table__loader"
                    :class="{
                        'table__loader-visible': $store.state.isTimetableLoaded == 'pending',
                    }"
                ></span>
            </div>
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
                    weekDay:
                        currMoment.day() < 7
                            ? this.daysArray[currMoment.day()]
                            : this.daysArray[currMoment.day() - 7],
                };
            }
            this.$store.commit('setNewVisiblePeriod', result);
        },
        getVisibleColumns() {
            this.quartersToFill = this.$store.state.currentService.duration / 15;
            const columnsArray = [];
            columnsArray.length = this.$store.state.currentPeriod;
            for (let i = 0; i < columnsArray.length; i++) {
                let columnDay = this.$store.state.visiblePeriod[i].date;
                let dayTimetable = this.$store.state.currentTimetable[columnDay];

                // задаем содержание колонны не циклом во имя эфеективности и что бы все не привязывалось к переменной
                // из за которой все колонны будут ее мутировать и из нее же отрисовываться
                // (проверяем, есть ли расписание на день)
                if (typeof dayTimetable == 'object') {
                    // console.log(columnDay, dayTimetable.doctorTime);
                    // проверяем, работает ли врач весь день
                    if (
                        dayTimetable.doctorTime.workdayStart == '9:00' &&
                        dayTimetable.doctorTime.workdayEnd == '21:00'
                    ) {
                        // обычная пустая кликабельная колонна (врач работает весь день)
                        columnsArray[i] = {
                            '9:00': {
                                isBronned: false,
                            },
                            '9:15': {
                                isBronned: false,
                            },
                            '9:30': {
                                isBronned: false,
                            },
                            '9:45': {
                                isBronned: false,
                            },
                            '10:00': {
                                isBronned: false,
                            },
                            '10:15': {
                                isBronned: false,
                            },
                            '10:30': {
                                isBronned: false,
                            },
                            '10:45': {
                                isBronned: false,
                            },
                            '11:00': {
                                isBronned: false,
                            },
                            '11:15': {
                                isBronned: false,
                            },
                            '11:30': {
                                isBronned: false,
                            },
                            '11:45': {
                                isBronned: false,
                            },
                            '12:00': {
                                isBronned: false,
                            },
                            '12:15': {
                                isBronned: false,
                            },
                            '12:30': {
                                isBronned: false,
                            },
                            '12:45': {
                                isBronned: false,
                            },
                            '13:00': {
                                isBronned: false,
                            },
                            '13:15': {
                                isBronned: false,
                            },
                            '13:30': {
                                isBronned: false,
                            },
                            '13:45': {
                                isBronned: false,
                            },
                            '14:00': {
                                isBronned: false,
                            },
                            '14:15': {
                                isBronned: false,
                            },
                            '14:30': {
                                isBronned: false,
                            },
                            '14:45': {
                                isBronned: false,
                            },
                            '15:00': {
                                isBronned: false,
                            },
                            '15:15': {
                                isBronned: false,
                            },
                            '15:30': {
                                isBronned: false,
                            },
                            '15:45': {
                                isBronned: false,
                            },
                            '16:00': {
                                isBronned: false,
                            },
                            '16:15': {
                                isBronned: false,
                            },
                            '16:30': {
                                isBronned: false,
                            },
                            '16:45': {
                                isBronned: false,
                            },
                            '17:00': {
                                isBronned: false,
                            },
                            '17:15': {
                                isBronned: false,
                            },
                            '17:30': {
                                isBronned: false,
                            },
                            '17:45': {
                                isBronned: false,
                            },
                            '18:00': {
                                isBronned: false,
                            },
                            '18:15': {
                                isBronned: false,
                            },
                            '18:30': {
                                isBronned: false,
                            },
                            '18:45': {
                                isBronned: false,
                            },
                            '19:00': {
                                isBronned: false,
                            },
                            '19:15': {
                                isBronned: false,
                            },
                            '19:30': {
                                isBronned: false,
                            },
                            '19:45': {
                                isBronned: false,
                            },
                            '20:00': {
                                isBronned: false,
                            },
                            '20:15': {
                                isBronned: false,
                            },
                            '20:30': {
                                isBronned: false,
                            },
                            '20:45': {
                                isBronned: false,
                            },
                        };
                    } else {
                        // изменяем колонну в соответсвии с периодом работы в текущий день
                        let tempColumn = {
                            '9:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '9:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '9:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '9:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '10:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '10:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '10:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '10:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '11:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '11:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '11:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '11:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '12:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '12:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '12:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '12:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '13:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '13:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '13:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '13:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '14:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '14:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '14:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '14:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '15:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '15:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '15:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '15:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '16:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '16:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '16:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '16:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '17:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '17:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '17:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '17:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '18:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '18:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '18:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '18:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '19:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '19:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '19:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '19:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '20:00': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '20:15': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '20:30': {
                                isBronned: false,
                                notWorking: true,
                            },
                            '20:45': {
                                isBronned: false,
                                notWorking: true,
                            },
                        };
                        let startIdx = Object.keys(tempColumn).findIndex((quarter) => {
                            return quarter == dayTimetable.doctorTime.workdayStart;
                        });
                        // считаем количество часов работы
                        let quartersToEnable =
                            dayTimetable.doctorTime.workdayEnd.split(':')[0] -
                            dayTimetable.doctorTime.workdayStart.split(':')[0];
                        // считаем количество четвертей часа
                        quartersToEnable *= 4;
                        let columnValues = Object.values(tempColumn);
                        for (let i = startIdx; i < startIdx + quartersToEnable; i++) {
                            columnValues[i].notWorking = false;
                        }
                        columnsArray[i] = tempColumn;
                    }
                } else {
                    // расписания нет на день, колонная полностью не доступна
                    columnsArray[i] = {
                        '9:00': {
                            notWorking: true,
                        },
                        '9:15': {
                            notWorking: true,
                        },
                        '9:30': {
                            notWorking: true,
                        },
                        '9:45': {
                            notWorking: true,
                        },
                        '10:00': {
                            notWorking: true,
                        },
                        '10:15': {
                            notWorking: true,
                        },
                        '10:30': {
                            notWorking: true,
                        },
                        '10:45': {
                            notWorking: true,
                        },
                        '11:00': {
                            notWorking: true,
                        },
                        '11:15': {
                            notWorking: true,
                        },
                        '11:30': {
                            notWorking: true,
                        },
                        '11:45': {
                            notWorking: true,
                        },
                        '12:00': {
                            notWorking: true,
                        },
                        '12:15': {
                            notWorking: true,
                        },
                        '12:30': {
                            notWorking: true,
                        },
                        '12:45': {
                            notWorking: true,
                        },
                        '13:00': {
                            notWorking: true,
                        },
                        '13:15': {
                            notWorking: true,
                        },
                        '13:30': {
                            notWorking: true,
                        },
                        '13:45': {
                            notWorking: true,
                        },
                        '14:00': {
                            notWorking: true,
                        },
                        '14:15': {
                            notWorking: true,
                        },
                        '14:30': {
                            notWorking: true,
                        },
                        '14:45': {
                            notWorking: true,
                        },
                        '15:00': {
                            notWorking: true,
                        },
                        '15:15': {
                            notWorking: true,
                        },
                        '15:30': {
                            notWorking: true,
                        },
                        '15:45': {
                            notWorking: true,
                        },
                        '16:00': {
                            notWorking: true,
                        },
                        '16:15': {
                            notWorking: true,
                        },
                        '16:30': {
                            notWorking: true,
                        },
                        '16:45': {
                            notWorking: true,
                        },
                        '17:00': {
                            notWorking: true,
                        },
                        '17:15': {
                            notWorking: true,
                        },
                        '17:30': {
                            notWorking: true,
                        },
                        '17:45': {
                            notWorking: true,
                        },
                        '18:00': {
                            notWorking: true,
                        },
                        '18:15': {
                            notWorking: true,
                        },
                        '18:30': {
                            notWorking: true,
                        },
                        '18:45': {
                            notWorking: true,
                        },
                        '19:00': {
                            notWorking: true,
                        },
                        '19:15': {
                            notWorking: true,
                        },
                        '19:30': {
                            notWorking: true,
                        },
                        '19:45': {
                            notWorking: true,
                        },
                        '20:00': {
                            notWorking: true,
                        },
                        '20:15': {
                            notWorking: true,
                        },
                        '20:30': {
                            notWorking: true,
                        },
                        '20:45': {
                            notWorking: true,
                        },
                    };
                }
            }
            return columnsArray;
        },
        getCells(column, columnIdx) {
            let columnDay = this.$store.state.visiblePeriod[columnIdx].date;
            let dayTimetable = this.$store.state.currentTimetable[columnDay];
            if (dayTimetable) {
                dayTimetable.services.forEach((serviceObj) => {
                    let startId = Object.keys(column).findIndex((quarter) => {
                        return quarter == serviceObj.start;
                    });
                    for (let i = 0; i < this.quartersToFill; i++) {
                        let currCell = Object.values(column)[startId + i];
                        currCell.isBronned = true;
                        currCell.appointmentId = serviceObj.appointmentId;
                        if (this.quartersToFill - 1 == i) {
                            currCell.isLastCell = true;
                        }
                    }
                });
            }
            return column;
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
                // next period (ограничение оказалось не нужным)
                // let nextPeriodFirstMoment = moment(
                //     this.$store.state.visiblePeriod[this.$store.state.visiblePeriod.length - 1].date
                //         .split('.')
                //         .reverse()
                //         .join('-')
                // );
                // let nextPeriodMonthId = nextPeriodFirstMoment.add({ d: 1 }).get('month');
                // if (
                //     this.$store.state.allowedMonthsIds.includes(nextPeriodMonthId) ||
                //     nextPeriodMonthId <= this.starterDate.get('month')
                // ) {
                //     this.getDays('next');
                // }
                this.getDays('next');
            } else if (classList.contains('table__cell-button')) {
                if (this.starterDate.calendar().split(' ')[0] !== 'Today') {
                    // prev period
                    this.getDays('prev');
                }
            }
        },
        getChunkedTimetableKeys() {
            let keys = Object.keys(this.$store.state.timetableColumnTemplate);
            let chunkSize = 4;
            let chunkedKeys = [];
            for (let i = 0; i < keys.length; i += chunkSize) {
                const chunk = keys.slice(i, i + chunkSize);
                chunkedKeys.push(chunk);
            }
            return chunkedKeys;
        },
        cellEntered(event) {
            let currentCell = event.target;
            for (let i = 0; i < this.quartersToFill; i++) {
                currentCell.classList.add('table__cell-day-selected');
                if (currentCell.nextElementSibling !== null) {
                    currentCell = currentCell.nextElementSibling;
                } else {
                    break;
                }
            }
        },
        cellLeaved(event) {
            let currentCell = event.target;
            for (let i = 0; i < this.quartersToFill; i++) {
                currentCell.classList.remove('table__cell-day-selected');
                if (currentCell.nextElementSibling !== null) {
                    currentCell = currentCell.nextElementSibling;
                } else {
                    break;
                }
            }
        },
        selectCell(columnIdx, quarter, event, appointmentId) {
            if (
                this.$store.state.isAdmin &&
                event.target.classList.contains('table__cell-day-bronned-allowed')
            ) {
                window.open(
                    `https://facebody.ru/appointments/zapisi-na-priem/?edit=${appointmentId}`
                );
            }
            let currentCell = event.target;
            if (this.checkIsCellAvailable(currentCell)) {
                let selectedDate = this.$store.state.visiblePeriod[columnIdx].date;
                let selectedTime = quarter;
                if (this.$store.state.isThereAnySelectedCells == true) {
                    this.clearUserSelectedCells();
                }
                for (let i = 0; i < this.quartersToFill; i++) {
                    if (
                        (currentCell.nextElementSibling !== null &&
                            this.checkIsCellAvailable(currentCell.nextElementSibling)) ||
                        i == this.quartersToFill - 1
                    ) {
                        currentCell.classList.add('table__cell-day-selected-user');
                        currentCell = currentCell.nextElementSibling;
                        // если последняя ячейка доступна и будет закрашена, но обновляем данные о выбранной дате
                        if (i == this.quartersToFill - 1) {
                            this.$store.commit('setNewSelectedCellsData', {
                                date: selectedDate,
                                time: selectedTime,
                            });
                        }
                        if (this.$store.state.isThereAnySelectedCells == false) {
                            this.$store.commit('setIsThereAnySelectedCells', true);
                        }
                    } else {
                        this.clearUserSelectedCells();
                        this.$store.commit('setIsThereAnySelectedCells', false);
                        this.$store.commit('setNewSelectedCellsData', {
                            date: selectedDate,
                            time: selectedTime,
                        });
                        break;
                    }
                }
            }
        },
        checkIsCellAvailable(cell) {
            if (
                !cell.classList.contains('table__cell-day-notworking') &&
                !cell.classList.contains('table__cell-day-bronned')
            ) {
                return true;
            }
            return false;
        },
        clearUserSelectedCells() {
            this.$store.dispatch('clearUserSelectedCells');
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

<style lang="scss">
.table {
    position: relative;
    border: 1px solid var(--blue-color);
    border-radius: 10px;
    width: 100%;
    margin-bottom: 0;
    height: fit-content;
    overflow: hidden;
    &-disabled {
        & .table__row {
            opacity: 0;
            visibility: hidden;
        }
        filter: grayscale(1);
    }
    &__container {
        &-cell {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            pointer-events: none;
        }
        &-columns {
            display: flex;
        }
        &-banner {
            position: absolute;
            inset: 0;
            border-radius: 10px;
            background: var(--white-color);
            transition: opacity 0.3s ease, visibility 0.3s ease;
            &-hidden {
                opacity: 0;
                visibility: hidden;
            }
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
        &-container {
            width: 100%;
            height: 45px;
            display: flex;
            flex-direction: column;
            & .table__row-inner:not(:last-child) {
                border-bottom: 1px solid var(--grey-color);
            }
        }
        &-inner {
            display: flex;
            width: 100%;
            height: 100%;
        }
        &-pseudo {
            display: flex;
            flex-direction: column;
        }
    }
    &__column {
        width: 100%;
        display: flex;
        flex-direction: column;
        &-time {
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--table-border-color);
            max-width: 79px;
        }
        &:last-child {
            & .table__cell-day {
                border-right: none;
            }
        }
    }
    &__cell {
        padding: 2px 2px 3px;
        &-time {
            min-width: 79px;
            max-width: 79px;
            padding-top: 10px;
            padding-bottom: 10px;
            color: var(--black-color);
            opacity: 0.5;
            text-align: center;
            font-size: 15px;
            font-weight: 500;
            line-height: normal;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid var(--table-border-color);
            height: 56px;
            &-empty {
                height: unset;
            }
            &-none {
                display: none;
            }
        }
        &-day {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            // transition: background 0.3s ease;
            cursor: pointer;
            &-inner {
                font-size: 8px;
                padding: 1px;
                height: 14px;
                border-bottom: 1px solid #78787878;
                border-right: 1px solid #78787878;
            }
            &-bronned {
                background: rgba(120, 120, 120, 0.4705882353) !important;
                border-bottom: none;
                border-color: #fff;
                cursor: not-allowed;
                &-allowed {
                    cursor: pointer;
                    background: rgba(82, 82, 82, 0.72) !important;
                }
            }
            &-selected {
                background: var(--blue-color);
                border-bottom: none;
                border-right: 1px solid var(--white-color);
                opacity: 0.9;
                &-user {
                    background: var(--blue-color);
                    border-right: 1px solid var(--white-color);
                    opacity: 1 !important;
                    border-bottom: none;
                }
            }
            &-borderless {
                border-bottom: none;
            }
            &-notworking {
                background: #78787878;
                border-bottom: none;
                border-color: #fff;
                cursor: not-allowed;
            }
            &-lastCell {
                border-bottom: 1px solid var(--white-color);
            }
        }
        &-button {
            position: relative;
            align-items: flex-end;
            cursor: pointer !important;
            & .table__container-cell {
                margin-right: 6px;
            }
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 12px;
                height: 100%;
                background: var(--table-border-color) url('../assets/img/arrow.svg') no-repeat 1px
                    center;
            }
            &-reversed {
                align-items: flex-start;
                & .table__container-cell {
                    margin-right: 0;
                    margin-left: 4px;
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
        height: 140px;
        display: flex;
        padding: 0px 26px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: #787878;
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
