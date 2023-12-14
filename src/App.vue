<template>
    <div class="timetable__container">
        <div class="timetable__content">
            <Header />
            <div class="timetable" v-show="$store.state.isServiceChanged">
                <div class="timetable__flex">
                    <TimetableColumn />
                    <Table />
                </div>
                <div class="timetable__container-button">
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
    </div>
</template>

<script>
import Header from './components/Header.vue';
import TimetableColumn from './components/TimetableColumn.vue';
import Table from './components/Table.vue';
import DoneButton from './components/DoneButton.vue';

export default {
    name: 'App',
    components: { Header, TimetableColumn, Table, DoneButton },
    mounted() {
        this.$store.dispatch('loadServiceList');
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
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: var(--font-family, sans-serif);
}
.timetable {
    margin-top: 15px;
    &__container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 20px;
        &-button {
            display: flex;
            justify-content: flex-end;
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
