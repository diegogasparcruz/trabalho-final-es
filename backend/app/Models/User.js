'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  static get hidden() {
    return ['password', 'created_at', 'updated_at']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  dependents() {
    return this.hasMany('App/Models/Dependent')
  }

  department() {
    return this.belongsTo('App/Models/Department')
  }

  project() {
    return this.hasOne('App/Models/Project')
  }

  projects() {
    return this
      .belongsToMany('App/Models/Project', 'project_id', 'user_id')
      .pivotTable('project_users')
  }

}

module.exports = User
