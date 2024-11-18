/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */

import { z } from 'zod'

/**
 * 创建应用的数据传输对象
 */
export const createPageSchema = z
    .object({
        emoji: z.string(),
        title: z.string(),
    })
    .required()

export type CreatePageDto = z.infer<typeof createPageSchema>

/**
 * 删除应用的数据传输对象
 */
export const deletePageSchema = z
    .object({
        pageId: z.string(),
    })
    .required()

export type DeletePageDto = z.infer<typeof deletePageSchema>
