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
  Route.get('/projects/:id', 'ProjectController.show')
  Route.get('/projects/history/supervisor', 'ProjectController.historyProjects')
  Route.get('/projects/employee/NotProjects', 'ProjectController.findEmployeeByNotInProject')
  Route.post('/projects/storeUser', 'ProjectController.storeUserInProject')
  Route.get('/projects/removeUser/:id', 'ProjectController.removeUserProject')

  /**
   * User resource routes
   */

  Route.resource('users', 'UserController').apiOnly()

})
  .prefix('v1/supervisors')
  .namespace('Supervisor')
  .middleware(['auth', 'is:( supervisor || admin )'])
