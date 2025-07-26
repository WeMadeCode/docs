import { Dictionary } from '@miaoma-doc/core'

import { useMiaomaDocContext } from '../editor/MiaomaDocContext'

export function useDictionary(): Dictionary {
  const ctx = useMiaomaDocContext()
  return ctx!.editor!.dictionary
}
