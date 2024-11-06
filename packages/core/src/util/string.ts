/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
export function camelToDataKebab(str: string): string {
    return 'data-' + str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function filenameFromURL(url: string): string {
    const parts = url.split('/')
    if (
        !parts.length || // invalid?
        parts[parts.length - 1] === '' // for example, URL ends in a directory-like trailing slash
    ) {
        // in this case just return the original url
        return url
    }
    return parts[parts.length - 1]
}
