import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        citiesList: ['Красноярск'],
        currentCity: 'Красноярск',
        currentFillialToggler: 'ДокторОст',
        currentPeriod: 14,
        // doctorsList: [
        //     {
        //         id: 0,
        //         title: 'Кузина Оксана Владимировна',
        //         job: 'Невролог, рефлексотерапевт, цефалголог, гирудотерапевт',
        //         isOnline: false,
        //         isDoctor: true,
        //     },
        //     {
        //         id: 1,
        //         title: 'Максимова Татьяна Петровна',
        //         job: 'Главный врач, невролог высшей категории',
        //         isOnline: true,
        //         isDoctor: true,
        //     },
        //     {
        //         id: 2,
        //         title: 'Логвинова Светлана Васильевна',
        //         job: 'Невролог первой категории, рефлексотерапевт',
        //         isOnline: true,
        //         isDoctor: true,
        //     },
        //     {
        //         id: 3,
        //         title: 'Самонова Наталья Анатольевна',
        //         job: 'Невролог первой категории, рефлексотерапевт',
        //         isOnline: true,
        //         isDoctor: true,
        //     },
        //     {
        //         id: 4,
        //         title: 'Самонова Наталья Анатольевна',
        //         job: 'Невролог первой категории, рефлексотерапевт',
        //         isOnline: true,
        //         isDoctor: true,
        //     },
        //     {
        //         id: 5,
        //         title: 'Самонова Наталья Анатольевна',
        //         job: 'Невролог первой категории, рефлексотерапевт',
        //         isOnline: true,
        //         isDoctor: true,
        //     },
        //     {
        //         id: 6,
        //         image: require('../assets/img/cabinet-icon-1.svg'),
        //         title: '303 кабинет',
        //         job: 'Процедурный',
        //         isDoctor: false,
        //     },
        //     {
        //         id: 7,
        //         image: require('../assets/img/cabinet-icon-2.svg'),
        //         title: '305 кабинет',
        //         job: 'Массажный',
        //         isDoctor: false,
        //     },
        //     {
        //         id: 8,
        //         image: require('../assets/img/cabinet-icon-2.svg'),
        //         title: '305 кабинет',
        //         job: 'Массажный',
        //         isDoctor: false,
        //     },
        //     {
        //         id: 9,
        //         image: require('../assets/img/cabinet-icon-2.svg'),
        //         title: '305 кабинет',
        //         job: 'Массажный',
        //         isDoctor: false,
        //     },
        //     {
        //         id: 10,
        //         image: require('../assets/img/cabinet-icon-2.svg'),
        //         title: '305 кабинет',
        //         job: 'Массажный',
        //         isDoctor: false,
        //     },
        //     {
        //         id: 11,
        //         image: require('../assets/img/cabinet-icon-2.svg'),
        //         title: '305 кабинет',
        //         job: 'Массажный',
        //         isDoctor: false,
        //     },
        //     {
        //         id: 12,
        //         image: require('../assets/img/cabinet-icon-2.svg'),
        //         title: '305 кабинет',
        //         job: 'Массажный',
        //         isDoctor: false,
        //     },
        // ],
        activeItemIndex: null,
        currentTimetable: [],
        userSelectedCells: [],
        isTimetableLoaded: false,
        isDoctorsListLoaded: false,
        doneButtonText: 'Записать на прием',
    },
    getters: {},
    mutations: {
        updateCurrentFillial(state, newFillial) {
            state.currentFillialToggler = newFillial;
        },
        updateCurrentPeriod(state, newPeriod) {
            state.currentPeriod = newPeriod;
        },
        updateCurrentCity(state, value) {
            state.currentCity = value;
        },
        changeActiveItemIndex(state, idx) {
            state.activeItemIndex = idx;
        },
        addUserSelectedCell(state, cell) {
            state.userSelectedCells.push(cell);
        },
        removeUserSelectedCell(state, clickedCell) {
            let index = state.userSelectedCells.findIndex((cell) => {
                return cell.time == clickedCell.time && cell.day == clickedCell.day;
            });
            state.userSelectedCells.splice(index, 1);
        },
        setNewVisiblePeriod(state, array) {
            state.visiblePeriod = array;
        },
        setNewTimetable(state, timetable) {
            state.currentTimetable = timetable;
        },
        updateIsTimetableLoaded(state, value) {
            state.isTimetableLoaded = value;
        },
        updateIsDoctorsListLoaded(state, value) {
            state.isDoctorsListLoaded = value;
        },
        setNewDoctorsList(state, list) {
            state.doctorsList = list;
        },
    },
    actions: {
        loadTimetable({ state, commit }, item) {
            // get dev ver
            axios
                .get(`http://localhost:3000/timetable`)
                .then((r) => r.data)
                .then((timetable) => {
                    commit('setNewTimetable', timetable);
                    commit('updateIsTimetableLoaded', true);
                })
                .catch((error) => {
                    console.log(error);
                });
            // post prod ver
            // axios
            //     .post('https://b24-ost.ru/telephoneWidget/webhooks/timeTable.php', {
            //         clickedItem: item,
            //         currentCity: state.currentCity,
            //         currentFilial: state.currentFillialToggler,
            //     })
            //     .then((r) => r.data)
            //     .then((timetable) => {
            //         commit('setNewTimetable', timetable);
            //         commit('updateIsTimetableLoaded', true);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        },
        loadDoctorsList({ commit }) {
            // dev ver
            axios
                .get(`http://localhost:3000/doctorsList`)
                .then((r) => r.data)
                .then((list) => {
                    commit('setNewDoctorsList', list);
                    commit('updateIsDoctorsListLoaded', true);
                })
                .catch((error) => {
                    console.log(error);
                });
            // prod ver
            // axios
            //     .get(`https://b24-ost.ru/telephoneWidget/webhooks/dataPacient.php`)
            //     .then((r) => r.data)
            //     .then((list) => {
            //         commit('setNewDoctorsList', list);
            //         commit('updateIsDoctorsListLoaded', true);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        },
        sendSelectedCells({ state, commit }) {
            axios
                .post('http://summitbuttonlink', {
                    currentDoctor: state.doctorsList[state.activeItemIndex],
                    userSelectedCells: state.userSelectedCells,
                })
                .then((timetable) => {
                    commit('setNewTimetable', timetable);
                    commit('updateIsTimetableLoaded', true);
                    state.doneButtonText = 'Успешно';
                })
                .catch((error) => {
                    console.log(error);
                    state.doneButtonText = 'Не удалось записать';
                });
        },
    },
    modules: {},
});
