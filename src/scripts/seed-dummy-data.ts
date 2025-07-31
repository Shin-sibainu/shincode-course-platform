import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// 環境変数を読み込む
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedDummyData() {
  console.log('Starting dummy data seeding...')

  try {
    // ダミー講座データ
    const courses = [
      {
        title: 'Claude AIで学ぶWebアプリ開発',
        description: 'Claude AIを活用して、効率的にWebアプリケーションを開発する方法を学びます。実践的なプロジェクトを通じて、AIペアプログラミングのスキルを身につけましょう。',
        thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
      },
      {
        title: 'ChatGPT × Python自動化講座',
        description: 'ChatGPTとPythonを組み合わせて、日常業務を自動化する方法を学びます。スクレイピング、データ処理、レポート作成まで幅広くカバーします。',
        thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80'
      },
      {
        title: 'AI活用Excel/VBA講座',
        description: 'AIを使ってExcelマクロやVBAを効率的に作成する方法を学びます。プログラミング初心者でも、AIの力で高度な自動化ツールを作れるようになります。',
        thumbnail_url: 'https://images.unsplash.com/photo-1632239776255-0a7f24814df2?w=800&q=80'
      },
      {
        title: 'Cursor AIエディタ完全マスター',
        description: 'AI搭載エディタ「Cursor」を使いこなして、開発効率を10倍にする方法を学びます。実践的なコーディングテクニックを習得しましょう。',
        thumbnail_url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80'
      },
      {
        title: 'GitHub Copilot実践ガイド',
        description: 'GitHub Copilotを最大限活用して、コーディング速度を劇的に向上させる方法を学びます。実際のプロジェクトでの活用事例を交えて解説します。',
        thumbnail_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80'
      },
      {
        title: 'NoCode × AI アプリ開発入門',
        description: 'BubbleやFlutterFlowなどのNoCodeツールとAIを組み合わせて、プログラミング知識なしでアプリを開発する方法を学びます。',
        thumbnail_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80'
      }
    ]

    // 講座を作成
    for (const courseData of courses) {
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert(courseData)
        .select()
        .single()

      if (courseError) {
        console.error('Error creating course:', courseError)
        continue
      }

      console.log(`Created course: ${course.title}`)

      // 各講座にセクションを作成
      const sections = [
        { title: '導入編', order_index: 1 },
        { title: '基礎編', order_index: 2 },
        { title: '実践編', order_index: 3 },
        { title: '応用編', order_index: 4 }
      ]

      for (const sectionData of sections) {
        const { data: section, error: sectionError } = await supabase
          .from('sections')
          .insert({
            course_id: course.id,
            ...sectionData
          })
          .select()
          .single()

        if (sectionError) {
          console.error('Error creating section:', sectionError)
          continue
        }

        console.log(`  Created section: ${section.title}`)

        // 各セクションに動画を作成
        const videoTemplates = [
          { title: 'はじめに', duration: 300, is_free: true },
          { title: '環境構築', duration: 600, is_free: false },
          { title: '基本操作', duration: 900, is_free: false },
          { title: '実践演習', duration: 1200, is_free: false },
          { title: 'まとめと次のステップ', duration: 450, is_free: false }
        ]

        for (let i = 0; i < videoTemplates.length; i++) {
          const videoData = {
            section_id: section.id,
            title: `${section.title} - ${videoTemplates[i].title}`,
            youtube_url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, // ダミーURL
            duration: videoTemplates[i].duration,
            order_index: i + 1,
            is_free: videoTemplates[i].is_free
          }

          const { error: videoError } = await supabase
            .from('videos')
            .insert(videoData)

          if (videoError) {
            console.error('Error creating video:', videoError)
            continue
          }

          console.log(`    Created video: ${videoData.title}`)
        }
      }
    }

    console.log('Dummy data seeding completed!')
  } catch (error) {
    console.error('Error seeding dummy data:', error)
  }
}

// スクリプトを実行
seedDummyData()