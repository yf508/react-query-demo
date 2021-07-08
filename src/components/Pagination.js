import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Person from './Person'

const pageLimit = 5

const fetchUsers = async (page = 1) => {
  // console.log('calling fetchUsers.')  
  const res = await axios(
    `https://api.artworld.hosted.york.ac.uk/searchOnly?keyword=&page=${page}&types[]=people&limit=${pageLimit}`
  )
  return res.data.response
}

function PaginatedQuery() {
  const [page, setPage] = useState(1)
  
  const { data, isLoading, isError, status, error } = useQuery(
    ['paginatedUsers', page],
    () => fetchUsers(page),
    {
      keepPreviousData: true,
      staleTime: 5000000,
      cacheTime: 5000000, // 5 minutes, The time in milliseconds that unused/inactive cache data remains in memory. When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different cache times are specified, the longest one will be used.
    }
  )

  const prevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <h2>Paginated Query</h2>
      
      <div>
        <button
          onClick={prevPage}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span>
          Page: {page}
        </span>
        <button
          onClick={nextPage}
          disabled={data && data.length < pageLimit}
        >
          Next
        </button>
      </div>

      <div>
        {isError && <div>{error.message}</div>}

        {isLoading && <div>Loading...</div>}

        {status === 'success' && 
          <div>
            { data.results.map(person => <Person key={person.id} person={person} /> ) }
          </div>
        }
      </div>
    </div>
  )
}

export default PaginatedQuery
