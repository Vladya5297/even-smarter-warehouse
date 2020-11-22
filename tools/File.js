const fs = require('fs')
const path = require('path')

/**
 * Performs interface to interact with file system
 */
class File {
  /**
   * Create an abstract file to interact with
   *
   * @param {string} filePath object containing path to file
   */
  constructor (filePath) {
    this.path = filePath
  }

  /**
   * Writes data to file
   *
   * @param {string} text data to write
   */
  write (text) {
    try {
      fs.writeFileSync(this.path, text)
    } catch {
      console.error(`An error occurred while trying to write file ${this.path}`)
    }
  }

  /**
   * Writes data to .json file
   *
   * @param {object} obj data to write
   */
  writeJson (obj) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(obj))
    } catch {
      console.error(`An error occurred while trying to write file ${this.path}`)
    }
  }

  /**
   * Reads file
   *
   * @returns {string} file's content
   */
  read () {
    try {
      const data = fs.readFileSync(this.path)
      return data.toString()
    } catch (err) {
      console.error(`An error occurred while trying to read file ${this.path}`)
    }
  }

  /**
   * Reads .json file
   *
   * @returns {string} file's content
   */
  readJson () {
    try {
      const data = fs.readFileSync(this.path)
      return JSON.parse(data.toString())
    } catch (err) {
      console.error(`An error occurred while trying to read file ${this.path}`)
    }
  }

  /**
   * Deletes current file
   */
  delete () {
    try {
      fs.unlinkSync(this.path)
    } catch (err) {
      console.error(`An error occurred while trying to delete file ${this.path}`)
    }
  }

  /**
   * Check if provided path is associated with file
   *
   * @returns {boolean} check result
   */
  check () {
    try {
      return fs.statSync(this.path).isFile()
    } catch {
      console.error(`File '${this.path}' doesn't exists`)
      return false
    }
  }

  /**
   * Get path represented as object
   *
   * @returns {{root: string, dir: string, base: string, ext: string, name: string}}
   * path represented as object
   */
  getPath () {
    return path.parse(this.path)
  }

  /**
   * Rename file
   *
   * @param {string} name new file's name
   */
  rename (name) {
    const { dir, ext } = path.parse(this.path)
    const newPath = path.format({ dir, name, ext })
    try {
      fs.renameSync(this.path, newPath)
      this.path = newPath
    } catch (err) {
      console.error(`An error occurred while trying to rename file ${this.path}`)
    }
  }
}

module.exports = File
