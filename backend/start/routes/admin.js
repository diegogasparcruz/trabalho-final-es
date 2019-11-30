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

  Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UserController.show')
  Route.post('/users', 'UserController.store')
  Route.put('/users/:id', 'UserController.update')
  Route.delete('/users/:id', 'UserController.destroy')
  Route.get('/employeesNotProject', 'UserController.showByNotProject')

  /**
   * User resource routes
   */

  Route.get('/supervisors', 'SupervisorController.index')
  Route.get('/supervisors/:id', 'SupervisorController.show')
  Route.get('/supervisors/becomeEmployee/:id', 'SupervisorController.becomeEmployee')
  Route.get('/supervisors/becomeSupervisor/:id', 'SupervisorController.becomeSupervisor')
  Route.get('/supervisors/historyProjects/:id', 'SupervisorController.historyProjects')

})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:( admin )'])
