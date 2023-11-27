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
                    <img :src="item.image" width="40" height="40" alt="Иконка кабинета" v-if="!item.isDoctor" />
                    <h4
                        class="timetableColumn__title"
                        :class="{
                            'timetableColumn__title-online': item.isOnline,
                        }"
                    >
                        {{ item.title }}
                    </h4>
                    <h5 class="timetableColumn__job">{{ item.job }}</h5>
                    <div class="timetableColumn__online" v-if="item.isOnline">
                        <img src="../assets/img/online.svg" width="26" height="31" alt="Онлайн прием" />
                    </div>
                </div>
            </div>
        </simplebar>
    </div>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';
export default {
    name: 'TimetableColumn',
    components: { simplebar },
    methods: {
        toggleActivity(event, index, item) {
            if (this.$store.state.activeItemIndex !== index) {
                if (this.$store.state.activeItemIndex !== null) {
                    document.getElementById('item' + this.$store.state.activeItemIndex).classList.remove('timetableColumn__item-active');
                }
                event.target.classList.add('timetableColumn__item-active');
                this.$store.commit('changeActiveItemIndex', index);
                this.$store.dispatch('loadTimetable', item);
            }
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
        gap: 8px;
        border: 1px solid transparent;
        transition: border 0.3s ease;
        cursor: pointer;
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
        max-height: 682px;
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
}
</style>
