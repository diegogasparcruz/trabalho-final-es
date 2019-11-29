'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectUserSchema extends Schema {
  up() {
    this.create('project_users', (table) => {
      table.increments()
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down() {
    this.drop('project_users')
  }
}

module.exports = ProjectUserSchema
