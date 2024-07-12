import {useState} from "react"
import {useSelector} from "react-redux"
import { apiBaseUrl } from "../utils/baseUrl"

const ClubForm = ({ setForm, setSuccess }) => {
  const token = useSelector(state => state.user.token)

  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [desc, setDesc] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    fetch(apiBaseUrl + '/clubs/requests', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        handle,
        description: desc,
        email
      })
    })
      .then(res => res.json())
      .then(res => {
        setSuccess(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
    <div className="m-8 w-full flex flex-col">
      
      <p className="mt-4">Club Name</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(e) => setName(e.target.value)}/>
      <p className="mt-4">Club Handle</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={handle} onChange={(e) => setHandle(e.target.value)}/>
      <p className="mt-4">Club Description</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={desc} onChange={(e) => setDesc(e.target.value)}/>
      <p className="mt-4">Email</p>
      <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="ieee@iiitd.ac.in"/>
    </div>
    <div>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mx-2 mb-10 rounded focus:outline-none focus:shadow-outline" onClick={() => setForm(false)}>Cancel</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 mb-10 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Submit</button>
    </div>
    </>
  )
}

export default ClubForm
