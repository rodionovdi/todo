export default class Task {
  constructor (
    folder,
    name,
    completed,
    favorites,
    user = null,
    id = null,
  ) {
    this.folder = folder,
    this.name = name,
    this.completed = completed,
    this.favorites = favorites,
    this.user = user,
    this.id = id
  }
}