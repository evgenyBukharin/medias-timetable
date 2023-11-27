<template>
    <button class="button" @click="submitHandler()" :disabled="$store.state.activeItemIndex == null">
        {{ $store.state.doneButtonText }}
    </button>
</template>

<script>
export default {
    name: 'DoneButton',
    methods: {
        submitHandler() {
            this.$store.dispatch('sendSelectedCells');
        },
    },
};
</script>

<style scoped lang="scss">
.button {
    padding: 6px 25px;
    border-radius: 10px;
    background: var(--blue-color);
    border: none;
    outline: none;
    color: var(--white-color);
    font-size: 22px;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    transition: opacity 0.3s ease;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
}
</style>
