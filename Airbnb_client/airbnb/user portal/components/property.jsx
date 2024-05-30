import { config } from '../services/config'
import { cutString } from '../utils'

function Property({ property, onClick }) {
  return (
    <div className='col-3' onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className='card'>
        <img
          style={{ height: 200 }}
          src={`${config.serverUrl}/image/${property['profileImage']}`}
          className='card-img-top'
          alt=''
        />
        <div className='card-body'>
          <h5 style={{ fontWeight: 'bold' }} className='card-title'>
            {cutString(property['title'])}
          </h5>
          <div className='card-text'>
            <span style={{ fontWeight: 'bold', fontSize: 18 }}>
              ₹{property['rent']}
            </span>{' '}
            night
          </div>
        </div>
      </div>
    </div>
  )
}

export default Property
