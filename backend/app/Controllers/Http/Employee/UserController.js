'use strict'

const User = use('App/Models/User')

class UserController {

  async info({ response, auth }) {

    const user = await User.find(auth.user.id)

    await user.load('dependents')

    return response.status(200).json({ data: user })

  }

}

module.exports = UserController
