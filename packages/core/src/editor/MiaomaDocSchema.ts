/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { defaultBlockSpecs, defaultInlineContentSpecs, defaultStyleSpecs } from '../blocks/defaultBlocks'
import type { BlockNoDefaults, PartialBlockNoDefaults } from '../schema/blocks/types'
import {
    BlockSchema,
    BlockSchemaFromSpecs,
    BlockSpecs,
    getBlockSchemaFromSpecs,
    getInlineContentSchemaFromSpecs,
    getStyleSchemaFromSpecs,
    InlineContentSchema,
    InlineContentSchemaFromSpecs,
    InlineContentSpecs,
    StyleSchema,
    StyleSchemaFromSpecs,
    StyleSpecs,
} from '../schema/index'
import type { MiaomaDocEditor } from './MiaomaDocEditor'

function removeUndefined<T extends Record<string, any> | undefined>(obj: T): T {
    if (!obj) {
        return obj
    }
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined)) as T
}

export class MiaomaDocSchema<BSchema extends BlockSchema, ISchema extends InlineContentSchema, SSchema extends StyleSchema> {
    public readonly blockSpecs: BlockSpecs
    public readonly inlineContentSpecs: InlineContentSpecs
    public readonly styleSpecs: StyleSpecs

    public readonly blockSchema: BSchema
    public readonly inlineContentSchema: ISchema
    public readonly styleSchema: SSchema

    // Helper so that you can use typeof schema.MiaomaDocEditor
    public readonly MiaomaDocEditor: MiaomaDocEditor<BSchema, ISchema, SSchema> = 'only for types' as any

    public readonly Block: BlockNoDefaults<BSchema, ISchema, SSchema> = 'only for types' as any

    public readonly PartialBlock: PartialBlockNoDefaults<BSchema, ISchema, SSchema> = 'only for types' as any

    public static create<
        BSpecs extends BlockSpecs = typeof defaultBlockSpecs,
        ISpecs extends InlineContentSpecs = typeof defaultInlineContentSpecs,
        SSpecs extends StyleSpecs = typeof defaultStyleSpecs,
    >(options?: {
        /**
         * A list of custom block types that should be available in the editor.
         */
        blockSpecs?: BSpecs
        /**
         * A list of custom InlineContent types that should be available in the editor.
         */
        inlineContentSpecs?: ISpecs
        /**
         * A list of custom Styles that should be available in the editor.
         */
        styleSpecs?: SSpecs
    }) {
        return new MiaomaDocSchema<BlockSchemaFromSpecs<BSpecs>, InlineContentSchemaFromSpecs<ISpecs>, StyleSchemaFromSpecs<SSpecs>>(
            options
        )
        // as MiaomaDocSchema<
        // BlockSchemaFromSpecs<BSpecs>,
        // InlineContentSchemaFromSpecs<ISpecs>,
        // StyleSchemaFromSpecs<SSpecs>
        // >;
    }

    constructor(opts?: { blockSpecs?: BlockSpecs; inlineContentSpecs?: InlineContentSpecs; styleSpecs?: StyleSpecs }) {
        this.blockSpecs = removeUndefined(opts?.blockSpecs) || defaultBlockSpecs
        this.inlineContentSpecs = removeUndefined(opts?.inlineContentSpecs) || defaultInlineContentSpecs
        this.styleSpecs = removeUndefined(opts?.styleSpecs) || defaultStyleSpecs

        this.blockSchema = getBlockSchemaFromSpecs(this.blockSpecs) as any
        this.inlineContentSchema = getInlineContentSchemaFromSpecs(this.inlineContentSpecs) as any
        this.styleSchema = getStyleSchemaFromSpecs(this.styleSpecs) as any
    }
}
