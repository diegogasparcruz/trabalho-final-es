'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


/**
 * AS ROTAS DO
 */
Route.group(() => {

  /**
   * Departments resource routes
   */

  Route.resource('departments', 'DepartmentController').apiOnly()

  /**
   * Dependents resource routes
   */

  Route.get('/dependents', 'DependentController.index')
  Route.get('/dependents/:id', 'DependentController.show')
  Route.post('/dependents/employee/:id', 'DependentController.store')
  Route.put('/dependents/:id', 'DependentController.update')
  Route.delete('/dependents/:id', 'DependentController.destroy')

  /**
   * Projects resource routes
   */

  Route.resource('projects', 'ProjectController').apiOnly()

  /**
   * User resource routes
   */

  Route.resource('users', 'UserController').apiOnly()

  /**
   * User resource routes
   */

  Route.get('/supervisors/:id', 'SupervisorController.becomeSupervisor')

})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:( admin )'])
