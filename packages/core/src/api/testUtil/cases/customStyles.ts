/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { DefaultBlockSchema, DefaultInlineContentSchema, defaultStyleSpecs } from '../../../blocks/defaultBlocks'
import { uploadToTmpFilesDotOrg_DEV_ONLY } from '../../../blocks/FileBlockContent/uploadToTmpFilesDotOrg_DEV_ONLY'
import { MiaomaDocEditor } from '../../../editor/MiaomaDocEditor'
import { MiaomaDocSchema } from '../../../editor/MiaomaDocSchema'
import { createStyleSpec } from '../../../schema/styles/createSpec'
import { EditorTestCases } from '../index'

const small = createStyleSpec(
    {
        type: 'small',
        propSchema: 'boolean',
    },
    {
        render: () => {
            const dom = document.createElement('small')
            return {
                dom,
                contentDOM: dom,
            }
        },
    }
)

const fontSize = createStyleSpec(
    {
        type: 'fontSize',
        propSchema: 'string',
    },
    {
        render: value => {
            const dom = document.createElement('span')
            dom.setAttribute('style', 'font-size: ' + value)
            return {
                dom,
                contentDOM: dom,
            }
        },
    }
)

const schema = MiaomaDocSchema.create({
    styleSpecs: {
        ...defaultStyleSpecs,
        small,
        fontSize,
    },
})

export const customStylesTestCases: EditorTestCases<DefaultBlockSchema, DefaultInlineContentSchema, typeof schema.styleSchema> = {
    name: 'custom style schema',
    createEditor: () => {
        return MiaomaDocEditor.create({
            uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
            schema,
        })
    },
    documents: [
        {
            name: 'small/basic',
            blocks: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: 'This is a small text',
                            styles: {
                                small: true,
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'fontSize/basic',
            blocks: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: 'This is text with a custom fontSize',
                            styles: {
                                fontSize: '18px',
                            },
                        },
                    ],
                },
            ],
        },
    ],
}
