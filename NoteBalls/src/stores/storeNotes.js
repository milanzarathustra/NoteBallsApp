// stores/counter.js
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [
        {
          id: 'id1',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident voluptas reiciendis, sequi quas explicabo labore minus optio modi autem, unde nam deleniti alias in rerum? Placeat obcaecati culpa excepturi omnis.'
        },
        {
          id: 'id2',
          content: 'Testing second note'
        }
      ]
    }
  },
  actions: {
    addNote(newNoteContent) {
      const currentDate = new Date().getTime(),
        id = currentDate.toString()

      let note = {
        id,
        content: newNoteContent
      }

      this.notes.unshift(note)
    },
    updateNote(id, content) {
      const index = this.notes.findIndex(note => note.id == id)

      this.notes[index].content = content;
    },
    deleteNote(idToDelete) {
      this.notes = this.notes.filter(note => note.id !== idToDelete)
    }  
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id == id)[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      });

      return count
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot))
}