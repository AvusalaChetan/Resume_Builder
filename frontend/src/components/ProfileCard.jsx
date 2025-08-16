import { Link } from 'react-router-dom'

const ProfileCard = ({ user }) => {
    const { name, email, avatar, resumeCount = 0, downloadsCount = 0, memberSince = "2024" } = user || {}

    return (
        <div className='w-full max-w-sm mx-auto'>
            <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                <div className='bg-gradient-to-r from-black/90 to-black/50 h-24 relative'>
                    <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2'>
                        <div className='relative'>
                            <p className=' bg-white w-20 h-20 text-3xl rounded-full border-4 border-white object-cover shadow-md flex items-center justify-center ' 
>{name?.charAt(0).toUpperCase() || "U"}</p>
                        </div>
                    </div>
                </div>

                <div className='pt-12 pb-6 px-6 text-center'>
                    <h3 className='text-xl font-bold text-gray-800 mb-1'>
                        {name || "User Name"}
                    </h3>
                    <p className='text-gray-500 text-sm mb-1'>
                        {email || "user@example.com"}
                    </p>
                    <p className='text-xs text-gray-400'>
                        Member since {memberSince}
                    </p>
                </div>

                <div className='grid grid-cols-2 divide-x divide-gray-200 bg-gray-50 py-4'>
                    <div className='text-center'>
                        <div className='text-2xl font-bold text-blue-600'>{resumeCount}</div>
                        <div className='text-xs text-gray-600 uppercase tracking-wide'>Resumes</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-2xl font-bold text-green-600'>{downloadsCount}</div>
                        <div className='text-xs text-gray-600 uppercase tracking-wide'>Downloads</div>
                    </div>
                </div>

                <div className='p-6 space-y-3'>
                    <Link 
                        to="/create_resume" 
                        className='w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-center block font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                    >
                        Create Resume
                    </Link>
                    <Link 
                        to="/my-resumes" 
                        className='w-full border-2 border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-center block font-medium'
                    >
                        My Resumes
                    </Link>
                </div>
                </div>
            </div>
    )
}

export default ProfileCard