/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import * as awarenessProtocol from 'y-protocols/awareness'
import * as Y from 'yjs'

export interface IWSSharedDoc extends Y.Doc {
    name: string
    conns: Map<object, Set<number>>
    awareness: awarenessProtocol.Awareness
}

export interface IPersistence {
    bindState: (arg1: string, arg2: IWSSharedDoc) => void
    writeState: (arg1: string, arg2: IWSSharedDoc) => Promise<any>
    provider?: any
}
