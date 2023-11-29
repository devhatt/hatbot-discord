import { ISlangs } from "./slangs.types";

export const Slangs: ISlangs = {
  POG: "dahora/maneiro/mandou bem",
  Wilson: "é isso ai/isso ai",
  "Altos cheiros de batata frita no role": "E ai, tudo bem?/E ai suavidade?",
  Suarvore: "Suave",
  Feijoada: "Não deu certo/deu certo",
  "Você está vermelho(a):": "você está preparado(a)?",
  "Foi pro vinagre": "deu ruim completo, ferrou de vez, já era",
  São: "Sim e não ao mesmo tempo",
};

export function processSlang(option: string) {
  return Slangs[option];
}
