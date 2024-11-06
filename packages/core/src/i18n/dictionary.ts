/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
// function scramble(dict: any) {
//   const newDict: any = {} as any;

import type { en } from './locales'

//   for (const key in dict) {
//     if (typeof dict[key] === "object") {
//       newDict[key] = scramble(dict[key]);
//     } else {
//       newDict[key] = dict[key].split("").reverse().join("");
//     }
//   }

//   return newDict;
// }

export type Dictionary = typeof en
