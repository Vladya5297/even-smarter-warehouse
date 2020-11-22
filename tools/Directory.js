const fs = require('fs')
const path = require('path')

/**
 * Performs interface to interact with file system
 */
class Directory {
  /**
   * Create an abstract directory to interact with
   *
   * @param {string} dirPath object containing path to directory
   */
  constructor (dirPath) {
    this.path = dirPath
  }

  /**
   * Creates directory
   *
   * @param {object} options options
   * @param {boolean} options.recursive should create all directories in path
   */
  create ({ recursive = false }) {
    try {
      fs.mkdirSync(this.path, { recursive })
    } catch {
      console.error(`An error occurred while trying to create directory ${this.path}`)
    }
  }

  /**
   * Deletes directory
   *
   * @param {object} options options
   * @param {boolean} options.recursive should create all directories in path
   */
  delete ({ recursive = false }) {
    try {
      fs.rmdirSync(this.path, { recursive })
    } catch {
      console.error(`An error occurred while trying to delete directory ${this.path}`)
    }
  }

  /**
   * Reads file
   *
   * @param {object} options options
   * @param {boolean} options.fullPath should return full path of dir content
   * @returns {string} file's content
   */
  read ({ fullPath = false }) {
    try {
      const content = fs.readdirSync(this.path)
      return fullPath ? content.map((name) => path.resolve(this.path, name)) : content
    } catch (err) {
      console.error(`An error occurred while trying to read directory ${this.path}`)
    }
  }

  /**
   * Get path represented as object
   *
   * @returns {{root: string, dir: string, name: string}}
   * path represented as object
   */
  getPath () {
    const dirPath = path.parse(this.path)
    delete dirPath.ext
    delete dirPath.base
    return dirPath
  }

  /**
   * Check if provided path is associated with directory
   *
   * @returns {boolean} check result
   */
  check () {
    try {
      return fs.statSync(this.path).isDirectory()
    } catch {
      console.error(`Directory '${this.path}' doesn't exists`)
      return false
    }
  }
}

module.exports = Directory
