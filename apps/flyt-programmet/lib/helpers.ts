import slugifyRaw from "slugify";

export const slugify = (url: string) => slugifyRaw(url, { lower: true });

export const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(" ");

export const getYearList = () => {
  const listStartYear = new Date().getFullYear() + 1;
  return Array.from({ length: listStartYear - 2019 + 1 }, (_, i) => {
    const year = listStartYear - i;
    return {
      title: `${year}/${year + 1}`,
      value: `${String(year).slice(2)}/${String(year + 1).slice(2)}`,
    };
  });
};

export const getCurrentYear = (year = new Date().getFullYear()) => {
  const yearDelta = new Date().getFullYear() - year;
  const yearList = getYearList();
  const currentMonth = new Date().getMonth() + 1;
  return currentMonth < 8 ? yearList[2 + yearDelta] : yearList[1 + yearDelta];
};

export const isPreviousYear = (year: string) => {
  const parseIntFromYear = (y: string) => parseInt(y.split("/")[1]);
  const currentYear = parseIntFromYear(getCurrentYear().value);
  const groupYear = parseIntFromYear(year);
  return groupYear < currentYear;
};

// Page color theming
export type ThemeColor = {
  name: string;
  value: number;
};

export const getPageColor = (pathname: string): ThemeColor => {
  const page = pathname.split("/")[1] || "frontpage";
  const isSubpage = pathname.split("/").length > 2;

  const colorMap: Record<string, ThemeColor> = {
    frontpage: { name: "krikkand", value: 400 },
    "om-flyt": { name: "krikkand", value: 300 },
    kontakt: { name: "bark", value: 200 },
    teori: { name: "mose", value: isSubpage ? 200 : 400 },
    partnere: { name: "bever", value: 200 },
    "alle-kommuner": { name: "krikkand", value: 300 },
  };

  return colorMap[page] || { name: "skifer", value: 100 };
};

export const mutateKommuneList = (kommuneList: any[], groupList: any[]) => {
  return kommuneList.map((kommune: any) => {
    const groupsForKommune = groupList.filter(
      (group: any) => group?.kommune?.name && group.kommune._id === kommune._id
    );

    // Only include kommuner that are active this year
    const group = groupsForKommune.find(
      (g: any) => g.year === getCurrentYear().value
    ) || null;
    const city = group?.kommune?.city;
    return {
      _id: kommune._id,
      name: city ? `${kommune.name} (${city})` : kommune.name,
      groupUrl: group
        ? `/${slugify(group.kommune.name)}/${group.year.replace("/", "-")}`
        : null,
    };
  });
};

