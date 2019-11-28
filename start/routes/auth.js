'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * AUTH ROUTES
 */

Route.group(() => {

  Route.post('/login', 'AuthController.login').as('auth.login')

}).prefix('v1/auth').namespace('Auth')
