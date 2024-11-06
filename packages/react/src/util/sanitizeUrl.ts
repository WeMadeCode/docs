/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
/**
 * Sanitizes a potentially unsafe URL.
 * @param {string} inputUrl - The URL to sanitize.
 * @param {string} baseUrl - The base URL to use for relative URLs.
 * @returns {string} The normalized URL, or "#" if the URL is invalid or unsafe.
 */
export function sanitizeUrl(inputUrl: string, baseUrl: string): string {
    try {
        const url = new URL(inputUrl, baseUrl)

        if (url.protocol !== 'javascript:') {
            return url.href
        }
    } catch {
        // if URL creation fails, it's an invalid URL
    }

    // return a safe default for invalid or unsafe URLs
    return '#'
}
