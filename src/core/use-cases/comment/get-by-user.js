export default class CommentGetByUser {
  /**
   * @param {CA.UseCase.Context} ctx
   */
  constructor(ctx) {
    const { user } = ctx

    // wait for @implement tags of typescript and jsdoc
    /** @type {CA.UseCase.Interface} */
    const instance = this // eslint-disable-line no-unused-vars
    this._context = ctx
  }

  async exec() {}
}
