/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { defaultBlockSpecs, DefaultInlineContentSchema, DefaultStyleSchema } from '../../../blocks/defaultBlocks'
import { defaultProps } from '../../../blocks/defaultProps'
import { uploadToTmpFilesDotOrg_DEV_ONLY } from '../../../blocks/FileBlockContent/uploadToTmpFilesDotOrg_DEV_ONLY'
import { imagePropSchema, imageRender } from '../../../blocks/ImageBlockContent/ImageBlockContent'
import { MiaomaDocEditor } from '../../../editor/MiaomaDocEditor'
import { MiaomaDocSchema } from '../../../editor/MiaomaDocSchema'
import { createBlockSpec } from '../../../schema/index'
import { EditorTestCases } from '../index'

// This is a modified version of the default image block that does not implement
// a `toExternalHTML` function. It's used to test if the custom serializer by
// default serializes custom blocks using their `render` function.
const SimpleImage = createBlockSpec(
    {
        type: 'simpleImage',
        propSchema: imagePropSchema,
        content: 'none',
    },
    {
        render: (block, editor) => imageRender(block as any, editor as any),
    }
)

const CustomParagraph = createBlockSpec(
    {
        type: 'customParagraph',
        propSchema: defaultProps,
        content: 'inline',
    },
    {
        render: () => {
            const paragraph = document.createElement('p')
            paragraph.className = 'custom-paragraph'

            return {
                dom: paragraph,
                contentDOM: paragraph,
            }
        },
        toExternalHTML: () => {
            const paragraph = document.createElement('p')
            paragraph.className = 'custom-paragraph'
            paragraph.innerHTML = 'Hello World'

            return {
                dom: paragraph,
            }
        },
    }
)

const SimpleCustomParagraph = createBlockSpec(
    {
        type: 'simpleCustomParagraph',
        propSchema: defaultProps,
        content: 'inline',
    },
    {
        render: () => {
            const paragraph = document.createElement('p')
            paragraph.className = 'simple-custom-paragraph'

            return {
                dom: paragraph,
                contentDOM: paragraph,
            }
        },
    }
)

const schema = MiaomaDocSchema.create({
    blockSpecs: {
        ...defaultBlockSpecs,
        simpleImage: SimpleImage,
        customParagraph: CustomParagraph,
        simpleCustomParagraph: SimpleCustomParagraph,
    },
})

export const customBlocksTestCases: EditorTestCases<typeof schema.blockSchema, DefaultInlineContentSchema, DefaultStyleSchema> = {
    name: 'custom blocks schema',
    createEditor: () => {
        return MiaomaDocEditor.create({
            schema,
            uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
        })
    },
    documents: [
        // Because images need to fetch the download URL async, their output HTML is
        // initially rendered without a `src` attribute, which is reflected in the
        // tests.
        {
            name: 'simpleImage/button',
            blocks: [
                {
                    type: 'simpleImage',
                },
            ],
        },
        {
            name: 'simpleImage/basic',
            blocks: [
                {
                    type: 'simpleImage',
                    props: {
                        name: 'example',
                        url: 'exampleURL',
                        caption: 'Caption',
                        previewWidth: 256,
                    },
                },
            ],
        },
        {
            name: 'simpleImage/noName',
            blocks: [
                {
                    type: 'simpleImage',
                    props: {
                        url: 'exampleURL',
                        caption: 'Caption',
                        previewWidth: 256,
                    },
                },
            ],
        },
        {
            name: 'simpleImage/noCaption',
            blocks: [
                {
                    type: 'simpleImage',
                    props: {
                        name: 'example',
                        url: 'exampleURL',
                        previewWidth: 256,
                    },
                },
            ],
        },
        {
            name: 'simpleImage/noPreview',
            blocks: [
                {
                    type: 'simpleImage',
                    props: {
                        name: 'example',
                        url: 'exampleURL',
                        caption: 'Caption',
                        showPreview: false,
                        previewWidth: 256,
                    },
                },
            ],
        },
        {
            name: 'simpleImage/nested',
            blocks: [
                {
                    type: 'simpleImage',
                    props: {
                        name: 'example',
                        url: 'exampleURL',
                        caption: 'Caption',
                        previewWidth: 256,
                    },
                    children: [
                        {
                            type: 'simpleImage',
                            props: {
                                name: 'example',
                                url: 'exampleURL',
                                caption: 'Caption',
                                previewWidth: 256,
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: 'customParagraph/basic',
            blocks: [
                {
                    type: 'customParagraph',
                    content: 'Custom Paragraph',
                },
            ],
        },
        {
            name: 'customParagraph/styled',
            blocks: [
                {
                    type: 'customParagraph',
                    props: {
                        textAlignment: 'center',
                        textColor: 'orange',
                        backgroundColor: 'pink',
                    },
                    content: [
                        {
                            type: 'text',
                            styles: {},
                            text: 'Plain ',
                        },
                        {
                            type: 'text',
                            styles: {
                                textColor: 'red',
                            },
                            text: 'Red Text ',
                        },
                        {
                            type: 'text',
                            styles: {
                                backgroundColor: 'blue',
                            },
                            text: 'Blue Background ',
                        },
                        {
                            type: 'text',
                            styles: {
                                textColor: 'red',
                                backgroundColor: 'blue',
                            },
                            text: 'Mixed Colors',
                        },
                    ],
                },
            ],
        },
        {
            name: 'customParagraph/nested',
            blocks: [
                {
                    type: 'customParagraph',
                    content: 'Custom Paragraph',
                    children: [
                        {
                            type: 'customParagraph',
                            content: 'Nested Custom Paragraph 1',
                        },
                        {
                            type: 'customParagraph',
                            content: 'Nested Custom Paragraph 2',
                        },
                    ],
                },
            ],
        },
        {
            name: 'customParagraph/lineBreaks',
            blocks: [
                {
                    type: 'customParagraph',
                    content: 'Line 1\nLine 2',
                },
            ],
        },
        {
            name: 'simpleCustomParagraph/basic',
            blocks: [
                {
                    type: 'simpleCustomParagraph',
                    content: 'Custom Paragraph',
                },
            ],
        },
        {
            name: 'simpleCustomParagraph/styled',
            blocks: [
                {
                    type: 'simpleCustomParagraph',
                    props: {
                        textAlignment: 'center',
                        textColor: 'orange',
                        backgroundColor: 'pink',
                    },
                    content: [
                        {
                            type: 'text',
                            styles: {},
                            text: 'Plain ',
                        },
                        {
                            type: 'text',
                            styles: {
                                textColor: 'red',
                            },
                            text: 'Red Text ',
                        },
                        {
                            type: 'text',
                            styles: {
                                backgroundColor: 'blue',
                            },
                            text: 'Blue Background ',
                        },
                        {
                            type: 'text',
                            styles: {
                                textColor: 'red',
                                backgroundColor: 'blue',
                            },
                            text: 'Mixed Colors',
                        },
                    ],
                },
            ],
        },
        {
            name: 'simpleCustomParagraph/nested',
            blocks: [
                {
                    type: 'simpleCustomParagraph',
                    content: 'Custom Paragraph',
                    children: [
                        {
                            type: 'simpleCustomParagraph',
                            content: 'Nested Custom Paragraph 1',
                        },
                        {
                            type: 'simpleCustomParagraph',
                            content: 'Nested Custom Paragraph 2',
                        },
                    ],
                },
            ],
        },
    ],
}
