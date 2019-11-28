'use strict'

const Database = use('Database')
const Project = use('App/Models/Project')

class ProjectController {

  async index({ response }) {

    try {

      const projects = await Project.query()
        .orderBy('created_at', 'desc')
        .fetch()

      return response.status(200).send({ data: projects })

    } catch (error) {
      return response.status(error.status)
    }


  }

  async store({ request, response }) {

    const trx = await Database.beginTransaction()

    try {

      const { id_department, id_supervisor, name, status } = request.all()

      const project = await Project.create({
        id_department,
        id_supervisor,
        name,
        status
      }, trx)

      trx.commit()

      return response.status(201).send({ data: project })

    } catch (error) {
      await trx.rollback()
      return response.status(400).send({ message: 'Erro ao realizar cadastro!' })
    }

  }

  async show({ response, params }) {

    try {

      const project = await Project.findOrFail(params.id)

      return response.status(200).send({ data: project })

    } catch (error) {
      return response.status(500).send({ message: 'Erro ao listar!' })
    }

  }

  async update({ request, response, params }) {

    try {

      const project = await Project.findOrFail(params.id)

      const data = request.all()

      project.merge(data)
      await project.save()

      return response.status(200).send({ data: project })

    } catch (error) {
      return response.status(400).send({ message: 'Erro ao atualizar!' })
    }

  }

  async destroy({ response, params }) {

    try {

      const project = await Project.findOrFail(params.id)

      await project.delete()

    } catch (error) {
      return response.status(error.status)
    }

  }

}

module.exports = ProjectController
