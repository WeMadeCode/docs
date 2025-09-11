import './style.css'

import { BlockSchema, InlineContentSchema, mergeCSSClasses, StyleSchema } from '@page-doc/core'
import { Components, ComponentsContext, PageDocViewRaw } from '@page-doc/react'
import { ComponentProps, useMemo } from 'react'

import { Form } from './form/Form'
import { TextInput } from './form/TextInput'
import { Menu, MenuDivider, MenuDropdown, MenuItem, MenuLabel, MenuTrigger } from './menu/Menu'
import { Panel } from './panel/Panel'
import { PanelButton } from './panel/PanelButton'
import { PanelFileInput } from './panel/PanelFileInput'
import { PanelTab } from './panel/PanelTab'
import { PanelTextInput } from './panel/PanelTextInput'
import { Popover, PopoverContent, PopoverTrigger } from './popover/popover'
import { ShadCNComponents, ShadCNComponentsContext, ShadCNDefaultComponents } from './ShadCNComponentsContext'
import { SideMenu } from './sideMenu/SideMenu'
import { SideMenuButton } from './sideMenu/SideMenuButton'
import { GridSuggestionMenu } from './suggestionMenu/gridSuggestionMenu/GridSuggestionMenu'
import { GridSuggestionMenuEmptyItem } from './suggestionMenu/gridSuggestionMenu/GridSuggestionMenuEmptyItem'
import { GridSuggestionMenuItem } from './suggestionMenu/gridSuggestionMenu/GridSuggestionMenuItem'
import { GridSuggestionMenuLoader } from './suggestionMenu/gridSuggestionMenu/GridSuggestionMenuLoader'
import { SuggestionMenu } from './suggestionMenu/SuggestionMenu'
import { SuggestionMenuEmptyItem } from './suggestionMenu/SuggestionMenuEmptyItem'
import { SuggestionMenuItem } from './suggestionMenu/SuggestionMenuItem'
import { SuggestionMenuLabel } from './suggestionMenu/SuggestionMenuLabel'
import { SuggestionMenuLoader } from './suggestionMenu/SuggestionMenuLoader'
import { ExtendButton } from './tableHandle/ExtendButton'
import { TableHandle } from './tableHandle/TableHandle'
import { Toolbar, ToolbarButton, ToolbarSelect } from './toolbar/Toolbar'

export const components: Components = {
  FormattingToolbar: {
    Root: Toolbar,
    Button: ToolbarButton,
    Select: ToolbarSelect,
  },
  FilePanel: {
    Root: Panel,
    Button: PanelButton,
    FileInput: PanelFileInput,
    TabPanel: PanelTab,
    TextInput: PanelTextInput,
  },
  LinkToolbar: {
    Root: Toolbar,
    Button: ToolbarButton,
  },
  SideMenu: {
    Root: SideMenu,
    Button: SideMenuButton,
  },
  SuggestionMenu: {
    Root: SuggestionMenu,
    Item: SuggestionMenuItem,
    EmptyItem: SuggestionMenuEmptyItem,
    Label: SuggestionMenuLabel,
    Loader: SuggestionMenuLoader,
  },
  GridSuggestionMenu: {
    Root: GridSuggestionMenu,
    Item: GridSuggestionMenuItem,
    EmptyItem: GridSuggestionMenuEmptyItem,
    Loader: GridSuggestionMenuLoader,
  },
  TableHandle: {
    Root: TableHandle,
    ExtendButton: ExtendButton,
  },
  Generic: {
    Form: {
      Root: Form,
      TextInput: TextInput,
    },
    Menu: {
      Root: Menu,
      Trigger: MenuTrigger,
      Dropdown: MenuDropdown,
      Divider: MenuDivider,
      Label: MenuLabel,
      Item: MenuItem,
    },
    Popover: {
      Root: Popover,
      Trigger: PopoverTrigger,
      Content: PopoverContent,
    },
  },
}

export const PageDocView = <BSchema extends BlockSchema, ISchema extends InlineContentSchema, SSchema extends StyleSchema>(
  props: ComponentProps<typeof PageDocViewRaw<BSchema, ISchema, SSchema>> & {
    /**
     * (optional)Provide your own shadcn component overrides
     */
    shadCNComponents?: Partial<ShadCNComponents>
  }
) => {
  const { className, shadCNComponents, ...rest } = props

  const componentsValue = useMemo(() => {
    return {
      ...ShadCNDefaultComponents,
      ...shadCNComponents,
    }
  }, [shadCNComponents])

  return (
    <ShadCNComponentsContext.Provider value={componentsValue}>
      <ComponentsContext.Provider value={components}>
        <PageDocViewRaw className={mergeCSSClasses('bn-shadcn', className || '')} {...rest} />
      </ComponentsContext.Provider>
    </ShadCNComponentsContext.Provider>
  )
}
