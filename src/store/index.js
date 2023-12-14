import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        citiesList: ['Красноярск'],
        currentCity: 'Красноярск',
        currentService: '',
        currentFillialToggler: 'ДокторОст',
        currentPeriod: 14,
        activeItemIndex: null,
        currentTimetable: [],
        userSelectedCells: [],
        isTimetableLoaded: false,
        isDoctorsListLoaded: false,
        isServiceChanged: false,
        isDoctorChanged: false,
        doneButtonText: 'Записать на прием',
        userFormData: {
            name: '',
            surname: '',
            fatherName: '',
            phone: '',
            birthday: null,
        },
        serviceList: [],
        currentService: {
            name: '',
            duration: 30,
        },
        currentCabinet: 'Выберите кабинет',
        filterValue: '',
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
        updateCurrentService(state, service) {
            state.currentService = service;
        },
        updateCurrentCabinet(state, cabinet) {
            state.currentCabinet = cabinet;
        },
        updateCurrentFilterValue(state, name) {
            state.filterValue = name;
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
        updateIsServiceChanged(state, value) {
            state.isServiceChanged = value;
        },
        updateIsDoctorChanged(state, value) {
            state.isDoctorChanged = value;
        },
        setNewDoctorsList(state, list) {
            state.doctorsList = list;
        },
        setNewServiceList(state, list) {
            state.serviceList = list;
        },
        setNewCabinetsList(state, list) {
            state.cabinetsList = list;
        },
    },
    actions: {
        loadTimetable({ state, commit }, item) {
            // get dev ver
            // axios
            //     .get(`http://localhost:3000/timetable`)
            //     .then((r) => r.data)
            //     .then((timetable) => {
            //         commit('setNewTimetable', timetable);
            //         commit('updateIsTimetableLoaded', true);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // get prod ver medias
            axios
                .get(`/appointment/data/timeTable.php`)
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
            // axios
            //     .get(`http://localhost:3000/doctorsList`)
            //     .then((r) => r.data)
            //     .then((list) => {
            //         commit('setNewDoctorsList', list);
            //         commit('updateIsDoctorsListLoaded', true);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // prod ver medias
            axios
                .get(`/appointment/data/dataPacient.php`)
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
        loadServiceList({ commit }) {
            // dev ver
            // axios
            //     .get(`http://localhost:3000/serviceList`)
            //     .then((r) => r.data)
            //     .then((list) => {
            //         commit('setNewServiceList', list);
            //         commit('updateIsDoctorsListLoaded', true);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // prod ver
            axios
                .get(`/appointment/data/serviceList.php`)
                .then((r) => r.data)
                .then((list) => {
                    commit('setNewServiceList', list);
                    commit('updateIsDoctorsListLoaded', true);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        loadCabinetsList({ commit }, item) {
            // dev ver
            // axios
            //     .get(`http://localhost:3000/cabinetsList`)
            //     .then((r) => r.data)
            //     .then((list) => {
            //         commit('setNewCabinetsList', list);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // prod ver
            axios
                .get(`/appointment/data/dataPacient.php`)
                .then((r) => r.data)
                .then((list) => {
                    commit('setNewCabinetsList', list);
                })
                .catch((error) => {
                    console.log(error);
                });
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
