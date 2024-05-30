import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import { getProperties } from '../services/property'
import { config } from '../services/config'

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

  const onDelete = (index) => {
    // delete a property
    properties.splice(index, 1)
    setProperties([...properties])
  }

  const onDetails = (index) => {
    navigate('/property-details')
  }

  return (
    <div>
      <Navbar />
      <h2 className='page-header'>Properties</h2>
      <Link to='/add-property' className='btn btn-primary'>
        Add Property
      </Link>
      {properties.length == 0 && (
        <h3 className='mt-5' style={{ textAlign: 'center' }}>
          There are not properties at the moment. Please use Add Property button
          to add one.
        </h3>
      )}

      {properties.length > 0 && (
        <table className='table table-striped mt-5'>
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Title</th>
              <th>Address</th>
              <th>Contact Name</th>
              <th>Contact Number</th>
              <th>Rent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      style={{ width: 100, height: 100 }}
                      src={`${config.serverUrl}/image/${property['profileImage']}`}
                      alt=''
                    />
                  </td>
                  <td>{property['title']}</td>
                  <td>{property['address']}</td>
                  <td>{property['ownerName']}</td>
                  <td>{property['contactNo']}</td>
                  <td>{property['rent']}</td>
                  <td>
                    <button
                      onClick={() => {
                        onDelete(index)
                      }}
                      className='btn btn-danger bt-sm me-2'
                    >
                      delete
                    </button>
                    <button
                      onClick={() => {
                        onDetails(index)
                      }}
                      className='btn btn-primary bt-sm'
                    >
                      details
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Properties
