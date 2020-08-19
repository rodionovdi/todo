export default class Folder {
  constructor (
    title,
    post,
    task = null,
    user = null,
    id = null,
  ) {
    this.title = title,
    this.post = post,
    this.task = task,
    this.user = user,
    this.id = id
  }
}