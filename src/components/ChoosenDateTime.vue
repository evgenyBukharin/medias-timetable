<template>
    <h3
        class="datetime__text"
        :class="{
            'datetime__text-hidden': !$store.state.isThereAnySelectedCells,
        }"
    >
        Выбранная дата и время:
        {{ $store.state.selectedCellsData.date }}
        {{ $store.state.selectedCellsData.time }}
    </h3>
</template>

<script>
export default {
    name: 'ChoosenDateTime',
};
</script>

<style scoped lang="scss">
.datetime {
    &__text {
        margin: 0;
        font-family: var(--font-family);
        font-size: 22px;
        letter-spacing: -0.3px;
        font-weight: 500;
        transition: opacity 0.2s ease, visibility 0.2s ease;
        &-hidden {
            opacity: 0;
            visibility: hidden;
        }
    }
}
</style>
