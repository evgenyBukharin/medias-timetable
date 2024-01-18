<template>
    <div class="timetable__container">
        <div class="timetable__content">
            <Header />
            <div class="timetable" v-show="$store.state.isServiceSelected">
                <div class="timetable__flex">
                    <TimetableColumn />
                    <Table />
                </div>
                <div class="timetable__container-button">
                    <ChoosenDateTime />
                    <DoneButton />
                </div>
                <div
                    class="timetable__mask"
                    :class="{
                        'timetable__mask-disabled': $store.state.isDoctorsListLoaded,
                    }"
                ></div>
            </div>
        </div>
        <div
            class="timetable__result"
            :class="{
                'timetable__result-visible': $store.state.isResultVisible,
            }"
        >
            <div class="timetable__body">
                <div class="timetable__title-result">{{ $store.state.resultTitle }}</div>
                <div
                    class="timetable__title-result-smaller"
                    v-if="$store.state.showResultCellsData"
                >
                    <span>
                        <span class="timetable__title-result-smaller-underline">Доктор:</span>
                        {{ $store.state.doctorsList[$store.state.activeItemIndex]?.title }}
                    </span>
                    <span>
                        <span class="timetable__title-result-smaller-underline">
                            Начало приема:
                        </span>
                        {{ $store.state.selectedCellsData.time }}
                        {{ $store.state.selectedCellsData.date }}
                    </span>
                </div>
                <button
                    class="timetable__button"
                    @click="$store.commit('updateIsResultVisible', false)"
                >
                    Закрыть
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue';
import TimetableColumn from './components/TimetableColumn.vue';
import Table from './components/Table.vue';
import DoneButton from './components/DoneButton.vue';
import ChoosenDateTime from './components/ChoosenDateTime.vue';

export default {
    name: 'App',
    components: { Header, TimetableColumn, Table, DoneButton, ChoosenDateTime },
    mounted() {
        this.$store.dispatch('loadServiceList');
        this.$store.dispatch('loadAllowedMonthsIds');
        if (localStorage.getItem('innerUserId') == 2 || localStorage.getItem('innerUserId') == 8) {
            this.$store.commit('updateIsAdmin', true);
        }
    },
};
</script>

<style lang="scss">
#inner-headline {
    width: 1140px;
    margin: 0 auto;
}
#content .container {
    width: 1440px;
}
html {
    box-sizing: border-box;
}
*,
*::before,
*::after {
    box-sizing: inherit;
}
:root {
    --font-family: 'Montserrat', sans-serif;
    --white-color: #fff;
    --grey-color: #eee;
    --dark-grey-color: #ececec;
    --black-color: #000;
    --blue-color: #964377;
    --light-blue-color: #964377;
    --orange-color: #964377;
    --table-border-color: #78787833;
}
body {
    background: var(--white-color);
    // min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: var(--font-family, sans-serif);
}
.timetable {
    margin-top: 15px;
    min-height: 520px;
    &__container {
        position: relative;
        max-width: 1440px;
        margin: 0 auto;
        padding: 20px;
        &-button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin-top: 30px;
        }
    }
    &__content {
        position: relative;
        background: var(--white-color);
        border-radius: 25px;
    }
    &__flex {
        display: flex;
        gap: 15px;
        min-height: 560px;
    }
    &__mask {
        position: absolute;
        inset: 0;
        z-index: 25;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 25px;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        &-disabled {
            opacity: 0;
            visibility: hidden;
        }
    }
    &__result {
        position: absolute;
        inset: 0;
        padding: 25px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(4px);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        &-visible {
            opacity: 1;
            visibility: visible;
        }
    }
    &__body {
        border: 1px solid var(--blue-color);
        padding: 34px 40px;
        border-radius: 10px;
        background: var(--white-color);
    }
    &__title {
        &-result {
            font-size: 28px;
            line-height: 120%;
            font-weight: 600;
            margin-bottom: 12px;
            &-smaller {
                display: flex;
                flex-direction: column;
                gap: 4px;
                font-size: 18px;
                line-height: 120%;
                font-weight: 400;
                &-underline {
                    text-decoration: underline;
                    text-underline-offset: 4px;
                }
            }
        }
    }
    &__button {
        display: block;
        margin: 0 auto;
        margin-top: 24px;
        padding: 7px 28px;
        border-radius: 10px;
        background: var(--blue-color);
        border: none;
        outline: none;
        color: var(--white-color);
        font-size: 18px;
        font-weight: 500;
        line-height: normal;
        cursor: pointer;
    }
}
.list-reset {
    list-style: none;
    margin: 0;
    padding: 0;
}
@font-face {
    font-family: Montserrat;
    src: url(./assets/fonts/Montserrat-Regular.woff2) format('woff2');
    font-weight: 400;
    font-display: swap;
    font-style: normal;
}
@font-face {
    font-family: Montserrat;
    src: url(./assets/fonts/Montserrat-Medium.woff2) format('woff2');
    font-weight: 500;
    font-display: swap;
    font-style: normal;
}
@font-face {
    font-family: Montserrat;
    src: url(./assets/fonts/Montserrat-SemiBold.woff2) format('woff2');
    font-weight: 600;
    font-display: swap;
    font-style: normal;
}
@font-face {
    font-family: Montserrat;
    src: url(./assets/fonts/Montserrat-Bold.woff2) format('woff2');
    font-weight: 700;
    font-display: swap;
    font-style: bold;
}
@font-face {
    font-family: 'Open Sans';
    src: url(./assets/fonts/OpenSans-Regular.woff2) format('woff2');
    font-weight: 400;
    font-display: swap;
    font-style: normal;
}
@font-face {
    font-family: 'Open Sans';
    src: url(./assets/fonts/OpenSans-SemiBold.woff2) format('woff2');
    font-weight: 500;
    font-display: swap;
    font-style: normal;
}
</style>
