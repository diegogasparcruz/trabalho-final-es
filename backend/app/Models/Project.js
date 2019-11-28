'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {

  department() {
    return this.belongsTo('App/Models/Department')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  users() {
    return this
      .belongsToMany('App/Models/User', 'project_id', 'user_id')
      .pivotTable('project_user')
  }

}

module.exports = Project
