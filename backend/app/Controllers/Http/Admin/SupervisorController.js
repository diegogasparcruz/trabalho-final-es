'use strict'

const User = use('App/Models/User')
const Role = use('Role')

class SupervisorController {

  async index({ response }) {

  }

  async becomeSupervisor({ response, params }) {

    try {

      const user = await User.findBy('id', params.id)

      const userRole = await Role.findBy('slug', 'employee')
      const supervisorRole = await Role.findBy('slug', 'supervisor')

      await user.roles().detach([userRole.id])
      await user.roles().attach([supervisorRole.id])

    } catch (error) {
      return response.status(error.status)
    }

  }

}

module.exports = SupervisorController
