import React, { useState } from 'react'

function SearchPage() {
  const [data,setData]=useState([])
  return (
    <section>
      <div>
        <p>search Results:{data.length}</p>
        <div>
          
        </div>
      </div>
    </section>
  )
}

export default SearchPage