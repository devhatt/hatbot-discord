import { TObjectKeyAsType } from '../../../types/email'

export const Emails = {
  Dono: process.env.ALECELL,
  'Primogênito do dono': process.env.NICOLETTI,
  Trindade: process.env.TRINDADE,
  'André King': process.env.ANDRE,
  Zoldicas: process.env.ZOLDICAS,
  Pilu: process.env.PILU,
  HX: process.env.HX,
  'Peter Parker': process.env.NESS,
  Lefel: process.env.LEFEL,
  'Filho do Dono': process.env.ALVARO,
  'Novinha vc é uma delicinha': process.env.JOTAPE,
  'Kevin e o Cris': process.env.KEVIN,
  Caronte: process.env.DIOGO,
  'É o KINHA MEU PARCEIRO': process.env.K1NHA,
}

export function processEmails(option: TObjectKeyAsType<typeof Emails>) {
  return Emails[option]
}
