import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { toast } from 'react-toastify';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Enter a valid & an unique email address';
    }

    // Validate mobile
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile.trim() || !mobileRegex.test(mobile)) {
      newErrors.mobile = 'Enter a valid & an unique 10-digit mobile number';
    }

    // Validate gender
    if (!gender) {
      newErrors.gender = 'Gender is required';
    }

    // Validate nationality
    if (!nationality.trim()) {
      newErrors.nationality = 'Nationality is required';
    }

    // Validate address
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Validate message
    // No validation for message

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && !isSubmitting) {
      try {
        setIsSubmitting(true);
        const response = await axios.post('http://localhost:8000/adduser', {
          name,
          email,
          mobile,
          gender,
          nationality,
          address,
          message,
        });

        if (response.data) {
          toast.success('User added Successfully!');
          setName('');
          setEmail('');
          setMobile('');
          setGender('');
          setNationality('');
          setAddress('');
          setMessage('');
        } else {
          toast.error('Failed to submit the form..!');
        }
      } catch (error) {
        toast.warn('User Already Exists..!');
      } 
      finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('User validation failed!');
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, email, mobile, gender, nationality, address]);

  return (
    <>
   
       <section className='container-fluid h-screen ' style={{ backgroundImage: `url("/survey.png")`, backgroundSize: 'cover' }}>
        
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto p-8 border rounded  shadow-lg bg-gradient-to-r from-violet-900 "
    >
       <h1 className='text-center font-semibold text-2xl text-white pb-10'>Survey Form</h1>
      {/* row 1 */}
       
      <div className="row flex justify-between ">
       
        {/* name */}
        <div className="mb-4 w-1/2 pr-5">
          <label className="block text-gray-200 text-sm font-bold mb-2 " htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
        </div>

        {/* email */}
        <div className="mb-4 w-1/2">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* row 2 */}
      <div className="row flex justify-between">
        {/* phone number */}
        <div className="mb-4 w-1/2 pr-5">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="mobile">
            Phone No:
          </label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={`w-full p-2 border rounded ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.mobile && <p className="text-red-500 text-xs italic mt-1">{errors.mobile}</p>}
        </div>

        {/* gender */}
        <div className="mb-4 w-1/2 ">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="gender">
            Gender:
          </label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* row 3 */}
      <div className="row flex justify-between">
        {/* nationality */}
        <div className="mb-4 w-1/2 pr-5">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="nationality">
            Nationality:
          </label>
          <input
            type="text"
            name="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className={`w-full p-2 border rounded ${errors.nationality ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.nationality && <p className="text-red-500 text-xs italic mt-1">{errors.nationality}</p>}
        </div>

        {/* row 3 */}
        <div className="mb-4 w-1/2">
          <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="address">
            Address:
          </label>
          <textarea
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.address && <p className="text-red-500 text-xs italic mt-1">{errors.address}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="message">
          Message:
        </label>
        <textarea
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full p-2 border rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
        />
      </div>

      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </motion.form>
    </section>
    </>
  );
};

export default Form;
