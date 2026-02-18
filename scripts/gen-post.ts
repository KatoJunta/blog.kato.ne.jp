import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { ulid } from 'ulid'

const CONTENT_DIR = join(process.cwd(), 'src', 'content', 'posts')
const folderName = ulid().toLowerCase()
const folderPath = join(CONTENT_DIR, folderName)
mkdirSync(folderPath, { recursive: true })
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
