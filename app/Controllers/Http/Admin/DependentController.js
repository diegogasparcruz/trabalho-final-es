'use strict'

const Database = use('Database')
const Dependent = use('App/Models/Dependent')

class DependentController {

  async index({ response }) {

    try {

      const dependents = await Dependent.query()
        .orderBy('id_user', 'asc')
        .fetch()

      if (!dependents) {
        return response.status(400).send({ message: 'Não há dependentes' })
      }

      return response.status(200).send({ data: dependents })

    } catch (error) {
      return response.status(error.status)
    }


  }


  async store({ request, response, params }) {

    const trx = await Database.beginTransaction()

    try {
      const employeeID = params.id
      const { name, genre, dt_nasc } = request.all()

      const dependent = await Dependent.create({
        name,
        genre,
        dt_nasc,
        id_user: employeeID
      }, trx)

      trx.commit()

      return response.status(201).send({ data: dependent })

    } catch (error) {
      await trx.rollback()
      return response.status(400).send({ message: 'Erro ao realizar cadastro!' })
    }

  }

  async show({ response, params }) {

    try {

      const dependent = await Dependent.findOrFail(params.id)

      return response.status(200).send({ data: dependent })

    } catch (error) {
      return response.status(500).send({ message: 'Erro ao listar!' })
    }

  }

  async update({ request, response, params }) {

    try {

      const dependent = await Dependent.findOrFail(params.id)

      const data = request.all()

      dependent.merge(data)
      await dependent.save()

      return response.status(200).send({ data: dependent })

    } catch (error) {
      return response.status(400).send({ message: 'Erro ao atualizar!' })
    }

  }

  async destroy({ response, params }) {

    try {

      const dependent = await Dependent.findOrFail(params.id)

      await dependent.delete()

    } catch (error) {
      return response.status(error.status)
    }

  }

}

module.exports = DependentController
