/**
 *
 * @param {CA.UseCase.Interface} From
 * @param {new (obj: CA.UseCase.Context) => CA.UseCase.Interface} To
 * @param {CA.UseCase.Context} NewContext
 */
export default async function UseCaseRunner(From, To, NewContext) {
  const { user, network, transaction: oldTransaction } = From._context
  const { data, transaction: newTransaction } = NewContext
  const nextUseCase = new To({
    user,
    network,
    data,
    transaction: newTransaction || oldTransaction,
  })
  return nextUseCase.exec()
}
