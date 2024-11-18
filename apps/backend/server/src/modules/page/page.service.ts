/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { PageEntity } from '../../entities/page.entity'

@Injectable()
export class PageService {
    constructor(
        @InjectRepository(PageEntity)
        private readonly pageRepository: Repository<PageEntity>
    ) {}

    async create(payload) {
        this.pageRepository.save(payload)
        return payload
    }

    async update(payload) {
        const res = await this.pageRepository.update({ pageId: payload.pageId }, payload)

        if (res.affected === 0) {
            return new NotFoundException('page not found')
        }

        return payload
    }

    async fetch(params: { pageId: string; userId: number }) {
        const page = await this.pageRepository.findOne({
            where: { pageId: params.pageId, user: { id: params.userId } },
        })

        if (!page) {
            return new NotFoundException('page not found')
        }

        return page
    }

    async list(params: { userId: number }) {
        const [data, count] = await this.pageRepository.findAndCount({
            where: { user: { id: params.userId } },
        })

        return {
            pages: data,
            count,
        }
    }

    async delete(payload: { pageId: string; userId: number }) {
        const res = await this.pageRepository.delete({ pageId: payload.pageId, user: { id: payload.userId } })

        if (res.affected === 0) {
            return new NotFoundException('page not found')
        }

        return res.raw[0]
    }
}
