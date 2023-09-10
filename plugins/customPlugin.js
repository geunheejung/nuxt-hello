export default ({ app }, inject) => {
  // Inject in Vue, context and store.
  inject('replaceImgUrl', (url, id) => {
    if (!url) return ''
    return url.replace('{id}', id.toString())
  })
}
