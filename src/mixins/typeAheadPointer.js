export default {
  data() {
    return {
      typeAheadPointer: -1,
    }
  },

  watch: {
    filteredOptions() {
      if (this.search.length !== 0) {
        for (let i = 0; i < this.filteredOptions.length; i++) {
          if (this.selectable(this.filteredOptions[i])) {
            this.typeAheadPointer = i
            break
          }
        }
      }
    },
    open(open) {
      if (open) {
        this.typeAheadToLastSelected()
      }
    },
    selectedValue() {
      if (this.open) {
        this.typeAheadToLastSelected()
      }
    },
  },

  methods: {
    /**
     * Move the typeAheadPointer visually up the list by
     * setting it to the previous selectable option.
     * @return {void}
     */
    typeAheadUp() {
      for (let i = this.typeAheadPointer - 1; i >= 0; i--) {
        if (this.selectable(this.filteredOptions[i])) {
          this.typeAheadPointer = i
          break
        }
      }
    },

    /**
     * Move the typeAheadPointer visually down the list by
     * setting it to the next selectable option.
     * @return {void}
     */
    typeAheadDown() {
      for (
        let i = this.typeAheadPointer + 1;
        i < this.filteredOptions.length;
        i++
      ) {
        if (this.selectable(this.filteredOptions[i])) {
          this.typeAheadPointer = i
          break
        }
      }
    },

    /**
     * Select the option at the current typeAheadPointer position.
     * Optionally clear the search input on selection.
     * @return {void}
     */
    typeAheadSelect() {
      const typeAheadOption = this.filteredOptions[this.typeAheadPointer]

      if (typeAheadOption && this.selectable(typeAheadOption)) {
        this.select(typeAheadOption)
      }
    },

    /**
     * Moves the pointer to the last selected option.
     */
    typeAheadToLastSelected() {
      this.typeAheadPointer =
        this.selectedValue.length !== 0
          ? this.filteredOptions.indexOf(
            this.selectedValue[this.selectedValue.length - 1]
          )
          : -1
    },
  },
}
