'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PointHour extends Model {
  projectUser() {
    return this.belongsTo('App/Models/ProjectUser')
  }
}

module.exports = PointHour
