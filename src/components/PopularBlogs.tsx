import { MessageCircle, ThumbsUp } from 'lucide-react'
import React from 'react'

const PopularBlogs = () => {
    const blogs = [
        {
            title: "My Stories",
            author: "Jess",
            likes: 50,
            comments: 10
        },
        {
            title: "Good thoughts",
            author: "Amber",
            likes: 20,
            comments: 2
        },
        {
            title: "Infinite Possibilities",
            author: "Stanford Paul",
            likes: 121,
            comments: 24
        }
    ]
  return (
    <div className='bg-white p-5 w-[23rem] border ml-5 rounded'>
        <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
        <ul>
            {
                blogs.map((blog, index) => (
                    <li key={index} className='mb-4'>
                        <div className="flex justify-between items-center">
                            <span className='font-bold mb-2'>{blog.title}</span>
                        </div>
                        <span className='text-gray-600'>Published by {blog.author}</span>
                        <div className="flex item-center mt-2">
                            <MessageCircle size={16} />
                            <span className='text-gray-500 mr-4 ml-1'>{blog.likes}</span>
                            <ThumbsUp size={16}/>
                            <span className='text-gray-500 mr-4 ml-1'>{blog.comments}</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default PopularBlogs