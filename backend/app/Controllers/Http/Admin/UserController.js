'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Role = use('Role')

class UserController {

  async index({ response }) {

    try {

      const users = await User.query()
        .orderBy('created_at', 'desc')
        .fetch()

      return response.status(200).json({ data: users })

    } catch (error) {
      return response.status(error.status)
    }

  }

  async store({ request, response }) {

    const trx = await Database.beginTransaction()

    try {

      const { department_id, name, email, password, address, genre, salary, dt_nasc } = request.all()

      const user = await User.create({
        department_id,
        name,
        email,
        password,
        address,
        genre,
        salary,
        dt_nasc
      }, trx)

      const userRole = await Role.findBy('slug', 'employee')

      await user.roles().attach([userRole.id], null, trx)

      trx.commit()

      return response.status(201).json({ data: user })

    } catch (error) {
      await trx.rollback()
      return response.status(400).json({ message: 'Erro ao realizar cadastro!' })
    }

  }

  async show({ response, params }) {

    try {

      const user = await User.query()
        .where('id', params.id)
        .with('dependents')
        .fetch()

      return response.status(200).json({ data: user })

    } catch (error) {
      return response.status(500).json({ message: 'Erro ao listar!' })
    }

  }

  async update({ request, response, params }) {

    try {

      const user = await User.findOrFail(params.id)

      const data = request.all()

      user.merge(data)
      await user.save()

      return response.status(200).json({ data: user })

    } catch (error) {
      return response.status(400).json({ message: 'Erro ao atualizar!' })
    }

  }

  async destroy({ response, params }) {

    try {

      const user = await User.findOrFail(params.id)

      await user.delete()

    } catch (error) {
      return response.status(error.status)
    }

  }

}

module.exports = UserController
