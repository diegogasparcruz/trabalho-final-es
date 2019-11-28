'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up() {
    this.create('projects', (table) => {
      table.increments()
      table
        .integer('id_department')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('id_supervisor')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.string('name', 30).notNullable()
      table.integer('status').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
