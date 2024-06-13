import React from 'react'
import { Watch } from 'react-loader-spinner'

const PageLoader = () => {

    return (
        <>
            <div className='loader_custom'>
                <Watch
                    visible={true}
                    height="50vh"
                    width="50vh"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    
                />
            </div>

        </>
    )
}

export default PageLoader