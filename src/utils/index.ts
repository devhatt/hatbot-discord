// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function GetRecentDaily(arrayDeObjetos: any[], object: any) {
  // Filtrar objetos que contêm "object"
  const daily = arrayDeObjetos.filter((obj) => obj[object]);

  // Verificar se há algum "object"
  if (daily.length === 0) {
    return null; // Retorna null se não houver "object name"
  }

  // Encontrar o "octopost" mais recente com base em createdAt
  const recentdaily = daily.reduce((recent, current) => {
    const currentDate = new Date(current[object].createdAt);
    const recentDate = new Date(recent[object].createdAt);

    return currentDate > recentDate ? current : recent;
  });

  return recentdaily[object] as { pageId: string; createdAt: Date };
}
