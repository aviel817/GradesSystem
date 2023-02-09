import './NotFound.css'

const NotFound = () => {
    return (

    <div className='container-404'>

        <div className="text-center" >
            <div className="NotFoundErr mx-auto" data-text="404">404</div>
            <p className="lead text-gray-800 mb-5" style={{"fontSize": 32}}><b>Page Not Found</b></p>
            <a href="/">&larr; Back to main page</a>
        </div>

    </div>
    )
}

export default NotFound