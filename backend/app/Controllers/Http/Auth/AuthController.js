'use strict'

const User = use('App/Models/User')

class AuthController {

  async login({ request, auth }) {

    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token

  }

  // Dados do usuário logado
  async isLogged({ response, auth }) {

    const user = await User.find(auth.user.id)

    await user.load('roles')

    return response.status(200).json({ user })

  }

}

module.exports = AuthController
