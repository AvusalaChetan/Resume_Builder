import axios from 'axios'

export const GetTokens = async () => {
  try {
     const res = await axios.get('/token')
   return res.data
  } catch (error) {
    console.log(error.message,error.res)
    return error.res?.data
  }
}


