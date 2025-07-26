import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const PanelButton = forwardRef<HTMLButtonElement, ComponentProps['FilePanel']['Button']>((props, ref) => {
  const { className, children, onClick, label, ...rest } = props

  assertEmpty(rest)

  const ShadCNComponents = useShadCNComponentsContext()!

  return (
    <ShadCNComponents.Button.Button type={'submit'} className={className} aria-label={label} ref={ref} onClick={onClick}>
      {children}
    </ShadCNComponents.Button.Button>
  )
})
