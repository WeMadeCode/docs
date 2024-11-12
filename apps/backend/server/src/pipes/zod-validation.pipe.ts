/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */

import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown /* , metadata: ArgumentMetadata */) {
        try {
            const parsedValue = this.schema.parse(value)
            return parsedValue
        } catch {
            throw new BadRequestException('Validation failed')
        }
    }
}
