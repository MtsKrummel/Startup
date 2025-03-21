import { formatDate } from '@/lib/utils'

import { client } from '@/sanity/lib/client'
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import markdownit from 'markdown-it'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'
const md = markdownit()

export const experimental_ppr = true

const Page = async({ params } : {params : Promise<{ id: string}>}) => {

  const id = (await params).id

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })

  if(!post) return notFound()

  const parseContent = md.render(post?.pitch || '')

  return <>

    <section className='pink_container !min-h-[230px]'>
      <p className='tag'>{formatDate(post?._createdAt)}</p>
      <h1 className='heading'>{post.title}</h1>
      <p className='sub-heading'>{post.description}</p>
    </section>

    <section className='section_container'>
      <img 
        className='w-full h-auto rounded-xl' 
        src={post.image} 
        alt='thumbnail'
      />

      <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        {/* user */}
        <div className='flex-between gap-5'>
          {/* user link */}
          <Link 
            href={`/user/${post.author?._id}`} 
            className='flex gap-2 items-center mb-3'
          >
            <Image 
              src={post.author.image} 
              alt='avatar' 
              width={64} 
              height={64} 
              className='rounded-full drop-shadow-lg'
            />
            <div>
              <p className='text-20-medium'>{post.author.name}</p>
              <p className='text-16-medium !text-black-300'>{post.author.name}</p>
            </div>
            
          </Link>

          {/* category */}
          <p className='category-tag'>{post.category}</p>

        </div>

        {/* Pitch */}
        <h3 className='text-30-bold'>Pitch details</h3>
        {parseContent ? (
          <article
            className='prose max-w-4xl font-work-sans break-all'
            dangerouslySetInnerHTML={{__html: parseContent}}
          />
        ) : (
          <p className='no-result'>No details provided</p>
        )}


      </div>

      <hr className='divider'/>
      {/* TODO: EDITOR SELECTED STARTUPS */}
    </section>
    
    {/* Siempre que queramos implementar un PPR (Partial Pre Rendering) para combiar sitios estaticos con partes dinámicas, hay que utilizar componentes como suspense. */}
    <Suspense fallback={<Skeleton className='view_skeleton'/>}>
      <View id={id}/>
    </Suspense>
  </>
}

export default Page

// 🎯 Notas clave para implementación avanzada:
// 1. Estrategia de Revalidado: Combina con `revalidate` en fetch para ISR + Tiempo real
// 2. Optimización de Sanity: Usa listen:true en queries para actualizaciones automáticas
// 3. Error Boundaries: Implementa captura de errores para fallos en streams
// 4. Priorización: Usa el prop `priority` en imágenes dentro del View