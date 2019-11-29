'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


/**
 * AS ROTAS DO Employee
 */
Route.group(() => {

  /**
   * Projects resource routes
   */

  Route.resource('projects', 'ProjectController').apiOnly()

  /**
   * User resource routes
   */

  Route.resource('users', 'UserController').apiOnly()

})
  .prefix('v1/employee')
  .namespace('Employee')
  .middleware(['auth'])
