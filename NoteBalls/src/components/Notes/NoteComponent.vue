<template>
    <div 
      class="card mb-4"
      >
      <div class="card-content">
         {{ note.content }}
         <div 
          class="has-text-right has-text-grey-light
          mr-2"
          >
            <small> {{ characterLength }}</small>
         </div>
      </div>
      <footer class="card-footer">
         <RouterLink
          :to="`editNote/${note.id}`" 
          href="#" 
          class="card-footer-item"
          >
            Edit
          </RouterLink>
         <a
          @click.prevent="modals.deleteNote = true"
          class="card-footer-item" 
          href="#" 
          >
            Delete
          </a>
      </footer>
      <ModalDeleteNote
        v-if="modals.deleteNote"
        v-model="modals.deleteNote"
        :noteId="note.id"
      />
    </div>
</template>

<script setup>
  import { computed, reactive } from 'vue'
  import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
  import { RouterLink } from 'vue-router';

  const props = defineProps({
    note: {
      type: Object,
      required: true
    }
  })

  const characterLength = computed(() => {
    const length = props.note.content.length
    const description = length > 1 ?
    'characters' : 'character'
    
    return `${length} ${description}`
  })

  const modals = reactive({
    deleteNote: false
  })

</script>