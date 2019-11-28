'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentSchema extends Schema {
  up() {
    this.create('departments', (table) => {
      table.increments()
      table.string('name', 30).notNullable()
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('departments')
  }
}

module.exports = DepartmentSchema
