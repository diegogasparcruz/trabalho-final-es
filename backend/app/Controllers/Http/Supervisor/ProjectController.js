'use strict'

const Project = use('App/Models/Project')
const User = use('App/Models/User')
const Role = use('Role')

class ProjectController {

  async index({ response, auth }) {

    const supervisorID = auth.user.id

    const projects = await Project.find(supervisorID)

    await projects.load('users')

    return response.status(200).json({ data: projects })

  }

  async store({ request, response, auth }) {



  }

}

module.exports = ProjectController
