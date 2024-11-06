/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
export class UnreachableCaseError extends Error {
    constructor(val: never) {
        super(`Unreachable case: ${val}`)
    }
}

export function assertEmpty(obj: Record<string, never>, throwError = true) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { 'data-test': dataTest, ...rest } = obj // exclude data-test

    if (Object.keys(rest).length > 0 && throwError) {
        throw new Error('Object must be empty ' + JSON.stringify(obj))
    }
}

// TODO: change for built-in version of typescript 5.4 after upgrade
export type NoInfer<T> = [T][T extends any ? 0 : never]
