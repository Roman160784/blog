
export type BlogsType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: BlogType[]
}

export type BlogType ={
        id: string
      name: string
      description: string
      websiteUrl: string
      createdAt: Date
      isMembership: boolean
    }