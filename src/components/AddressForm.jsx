import { useState } from 'react';
import './addressForm.css'; 

function AddressForm() {
  const [address, setAddress] = useState({
    house: '',
    apartment: '',
    category: '',
  });
  const [addresses, setAddresses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category) => {
    setAddress((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.house && address.apartment && address.category) {
      setAddresses((prev) => [...prev, { ...address, clickCount: 0 }]);
      setAddress({ house: '', apartment: '', category: '' }); 
    } else {
      alert('Please fill out all fields and select a category.');
    }
  };

  const handleAddressClick = (index) => {
    setAddresses((prev) => {
      const updatedAddresses = [...prev];
      updatedAddresses[index].clickCount += 1;

      if (updatedAddresses[index].clickCount >= 5) {
        updatedAddresses[index].favorite = true;
      }
      return updatedAddresses;
    });
  };

  const renderCategoryIcon = (category) => {
    switch (category) {
      case 'Home':
        return '🏠';
      case 'Office':
        return '🏢';
      case 'Friends & Family':
        return '👨‍👩‍👧‍👦';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="address-form-container">
        <h2>Save Address</h2>
        <form onSubmit={handleSubmit} className="address-form">
          <label>
            House/Flat/Block No.:
            <input type="text" name="house" value={address.house} onChange={handleChange} placeholder="Enter House/Flat/Block No." />
          </label>
          <label>
            Apartment/Road/Area:
            <input type="text" name="apartment" value={address.apartment} onChange={handleChange} placeholder="Enter Apartment/Road/Area" />
          </label>
          <div className="categories">
            <p>Save As:</p>
            <button
              type="button"
              className={`category-button ${address.category === 'Home' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('Home')}
            >
              🏠
            </button>
            <button
              type="button"
              className={`category-button ${address.category === 'Office' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('Office')}
            >
              🏢
            </button>
            <button
              type="button"
              className={`category-button ${address.category === 'Friends & Family' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('Friends & Family')}
            >
              👨‍👩‍👧‍👦
            </button>
          </div>
          <button type="submit" className="save-button">
            Save Address
          </button>
        </form>
      </div>

      <div className="address-form-container">
        <div className="saved-addresses">
          <h3>Saved Addresses</h3>
          <ul>
            {addresses.map((addr, index) => (
              <li key={index} onClick={() => handleAddressClick(index)} className="address-item">
                <div className='adr-box'>
                    <div className='box1'>
                        <div className='icon'>
                            <span className="category-icon">{renderCategoryIcon(addr.category)}</span>
                        </div>
                        <div className='address'>
                            <strong>{addr.category}</strong><br />
                            <span>{addr.house}, {addr.apartment}</span>
                        </div>
                        
                    </div>
                    <div className='box2'>
                        <span className='favorite'>{addr.favorite && <span className="favorite-tag"><span>&#11088;</span>Favorite</span>}</span>
                    </div>
                    
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AddressForm;
