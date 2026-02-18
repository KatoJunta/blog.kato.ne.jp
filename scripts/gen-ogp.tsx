// @ts-nocheck
import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'
import { ImageResponse } from '@vercel/og'
import React from 'react'
import crypto from 'crypto'

const CONTENT_DIR = 'src/content/posts'
const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630
const HASH_FILE_NAME = 'content-hash.json'

function hashContent(content) {
  return crypto.createHash('md5').update(content).digest('hex')
}

function formatTitleText(title) {
  return title
    .replace(
      /([\u3001\u3002\uff01\uff1f\u300c\u300d\u3001\u3002\uff0c\uff0e\u201c\u201d])/g,
      '\u00A0$1',
    )
    .replace(/([\/\-])/g, '$1\u200B')
}

function saveContentHash(filePath, titleHash, contentHash) {
  const dirPath = path.dirname(filePath)
  const hashFilePath = path.join(dirPath, HASH_FILE_NAME)

  let hashData = {}
  if (fs.existsSync(hashFilePath)) {
    try {
      hashData = JSON.parse(fs.readFileSync(hashFilePath, 'utf-8'))
    } catch (error) {
      console.warn(
        `⚠️ ハッシュファイルの読み込みに失敗しました: ${hashFilePath}`,
      )
    }
  }

  hashData.titleHash = titleHash
  hashData.contentHash = contentHash
  hashData.lastGenerated = new Date().toISOString()

  fs.writeFileSync(hashFilePath, JSON.stringify(hashData, null, 2))
}

function compareContentHash(filePath, titleHash, contentHash) {
  const dirPath = path.dirname(filePath)
  const hashFilePath = path.join(dirPath, HASH_FILE_NAME)

  if (!fs.existsSync(hashFilePath)) {
    return true
  }

  try {
    const hashData = JSON.parse(fs.readFileSync(hashFilePath, 'utf-8'))

    return (
      hashData.titleHash !== titleHash || hashData.contentHash !== contentHash
    )
  } catch (error) {
    console.warn(`⚠️ ハッシュファイルの比較に失敗しました: ${hashFilePath}`)
    return true
  }
}

async function generateOgImages() {
  try {
    console.log('🖼️ OGP画像の生成を開始します...')

    const contentFiles = await glob('**/*.{md,mdx}', {
      cwd: CONTENT_DIR,
      absolute: false,
    })

    console.log(`📄 ${contentFiles.length}件のコンテンツファイルを検出しました`)

    for (const filePath of contentFiles) {
      const fullPath = path.join(CONTENT_DIR, filePath)
      const content = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(content)

      const title = data.title || 'No Title'
      const description = data.description || ''

      const formattedTitle = formatTitleText(title)

      const titleHash = hashContent(title)
      const contentHash = hashContent(content)

      const dirPath = path.dirname(fullPath)
      const ogpFilePath = path.join(dirPath, 'ogp.png')

      const contentChanged = compareContentHash(
        fullPath,
        titleHash,
        contentHash,
      )

      if (fs.existsSync(ogpFilePath) && !contentChanged) {
        console.log(`⏭️ コンテンツ未変更のためスキップ: ${ogpFilePath}`)
        continue
      }

      console.log(`🔄 OGP画像を生成中: ${ogpFilePath}`)

      const ogImage = new ImageResponse(
        (
          <div
            style={{
              width: 1200,
              height: 630,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              letterSpacing: '-.02em',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg,#0e0f12 0%,#1a1c22 100%)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 460,
                height: 460,
                borderRadius: '50%',
                right: -110,
                top: -110,
                background:
                  'radial-gradient(circle,#c5ea7e 0%,transparent 72%)',
                opacity: 0.25,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(120deg,transparent 64%,#c47d4e 64%,#c47d4e 67%,transparent 67%)',
                opacity: 0.12,
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: 42,
                top: 42,
                display: 'flex',
                alignItems: 'center',
                color: '#f5f5f5',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  background: '#c5ea7e',
                  borderRadius: '50%',
                }}
              />
              <span style={{ marginLeft: 10, fontSize: 24 }}>
                blog.kato.ne.jp
              </span>
            </div>

            <div
              style={{
                color: '#ffffff',
                width: '100%',
                maxWidth: 1080,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 80px 0 80px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  fontSize:
                    title.length > 50
                      ? 48
                      : title.length > 40
                        ? 54
                        : title.length > 30
                          ? 60
                          : title.length > 20
                            ? 66
                            : 72,
                  lineHeight: title.length > 30 ? 1.3 : 1.4,
                  fontWeight: 800,
                  textAlign: 'left',
                  textShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  padding: 0,
                  wordBreak: 'keep-all',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  wordSpacing: '0.01em',
                }}
              >
                {formattedTitle}
              </div>
            </div>
          </div>
        ),
        {
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
        },
      )

      const arrayBuffer = await ogImage.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      fs.writeFileSync(ogpFilePath, buffer)

      saveContentHash(fullPath, titleHash, contentHash)

      console.log(`✅ OGP画像を生成しました: ${ogpFilePath}`)
    }

    console.log('🎉 OGP画像の生成が完了しました')
  } catch (error) {
    console.error('❌ OGP画像の生成中にエラーが発生しました:', error)
    process.exit(1)
  }
}

generateOgImages()
