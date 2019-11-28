'use strict'

const Database = use('Database')
const Department = use('App/Models/Department')

class DepartmentController {

  async index({ response }) {

    try {

      const departments = await Department.query()
        .orderBy('created_at', 'desc')
        .fetch()

      return response.status(200).send({ data: departments })

    } catch (error) {
      return response.status(error.status)
    }


  }

  async store({ request, response }) {

    const trx = await Database.beginTransaction()

    try {

      const { name, description } = request.all()

      const department = await Department.create({ name, description }, trx)

      trx.commit()

      return response.status(201).send({ data: department })

    } catch (error) {
      await trx.rollback()
      return response.status(400).send({ message: 'Erro ao realizar cadastro!' })
    }

  }

  async show({ response, params }) {

    try {

      const department = await Department.findOrFail(params.id)

      return response.status(200).send({ data: department })

    } catch (error) {
      return response.status(500).send({ message: 'Erro ao listar departamento!' })
    }

  }

  async update({ request, response, params }) {

    try {

      const department = await Department.findOrFail(params.id)

      const data = request.all()

      department.merge(data)
      await department.save()

      return response.status(200).send({ data: department })

    } catch (error) {
      return response.status(400).send({ message: 'Erro ao atualizar departamento!' })
    }

  }

  async destroy({ response, params }) {

    try {

      const department = await Department.findOrFail(params.id)

      await department.delete()

    } catch (error) {
      return response.status(error.status)
    }

  }

}

module.exports = DepartmentController
