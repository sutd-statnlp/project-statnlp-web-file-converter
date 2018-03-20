
export default {
  readFileContent (file) {
    var reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    return reader
  }
}
