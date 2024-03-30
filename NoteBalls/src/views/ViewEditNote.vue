<template>
    <div class="edit-note">
      <AddEditNote
				v-model="noteContent"
        ref="addEditNoteRef"
				bgColor="link"
				placeholder="Edit Note"
				label="Edit Note"  
      >
        <template #buttons>
					<button
						@click="$router.back()" 
            class="button is-link
            is-light mr-2"
            >
              Cancel
          </button>
          <button
						@click="handleSavedClick" 
            class="button is-link
            has-background-link"
						:disabled="!noteContent"
            >
              Update Note
          </button>
        </template>
      </AddEditNote>
    </div>
</template>

<script setup>

	import { ref } from 'vue'
	import { useRoute, useRouter } from 'vue-router';
	import AddEditNote from '@/components/Notes/AddEditNoteComponent.vue';
	import { useStoreNotes } from '@/stores/storeNotes';

	const storeNotes = useStoreNotes()
	const route = useRoute()
	const router = useRouter()
	
	const noteContent = ref('')
	noteContent.value = storeNotes.getNoteContent(route.params.id)

	const handleSavedClick = () => {
		storeNotes.updateNote(route.params.id, noteContent.value)
		router.push('/')
	}

</script>