import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

export const GridSuggestionMenuLoader = forwardRef<HTMLDivElement, ComponentProps['GridSuggestionMenu']['Loader']>((props, ref) => {
  const {
    className,
    children, // unused, using "dots" instead
    columns,
    ...rest
  } = props

  assertEmpty(rest)

  return (
    <div className={className} style={{ gridColumn: `1 / ${columns + 1}` }} ref={ref}>
      {children}
    </div>
  )
})
