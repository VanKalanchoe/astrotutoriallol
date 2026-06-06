import type { UiDict } from "./ui";

/**
 * Converts:
 * {
 *   nav: { home: string }
 * }
 * into:
 * "nav.home"
 */
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

type Paths<T> = {
  [K in keyof T]: T[K] extends object
    ? Join<K, Paths<T[K]>>
    : K
}[keyof T];

export type DictPath = Paths<UiDict>;