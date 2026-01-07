export function stringSimilarity(str1: string, str2: string, gramSize = 2) {
  function getNGrams(s: string, len: number) {
    s = " ".repeat(len - 1) + s.toLowerCase() + " ".repeat(len - 1);
    let v = new Array(s.length - len + 1);
    for (let i = 0; i < v.length; i++) {
      v[i] = s.slice(i, i + len);
    }
    return v;
  }
  if (!str1?.length || !str2?.length) {
    return 0.0;
  }
  let s1 = str1.length < str2.length ? str1 : str2;
  let s2 = str1.length < str2.length ? str2 : str1;
  let pairs1 = getNGrams(s1, gramSize);
  let pairs2 = getNGrams(s2, gramSize);
  let set = new Set(pairs1);
  let total = pairs2.length;
  let hits = 0;
  for (let item of pairs2) {
    if (set.delete(item)) {
      hits++;
    }
  }
  return hits / total;
}

export const sortByScore = (list: any[]) => list.sort((a, b) => b.score - a.score);

export const splitNameStringSimilarity = (query: string, referenceName: string) => {
  let names = [
    referenceName,
    ...referenceName
      .replace(" - ", " ")
      .replace(" (", " ")
      .replace(")", "")
      .replace(",", " ")
      .split(" "),
  ];
  return Math.max(
    ...names.map((name) => stringSimilarity(query, name.slice(0, query.length)))
  );
};

export const fuzzySearch = (query: string, list: any[]) => {
  const resultsList = list
    .map((kommune) => {
      const score = splitNameStringSimilarity(query, kommune.name);
      if (score > 0.2) {
        return { ...kommune, name: kommune.name, score };
      } else return false;
    })
    .filter((kommune) => kommune);

  return sortByScore(resultsList);
};

