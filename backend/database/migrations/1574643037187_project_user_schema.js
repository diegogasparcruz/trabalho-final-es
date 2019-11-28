'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectUserSchema extends Schema {
  up() {
    this.create('project_users', (table) => {
      table.increments()
      table
        .integer('id_project')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('id_user')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.date('date_begin').notNullable()
      table.date('date_end').notNullable()
      table.string('week_hours').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('project_users')
  }
}

module.exports = ProjectUserSchema
