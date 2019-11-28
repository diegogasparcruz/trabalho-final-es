'use strict'

const Database = use('Database')
const Dependent = use('App/Models/Dependent')

class DependentController {

  async index({ response }) {

    try {

      const dependents = await Dependent.query()
        .orderBy('user_id', 'asc')
        .fetch()

      if (!dependents) {
        return response.status(400).json({ message: 'Não há dependentes' })
      }

      return response.status(200).json({ data: dependents })

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
        user_id: employeeID
      }, trx)

      trx.commit()

      return response.status(201).json({ data: dependent })

    } catch (error) {
      await trx.rollback()
      return response.status(400).json({ message: 'Erro ao realizar cadastro!' })
    }

  }

  async show({ response, params }) {

    try {

      const dependent = await Dependent.findOrFail(params.id)

      return response.status(200).json({ data: dependent })

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao listar!' })
    }

  }

  async update({ request, response, params }) {

    try {

      const dependent = await Dependent.findOrFail(params.id)

      const data = request.all()

      dependent.merge(data)
      await dependent.save()

      return response.status(200).json({ data: dependent })

    } catch (error) {
      return response.status(400).json({ message: 'Erro ao atualizar!' })
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
