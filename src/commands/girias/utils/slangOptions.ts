import { TSelectSlang } from '../girias.types'

export function slangOptions(slangs: object) {
  const slangOptions: TSelectSlang[] = []
  Object.keys(slangs).map((slang) => {
    slangOptions.push({ label: slang, value: slang })
  })

  return slangOptions
}
