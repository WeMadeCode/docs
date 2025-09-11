import { Dictionary } from '@page-doc/core'

import { usePageDocContext } from '../editor/PageDocContext'

export function useDictionary(): Dictionary {
  const ctx = usePageDocContext()
  return ctx!.editor!.dictionary
}
