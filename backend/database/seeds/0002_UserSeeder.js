'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role')
const User = use('App/Models/User')

class UserSeeder {
  async run() {

    // ADMIN
    const userAdmin = await User.create({
      name: 'Hernany Costa',
      email: 'admin@admin.com',
      password: 'admin',
      address: 'Acaraú',
      genre: 'M',
      salary: 4000,
      dt_nasc: '1998-07-13'
    })

    const adminRole = await Role.findBy('slug', 'admin')
    await userAdmin.roles().attach([adminRole.id])

    // SUPERVISOR
    const userSupervisor = await User.create({
      name: 'Diogo Eliseu',
      email: 'supervisor@all.com',
      password: '12345',
      address: 'Rua São Paulo, 1321',
      genre: 'M',
      salary: 3000,
      dt_nasc: '1997-07-13'
    })

    const supervisorRole = await Role.findBy('slug', 'supervisor')
    await userSupervisor.roles().attach([supervisorRole.id])

    // FUNCIONÁRIO
    const role = await Role.findBy('slug', 'employee')
    const employees = await Factory.model('App/Models/User').createMany(10)

    await Promise.all(

      employees.map(async employee => {
        await employee.roles().attach([role.id])
      })

    )

  }
}

module.exports = UserSeeder
