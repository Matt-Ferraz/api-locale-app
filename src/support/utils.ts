import { existsSync, readdirSync, readFileSync } from 'fs'
import logger from '@/libs/logger'

const readModules = (folder: string, callback: any): void => {
  const rootPath = `${process.cwd()}/build/modules`
  const modules = readdirSync(rootPath)
  modules.forEach((module: string): Promise<void> => {
    try {
      const path = `${rootPath}/${module}/${folder}`
      const exists = existsSync(path)

      if (!exists) return

      const value = require(`${rootPath}/${module}/${folder}/index.js`).default
      const params = { value, module }
      callback(params)
    } catch (err) {
      logger.error(err)
    }
  })
}

type fields = {
  key: string
  value: any
}
type replaceHtmlParams = {
  fileName: string
  fields: fields[]
}

const replaceHtml = ({ fileName, fields }: replaceHtmlParams): string => {
  const filePath = `${process.cwd()}/build/assets/html/${fileName}`
  const htmlBody = readFileSync(filePath, { encoding: 'utf-8' })
  let replacedHtml = htmlBody
  fields.forEach(({ key, value }) => {
    replacedHtml = replacedHtml.replaceAll(key, value)
  })
  return replacedHtml
}

const stringToBoolean = (valor:string): boolean => {
  // Converte para minúsculas para lidar com 'True' ou 'False'
  const valorLowerCase = valor.toLowerCase();

  if (valorLowerCase === 'true') {
    return true;
  } else if (valorLowerCase === 'false') {
    return false;
  } else {
    // Se não for 'true' nem 'false', pode tratar como quiser, talvez lançar uma exceção
    throw new Error('Valor inválido para conversão para booleano');
  }
}

const generateSearchTerm = (inputString:string):string => {
  // Use o método split com uma expressão regular para separar a string por espaços
  const partes = inputString.split(/\s+/)

  // Use o método map para remover espaços extras em cada parte da string
  const partesLimpar = partes.map(part => part.replace(/\s+/g, ' '))
  
  return partesLimpar.join(' & ')
}

export default {
  readModules,
  replaceHtml,
  stringToBoolean,
  generateSearchTerm
}
