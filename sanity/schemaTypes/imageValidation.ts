type ImageValue = {
  asset?: {_ref?: string}
} | undefined

/**
 * Optional images may be left blank, but an image object without an uploaded
 * asset is never a usable image on the site.
 */
export const imageAssetOrEmpty = (value: ImageValue) =>
  !value || value.asset?._ref
    ? true
    : 'Wybierz plik obrazu albo usuń puste pole.'
