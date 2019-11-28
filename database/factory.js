'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    name: faker.first(),
    email: faker.email({ domain: 'all.com' }),
    password: 'secret',
    address: faker.address(),
    genre: 'M',
    salary: faker.floating({ min: 1000, max: 3000, fixed: 2 }),
    dt_nasc: '1980-12-10'
  }
})

Factory.blueprint('App/Models/Dependent', (faker) => {
  return {
    name: faker.last(),
    genre: 'M',
    dt_nasc: '1990-12-10'
  }
})

Factory.blueprint('App/Models/Department', (faker) => {
  return {
    name: faker.country({ full: true }),
    description: faker.sentence()
  }
})

Factory.blueprint('App/Models/Project', (faker) => {
  return {
    name: faker.animal(),
    status: 1
  }
})
