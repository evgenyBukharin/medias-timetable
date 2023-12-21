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
            surname: {
                value: '',
                isValid: null,
            },
            name: {
                value: '',
                isValid: null,
            },
            fatherName: {
                value: '',
                isValid: null,
            },
            phone: {
                value: '',
                isValid: null,
            },
            birthday: {
                value: null,
                isValid: null,
            },
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
        loadTimetable({ commit }, doctor) {
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
            // get prod ver medias
            // axios
            //     .post('/appointment/data/timeTable.php', {
            //         doctorId: doctor.id,
            //         idServiceDoctorCabinet: doctor.idServiceDoctorCabinet,
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
        loadDoctorsList({ state, commit }) {
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
            // prod ver medias
            // axios
            //     .post(`/appointment/data/dataPacient.php`, {
            //         id: state.currentService.id,
            //     })
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
            axios
                .get(`http://localhost:3000/serviceList`)
                .then((r) => r.data)
                .then((list) => {
                    commit('setNewServiceList', list);
                    commit('updateIsDoctorsListLoaded', true);
                })
                .catch((error) => {
                    console.log(error);
                });
            // prod ver
            // axios
            //     .get(`/appointment/data/serviceList.php`)
            //     .then((r) => r.data)
            //     .then((list) => {
            //         commit('setNewServiceList', list);
            //         commit('updateIsDoctorsListLoaded', true);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        },
        sendSelectedCells({ state, commit }) {
            // сюда в запрос еще дату и время записи, выбранные пользователем
            axios
                .post('http://summitbuttonlink', {
                    idServiceDoctorCabinet:
                        state.doctorsList[state.activeItemIndex].idServiceDoctorCabinet,
                    formData: {
                        surname: state.userFormData.surname.value,
                        name: state.userFormData.name.value,
                        fatherName: state.userFormData.fatherName.value,
                        phone: state.userFormData.phone.value,
                        birthday: state.userFormData.birthday.value,
                    },
                    innerUserId: localStorage.getItem('innerUserId'),
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
