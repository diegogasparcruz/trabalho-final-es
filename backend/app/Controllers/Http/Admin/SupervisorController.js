'use strict'

const User = use('App/Models/User')
const Role = use('Role')

class SupervisorController {

  async index({ response }) {

    const users = await User.all()

    const data = []

    for (let i in users.rows) {

      let user = users.rows[i]

      const roles = await user.getRoles()

      if (roles.toString() === 'supervisor')
        data.push(user)
    }

    return response.status(200).json({ data })

  }

  async show({ response, params }) {

    const supervisor = await User.find(params.id)

    const roles = await supervisor.getRoles()

    if (roles.toString() === 'supervisor') {

      const user = await User.query()
        .where('id', params.id)
        .with('project')
        .fetch()

      return response.status(200).send({ data: user })
    } else {
      return response.status(404).send({ message: 'Supervisor não encontrado' })
    }

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

  async becomeEmployee({ response, params }) {

    try {

      const user = await User.findBy('id', params.id)

      const userRole = await Role.findBy('slug', 'employee')
      const supervisorRole = await Role.findBy('slug', 'supervisor')

      await user.roles().detach([supervisorRole.id])
      await user.roles().attach([userRole.id])

    } catch (error) {
      return response.status(error.status)
    }

  }

}

module.exports = SupervisorController
