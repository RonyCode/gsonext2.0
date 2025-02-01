export const maskOcultaCpfCnpj = (
  cpf: string | null | undefined,
): string | null | undefined => {
  if (cpf == null) return cpf
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11) {
    return 'CPF inválido'
  }

  return cpf.slice(0, 3) + '.•••.•' + cpf.slice(7, 9) + '-' + cpf.slice(9)
}
