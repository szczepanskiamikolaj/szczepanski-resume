import React, { useEffect } from "react"
import { navigate } from "gatsby"

const NotFoundPage = () => {
  useEffect(() => {
    navigate("/")
  }, [])

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Redirecting you to the homepage...</p>
    </div>
  )
}

export default NotFoundPage
