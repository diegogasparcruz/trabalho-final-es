'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Role = use('Role')

class RoleSeeder {
  async run() {

    //Cria o admin
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do sistema!'
    })

    //Cria o cargo de supervisor de projeto
    await Role.create({
      name: 'Supervisor',
      slug: 'supervisor',
      description: 'Supervisor de projeto!'
    })

    // Cria o cargo de empregado
    await Role.create({
      name: 'Employee',
      slug: 'employee',
      description: 'Empregado da empresa!'
    })

  }
}

module.exports = RoleSeeder
