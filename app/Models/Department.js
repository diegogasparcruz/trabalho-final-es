'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Department extends Model {

  users() {
    return this.hasMany('App/Models/User')
  }

  projects() {
    return this.hasMany('App/Models/Project')
  }

}

module.exports = Department
