'use strict'

const Database = use('Database')

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

  async findEmployeeByNotInProject({ response }) {

    const users = await User.all()

    const data = []

    for (let i in users.rows) {

      let user = users.rows[i]

      const roles = await user.getRoles()

      if (roles.toString() === 'employee') {

        let verifyProjectUser = await Database.from('project_users').where({ user_id: user.id })

        if (verifyProjectUser.length > 0) {

          let contProj = 0

          for (let i = 0; i < verifyProjectUser.length; i++) {

            let verifyStatusProject = await Project.find(verifyProjectUser[i].project_id)

            if (verifyStatusProject.status === 1) {
              contProj++
            }

          }

          if (contProj === 0)
            data.push(user)

        } else {

          data.push(user)

        }

      }

    }

    return response.status(200).json({ data })

  }

  async storeUserInProject({ request, response, auth }) {

    const { user_id } = request.post()

    const supervisorID = auth.user.id

    const verifySupervisorProject = await Project.findBy('user_id', supervisorID)

    const project = await Project.find(verifySupervisorProject.id)

    const user = await User.find(user_id)

    if (user) {

      const roles = await user.getRoles()

      if (roles.toString() === 'employee') {

        let verifyProjectUser = await Database.from('project_users').where({ user_id: user.id })

        if (verifyProjectUser.length > 0) {

          for (let i = 0; i < verifyProjectUser.length; i++) {

            let verifyStatusProject = await Project.find(verifyProjectUser[i].project_id)

            if (verifyStatusProject === 1) {
              return response.status(401).json({ message: 'Empregado já está alocado em um projeto' })
            }
          }

          await project.users().attach([user.id])
          project.users = await project.users().fetch()

          return response.status(201).json({ data: project })

        } else {

          await project.users().attach([user.id])
          project.users = await project.users().fetch()

          return response.status(201).json({ data: project })

        }

      } else {
        return response.status(401).send({ message: 'Usuário é supervisor ou admin' })
      }

    }

  }

}

module.exports = ProjectController
