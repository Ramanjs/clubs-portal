import { useState } from "react";
import { useSelector } from "react-redux";
import { apiBaseUrl } from "../utils/baseUrl";

const EventForm = ({ clubHandle, setForm, setSuccess }) => {
  // Access token from Redux store
  const token = useSelector(state => state.user.token);

  // State variables to manage form input fields
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [venue, setVenue] = useState('');
  const [expParticipation, setExpParticipation] = useState('');
  const [req, setReq] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    fetch(apiBaseUrl + '/events/requests', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description: desc,
        start,
        end,
        venue,
        clubHandle
      })
    })
      .then(res => res.json())
      .then(res => {
        // Set success state to true upon successful submission
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {/* Form fields */}
      <div className="m-8 w-full flex flex-col">
        <p className="mt-4">Event Name</p>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(e) => setName(e.target.value)} />
        {/* Repeat similar input fields for other form inputs */}
      </div>

      {/* Buttons for form actions */}
      <div>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mx-2 mb-10 rounded focus:outline-none focus:shadow-outline" onClick={() => setForm(false)}>Cancel</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 mb-10 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default EventForm;
