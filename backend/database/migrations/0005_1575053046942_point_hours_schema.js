'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PointHoursSchema extends Schema {
  up() {
    this.create('point_hours', (table) => {
      table.increments()
      table
        .integer('project_user_id')
        .unsigned()
        .references('id')
        .inTable('project_users')
        .onDelete('cascade')
        .onUpdate('cascade')
      table.date('date')
      table.string('entry_time')
      table.string('departure_time')
      table.timestamps()
    })
  }

  down() {
    this.drop('point_hours')
  }
}

module.exports = PointHoursSchema
