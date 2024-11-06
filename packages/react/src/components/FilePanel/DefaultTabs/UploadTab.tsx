/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import {
    BlockSchema,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    StyleSchema,
} from '@miaoma-doc/core'
import { useCallback, useEffect, useState } from 'react'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useMiaomaDocEditor } from '../../../hooks/useMiaomaDocEditor'
import { useDictionary } from '../../../i18n/dictionary'
import { FilePanelProps } from '../FilePanelProps'

export const UploadTab = <
    B extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(
    props: FilePanelProps<I, S> & {
        setLoading: (loading: boolean) => void
    }
) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const { block, setLoading } = props

    const editor = useMiaomaDocEditor<B, I, S>()

    const [uploadFailed, setUploadFailed] = useState<boolean>(false)

    useEffect(() => {
        if (uploadFailed) {
            setTimeout(() => {
                setUploadFailed(false)
            }, 3000)
        }
    }, [uploadFailed])

    const handleFileChange = useCallback(
        (file: File | null) => {
            if (file === null) {
                return
            }

            async function upload(file: File) {
                setLoading(true)

                if (editor.uploadFile !== undefined) {
                    try {
                        let updateData = await editor.uploadFile(file)
                        if (typeof updateData === 'string') {
                            // received a url
                            updateData = {
                                props: {
                                    name: file.name,
                                    url: updateData,
                                },
                            }
                        }
                        editor.updateBlock(block, updateData)
                    } catch {
                        setUploadFailed(true)
                    } finally {
                        setLoading(false)
                    }
                }
            }

            upload(file)
        },
        [block, editor, setLoading]
    )

    const config = editor.schema.blockSchema[block.type]
    const accept = config.isFileBlock && config.fileBlockAccept?.length ? config.fileBlockAccept.join(',') : '*/*'

    return (
        <Components.FilePanel.TabPanel className={'bn-tab-panel'}>
            <Components.FilePanel.FileInput
                className="bn-file-input"
                data-test="upload-input"
                accept={accept}
                placeholder={dict.file_panel.upload.file_placeholder[block.type] || dict.file_panel.upload.file_placeholder['file']}
                value={null}
                onChange={handleFileChange}
            />
            {uploadFailed && <div className="bn-error-text">{dict.file_panel.upload.upload_error}</div>}
        </Components.FilePanel.TabPanel>
    )
}
