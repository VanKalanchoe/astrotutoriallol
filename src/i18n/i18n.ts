import { ui, type Lang } from "./ui";

type DeepKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? {
        [K2 in keyof T[K]]: T[K][K2] extends object
          ? {
              [K3 in keyof T[K][K2]]: `${K & string}.${K2 & string}.${K3 & string}`;
            }[keyof T[K][K2]]
          : `${K & string}.${K2 & string}`;
      }[keyof T[K]]
    : K;
}[keyof T];

type Paths = DeepKeys<typeof ui["en"]>;

export function createI18n(lang: Lang) {
  const dict = ui[lang];

  function resolve(path: string) {
    return path.split(".").reduce<any>((acc, k) => acc?.[k], dict);
  }

  const handler: any = {
    get(_: any, prop: string) {
      const value = dict[prop as keyof typeof dict];

      if (typeof value === "object") {
        return new Proxy({}, {
          get(_, subProp: string) {
            const fullPath = `${prop}.${subProp}`;
            return resolve(fullPath);
          },
        });
      }

      return value;
    },
  };

  return new Proxy({}, handler) as typeof ui["en"];
}