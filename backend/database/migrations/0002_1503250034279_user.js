'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table
        .integer('id_department')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('address', 100).notNullable()
      table.string('genre', 1).notNullable()
      table.decimal('salary', 8, 2).notNullable()
      table.date('dt_nasc').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
