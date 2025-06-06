/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'

import { BackgroundColor } from '../extensions/BackgroundColor/BackgroundColorMark'
import { TextColor } from '../extensions/TextColor/TextColorMark'
import {
    BlockNoDefaults,
    BlockSchema,
    BlockSpecs,
    createStyleSpecFromTipTapMark,
    getBlockSchemaFromSpecs,
    getInlineContentSchemaFromSpecs,
    getStyleSchemaFromSpecs,
    InlineContentSchema,
    InlineContentSpecs,
    PartialBlockNoDefaults,
    StyleSchema,
    StyleSpecs,
} from '../schema/index'
import { AudioBlock } from './AudioBlockContent/AudioBlockContent'
import { CodeBlock } from './CodeBlockContent/CodeBlockContent'
import { FileBlock } from './FileBlockContent/FileBlockContent'
import { Heading } from './HeadingBlockContent/HeadingBlockContent'
import { ImageBlock } from './ImageBlockContent/ImageBlockContent'
import { BulletListItem } from './ListItemBlockContent/BulletListItemBlockContent/BulletListItemBlockContent'
import { CheckListItem } from './ListItemBlockContent/CheckListItemBlockContent/CheckListItemBlockContent'
import { NumberedListItem } from './ListItemBlockContent/NumberedListItemBlockContent/NumberedListItemBlockContent'
import { Paragraph } from './ParagraphBlockContent/ParagraphBlockContent'
import { Table } from './TableBlockContent/TableBlockContent'
import { VideoBlock } from './VideoBlockContent/VideoBlockContent'

export { customizeCodeBlock } from './CodeBlockContent/CodeBlockContent'

export const defaultBlockSpecs = {
    paragraph: Paragraph,
    heading: Heading,
    codeBlock: CodeBlock,
    bulletListItem: BulletListItem,
    numberedListItem: NumberedListItem,
    checkListItem: CheckListItem,
    table: Table,
    file: FileBlock,
    image: ImageBlock,
    video: VideoBlock,
    audio: AudioBlock,
} satisfies BlockSpecs

export const defaultBlockSchema = getBlockSchemaFromSpecs(defaultBlockSpecs)

// underscore is used that in case a user overrides DefaultBlockSchema,
// they can still access the original default block schema
export type _DefaultBlockSchema = typeof defaultBlockSchema
export type DefaultBlockSchema = _DefaultBlockSchema

export const defaultStyleSpecs = {
    bold: createStyleSpecFromTipTapMark(Bold, 'boolean'),
    italic: createStyleSpecFromTipTapMark(Italic, 'boolean'),
    underline: createStyleSpecFromTipTapMark(Underline, 'boolean'),
    strike: createStyleSpecFromTipTapMark(Strike, 'boolean'),
    code: createStyleSpecFromTipTapMark(Code, 'boolean'),
    textColor: TextColor,
    backgroundColor: BackgroundColor,
} satisfies StyleSpecs

export const defaultStyleSchema = getStyleSchemaFromSpecs(defaultStyleSpecs)

// underscore is used that in case a user overrides DefaultStyleSchema,
// they can still access the original default style schema
export type _DefaultStyleSchema = typeof defaultStyleSchema
export type DefaultStyleSchema = _DefaultStyleSchema

export const defaultInlineContentSpecs = {
    text: { config: 'text', implementation: {} as any },
    link: { config: 'link', implementation: {} as any },
} satisfies InlineContentSpecs

export const defaultInlineContentSchema = getInlineContentSchemaFromSpecs(defaultInlineContentSpecs)

// underscore is used that in case a user overrides DefaultInlineContentSchema,
// they can still access the original default inline content schema
export type _DefaultInlineContentSchema = typeof defaultInlineContentSchema
export type DefaultInlineContentSchema = _DefaultInlineContentSchema

export type PartialBlock<
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
> = PartialBlockNoDefaults<BSchema, I, S>

export type Block<
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
> = BlockNoDefaults<BSchema, I, S>
