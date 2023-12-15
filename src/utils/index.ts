/* eslint-disable @typescript-eslint/no-explicit-any */
export function GetRecentDaily(arrayDeObjetos: any[], object: any): any {
  if (!arrayDeObjetos) {
    return null;
  }

  const dailys = arrayDeObjetos.filter((obj) => obj[object]);

  const today = new Date();
  const octopostsDoDiaAtual = dailys.filter(
    (obj) =>
      new Date(obj[object].createdAt).toDateString() === today.toDateString()
  );

  if (octopostsDoDiaAtual.length === 0) {
    return null;
  }

  return octopostsDoDiaAtual[0][object];
}
