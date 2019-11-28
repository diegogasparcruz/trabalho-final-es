'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DependentSchema extends Schema {
  up() {
    this.create('dependents', (table) => {
      table.increments()
      table
        .integer('id_user')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('name', 50).notNullable()
      table.string('genre', 1).notNullable()
      table.date('dt_nasc').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('dependents')
  }
}

module.exports = DependentSchema
