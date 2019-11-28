'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {

  users() {
    return this
      .belongsToMany('App/Models/User')
      .pivotTable('project_users')
  }

}

module.exports = Project
