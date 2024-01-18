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
        userSelectedCell: null,
        isTimetableLoaded: false,
        isDoctorsListLoaded: false,
        isServiceSelected: false,
        isDoctorChanged: false,
        doneButtonText: 'Записать на прием',
        doctorsList: [],
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
            duration: 45,
        },
        currentCabinet: 'Выберите кабинет',
        filterValue: '',
        // timetableColumnTemplate для столбца со врменем, не для отрисовки, иначе изменение
        // этого объекта приведет к дублированию на все столбцы расписания каждого
        timetableColumnTemplate: {
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
        },
        isThereAnySelectedCells: false,
        selectedCellsData: {
            date: null,
            time: null,
        },
        isDoneButtonBlocked: false,
        allowedMonthsIds: [0, 1, 2],
        isAdmin: false,
        isResultVisible: false,
        resultTitle: '',
        showResultCellsData: true,
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
        updateIsServiceSelected(state, value) {
            state.isServiceSelected = value;
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
        clearServiceField(state) {
            state.filterValue = '';
            state.isTimetableLoaded = false;
        },
        clearActiveDoctorDOM(state) {
            document
                .getElementById('item' + state.activeItemIndex)
                .classList.remove('timetableColumn__item-active');
        },
        setIsThereAnySelectedCells(state, value) {
            state.isThereAnySelectedCells = value;
        },
        setNewSelectedCellsData(state, data) {
            state.selectedCellsData.date = data.date;
            state.selectedCellsData.time = data.time;
        },
        setAllowedMonthsIds(state, array) {
            state.allowedMonthsIds = array;
        },
        updateIsAdmin(state, value) {
            state.isAdmin = value;
        },
        updateIsResultVisible(state, value) {
            state.isResultVisible = value;
        },
        updateResultTitle(state, value) {
            state.resultTitle = value;
        },
        updateShowResultCellsData(state, value) {
            state.showResultCellsData = value;
        },
    },
    actions: {
        loadTimetable({ commit }, doctor) {
            // dev ver
            // axios
            //     .get(`http://localhost:3000/newTimetable`)
            //     .then((r) => r.data)
            //     .then((timetable) => {
            //         commit('setNewTimetable', timetable);
            //         commit('updateIsTimetableLoaded', true);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // prod ver
            axios
                .post('/appointment/data/timeTable.php', {
                    doctorId: doctor.id,
                    idServiceDoctorCabinet: doctor.idServiceDoctorCabinet,
                })
                .then((r) => r.data)
                .then((timetable) => {
                    commit('setNewTimetable', timetable);
                    commit('updateIsTimetableLoaded', true);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        loadDoctorsList({ state, commit }) {
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
            // prod ver
            axios
                .post(`/appointment/data/dataPacient.php`, {
                    id: state.currentService.id,
                })
                .then((r) => r.data)
                .then((list) => {
                    commit('setNewDoctorsList', list);
                    commit('updateIsDoctorsListLoaded', true);
                })
                .catch((error) => {
                    console.log(error);
                });
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
        loadAllowedMonthsIds({ commit }) {
            // dev ver
            // axios
            //     .get(`http://localhost:3000/allowedMonthsIds`)
            //     .then((r) => r.data)
            //     .then((array) => {
            //         commit('setAllowedMonthsIds', array);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // prod ver
            axios
                .get(`/appointment/data/allowedMonthsIds.php`)
                .then((r) => r.data)
                .then((array) => {
                    commit('setAllowedMonthsIds', array);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        sendSelectedCells({ state, commit }) {
            // prod ver
            if (
                state.selectedCellsData.date !== null &&
                state.selectedCellsData.time !== null &&
                state.isThereAnySelectedCells == true
            ) {
                state.isDoneButtonBlocked = true;
                axios
                    .post('/appointment/handlers/makeAnAppointment.php', {
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
                        appointment_date: state.selectedCellsData.date,
                        appointment_time: state.selectedCellsData.time,
                    })
                    .then((timetable) => {
                        commit('setNewTimetable', timetable);
                        commit('updateIsTimetableLoaded', true);
                        commit('updateIsResultVisible', true);
                        state.isDoneButtonBlocked = true;
                        state.resultTitle = 'Вы успешно записались на прием';
                    })
                    .catch((error) => {
                        console.log(error);
                        commit('updateIsResultVisible', true);
                        state.isDoneButtonBlocked = false;
                        state.resultTitle = 'Не удалось записаться на прием';
                    });
            } else {
                state.doneButtonText = 'Время и дата не выбраны';
            }
        },
        clearActiveDoctor({ commit }) {
            commit('clearActiveDoctorDOM');
            commit('changeActiveItemIndex', null);
        },
        clearUserSelectedCells() {
            document.querySelectorAll('.table__cell-day-selected-user').forEach((cell) => {
                cell.classList.remove('table__cell-day-selected-user');
            });
        },
    },
    modules: {},
});
