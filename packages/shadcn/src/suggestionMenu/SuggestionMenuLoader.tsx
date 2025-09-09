import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@page-doc/react'
import { forwardRef } from 'react'

export const SuggestionMenuLoader = forwardRef<HTMLDivElement, ComponentProps['SuggestionMenu']['Loader']>((props, ref) => {
  const { className, children, ...rest } = props

  assertEmpty(rest)

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
})
