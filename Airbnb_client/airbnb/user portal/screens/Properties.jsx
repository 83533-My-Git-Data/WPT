import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import { getProperties } from '../services/property'
import { config } from '../services/config'
import Property from '../components/property'

function Properties() {
  const [properties, setProperties] = useState([])
  const navigate = useNavigate()

  const loadProperties = async () => {
    const result = await getProperties()
    if (result['status'] == 'success') {
      setProperties(result['data'])
    }
  }

  useEffect(() => {
    // this function will be called immediately after component gets loaded
    loadProperties()
  }, [])

  const onDetails = (index) => {
    navigate('/property-details')
  }

  return (
    <div>
      <Navbar />

      {properties.length == 0 && (
        <h3 className='mt-5' style={{ textAlign: 'center' }}>
          There are not properties at the moment.
        </h3>
      )}

      <div className='row mt-5'>
        {properties.map((property) => {
          return (
            <Property
              onClick={() => {
                navigate('/property-details')
              }}
              property={property}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Properties
