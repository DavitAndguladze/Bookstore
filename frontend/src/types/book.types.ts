export type ProductType = 'physical' | 'digital'

export type Visibility = 'draft' | 'published' | 'hidden'


export interface Book {
    id: string
    title: string 
    author: string
    publisher: string 
    isbn13: string
    isbn10?: string
    description: string
    bookImageUrl: string
    productType: ProductType
    price: string
    isActive: boolean
    visibility: Visibility
    createdAt: string
    updatedAt: string
    genres?: Genre[]
}

export interface Genre {
    id: string 
    name: string 
    slug: string 
    isActive: boolean
    createdAt: string 
}