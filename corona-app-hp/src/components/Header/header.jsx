

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className=" pt-4 pb-2">
                <div className="row">
                    <div className="col-9">
                        <h1 className="mb-0 header-title">Bienvenido a la app de información de COVID  </h1>

                        <h4>creado por Luis David A Colmenares R</h4>
                        <h5>Celular: 3057375348 </h5>
                        <h5>Email: ADLSistemas@hotmail.com </h5>
                    </div>
                    <div className="col-3">
                        <div style={{textAlign:'right' }}>
                            <Link to="/">Salir</Link>  
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header