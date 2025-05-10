import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { ulid } from 'ulid'

// コンテンツディレクトリのパス
const CONTENT_DIR = join(process.cwd(), 'src', 'content', 'posts')

// ULIDを使用して新しいフォルダ名を生成
const folderName = ulid().toLowerCase()
const folderPath = join(CONTENT_DIR, folderName)

// フォルダを作成
mkdirSync(folderPath, { recursive: true })

// 空のindex.mdxファイルを作成
const mdxContent = `---
title: 'Your Post Title'
description: 'A brief description of your post!'
date: ${new Date().toISOString().split('T')[0]}
tags: ['雑記']
image: './ogp.png'
authors: ['junta']
draft: false
---

hello.
`

writeFileSync(join(folderPath, 'index.mdx'), mdxContent)

console.log(`✅ 新しい記事フォルダを作成しました: ${folderName}`)
console.log(`パス: ${folderPath}`)
