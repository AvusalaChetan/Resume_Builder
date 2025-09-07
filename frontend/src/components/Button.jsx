import {Link} from 'react-router-dom'
export const Button = ({type,bool,value,onClick}) => {
  return (
    <div>
      <button type={type}
      onClick={onClick}
      disabled={bool}
          className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >{value}</button>
    </div>
  )
}

export const Button2 = ({type,bool,value,onClick})=>(
<>
    <div>
      <button type={type}
      onClick={onClick}
      disabled={bool}
    className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"      >{value}</button>
    </div>
</>
);

export const LinkBtn =({to,value})=>(
<>
    <div>
     
     <Link
      to={to}
      className="border capitalize border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700 shadow-sm"
    >
     {value}
    </Link>
    </div>
</>
);
export default Button