import { observable, autorun } from "mobx"

class gameStore {
  @observable tiles = []
}

const store = (window.store = new gameStore())

export default store

autorun(() => {
})
