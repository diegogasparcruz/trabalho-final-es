'use strict'

const Database = use('Database')

const Project = use('App/Models/Project')
const User = use('App/Models/User')

class UserController {

  async info({ response, auth }) {

    const user = await User.find(auth.user.id)

    await user.load('dependents')

    return response.status(200).json({ data: user })

  }

  async historyProjects({ response, auth }) {

    const verifyProjectsUser = await Database.from('project_users').where({ user_id: auth.user.id })

    const history = []

    for (let i = 0; i < verifyProjectsUser.length; i++) {

      let verifyProjects = await Database.from('projects').where({ id: verifyProjectsUser[i].project_id })

      history.push(verifyProjects)

    }

    return response.status(200).json({ data: history })

  }

}

module.exports = UserController
