import { observable, autorun } from "mobx"

class gameStore {
  @observable tiles = []
}

const store =  new gameStore

export default store

autorun(() => {
})
