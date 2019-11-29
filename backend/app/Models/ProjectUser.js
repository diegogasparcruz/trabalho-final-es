'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProjectUser extends Model {
  pointHours() {
    return this.hasMany('App/Models/PointHour')
  }
}

module.exports = ProjectUser
