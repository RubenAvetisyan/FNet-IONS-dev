const stackErrorHandler = (args: any[]) => {
  return console.error(...args)
}

export const log = (...args: any[]) => {
  const stackErrors = args.filter(arg => arg instanceof Error)
  if (stackErrors.length)
    return stackErrorHandler(args)

  global.console.log(...args)
}

export const errorLog = (...args: any[]) => {
  const stackErrors = args.filter(arg => arg instanceof Error)
  const elseErrors = args.filter(arg => !(arg instanceof Error))

  console.error(...stackErrors, ...elseErrors)
}

export const dividerLog = (symbol: '___' | '---' | '***') => {
  log(symbol.repeat(10))
}
