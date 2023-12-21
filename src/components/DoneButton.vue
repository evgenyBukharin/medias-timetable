<template>
    <button
        class="button"
        @click="submitHandler()"
        :disabled="$store.state.activeItemIndex == null"
    >
        {{ $store.state.doneButtonText }}
    </button>
</template>

<script>
export default {
    name: 'DoneButton',
    methods: {
        submitHandler() {
            if (this.checkFormValidity()) {
                this.$store.dispatch('sendSelectedCells');
            }
        },
        checkFormValidity() {
            for (let key of Object.keys(this.$store.state.userFormData)) {
                if (this.$store.state.userFormData[key].isValid !== true) {
                    this.$store.state.userFormData[key].isValid = false;
                    return false;
                }
            }
            return true;
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
