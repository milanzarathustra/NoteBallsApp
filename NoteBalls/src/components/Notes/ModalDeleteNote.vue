<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div 
      class="modal-card"
      ref="modalCardRef"
      >
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button 
          class="delete" 
          aria-label="close"
          @click="closeModal"
          >
        </button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this Note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button 
            class="button"
            @click="closeModal"
            >
            Cancel
          </button>
          <button 
            class="button is-danger"
            @click="deleteNote"
            >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useStoreNotes } from '@/stores/storeNotes'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
      default: false
    },
    noteId: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const storeNotes = useStoreNotes()
  
  const modalCardRef = ref(null)

  const closeModal = () => {
    emit('update:modelValue', false)
  }

  const deleteNote = () => {
    storeNotes.deleteNote(props.noteId)
  }

  onClickOutside(modalCardRef, () => closeModal())

  const handleKeyboard = e => {
    switch(e.key) {
      case "Escape":
        closeModal()
        break
      case "Enter":
        deleteNote()
        break
    }       
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyboard)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyboard)
  })

</script>