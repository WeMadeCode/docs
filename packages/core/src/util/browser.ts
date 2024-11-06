/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
export const isAppleOS = () =>
    typeof navigator !== 'undefined' &&
    (/Mac/.test(navigator.platform) || (/AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent)))

export function formatKeyboardShortcut(shortcut: string, ctrlText = 'Ctrl') {
    if (isAppleOS()) {
        return shortcut.replace('Mod', '⌘')
    } else {
        return shortcut.replace('Mod', ctrlText)
    }
}

export function mergeCSSClasses(...classes: string[]) {
    return classes.filter(c => c).join(' ')
}

export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
