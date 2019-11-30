'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


/**
 * AS ROTAS DO SUPERVISOR
 */
Route.group(() => {

  /**
   * Projects resource routes
   */

  Route.get('/projects', 'ProjectController.index')
  Route.get('/projects/history', 'ProjectController.historyProjects')
  Route.get('/projects/employeeNotProjects', 'ProjectController.findEmployeeByNotInProject')
  Route.post('/projects/storeUser', 'ProjectController.storeUserInProject')

  /**
   * User resource routes
   */

  Route.resource('users', 'UserController').apiOnly()

})
  .prefix('v1/supervisors')
  .namespace('Supervisor')
  .middleware(['auth', 'is:( supervisor || admin )'])
