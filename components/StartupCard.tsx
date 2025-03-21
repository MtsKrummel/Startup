import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupCardType = Omit<Startup, 'author'> & { author?: Author}

const StartupCard = ({ post } : {post : StartupCardType}) => {
  const { 
    _id, 
    title,
    description, 
    image, 
    author, 
    views, 
    category, 
    _createdAt
  } = post
  
  return (
    <li className='startup-card group'>

      {/* First Row */}
      <div className='flex-between'>
        <p className='startup-card_date'>{formatDate(_createdAt)}</p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' />
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      {/* Second Row */}
      <div className='flex-between mt-7 gap-5'>
        {/* author and title */}
        <div className='flex-1'>
          <Link href={`/user/${author?._id}`}>
            <p className='text-16-medium line-clamp-1'>{author?.name}</p>
          </Link>

          <Link href={`/startup/${_id}`}>
            <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>

        {/* author icon */}
        <Link href={`/user/${author?._id}`}>
          <Image 
            src={author?.image}
            alt='placeholder'
            width={48}
            height={48}
            className='rounded-full'
          />
        </Link>

      </div>

      {/* Third Row */}
      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>
          {description}
        </p>

        <img src={image} alt='placeholder' className='startup-card_img' />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-16-medium'>{category}</p>
        </Link>

        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`} >
            Details
          </Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard