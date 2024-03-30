import { watch } from 'vue'

export function useWatchCharacters(valueToWatch) {
  watch(valueToWatch, (value) => {
    if (value.length == 100) {
      alert("You hit 100 Characters, Congrats")
    }
  })
}