import React from 'react'
import { useParams, Link } from 'react-router-dom'
import pages from '../data/pages'

export default function PageTemplate({slug: propSlug}){
  const slug = propSlug || useParams().slug
  const page = pages.find(p => p.slug === slug)
  if(!page) return (
    <div className="max-w-4xl mx-auto p-6">
      <h2>Page not found</h2>
      <p><Link to="/">Back to home</Link></p>
    </div>
  )
  return (
    <div className="max-w-4xl mx-auto p-6 my-6 bg-white dark:bg-[#071023] rounded shadow-sm">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{__html: page.content}} />
    </div>
  )
}