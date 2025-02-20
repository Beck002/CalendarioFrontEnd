import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../../helpers';
import { useAuthStore } from '../../hooks/useAuthStore';
import './LoginPage.css'

const loginFormField = {
    loginEmail: '',
    loginPassword: ''
};

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPasswordValidation: '',
};


export const LoginPage = () => {


    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormField );
    const { registerName, registerEmail, registerPassword, registerPasswordValidation, onInputChange:onRegisterInputChange} = useForm( registerFormFields );

    const { startLogin, startCreateUser, errorMessage } = useAuthStore();
    const loginSubmit = ( event ) => {
        event.preventDefault(); 
        startLogin({ email: loginEmail, password: loginPassword });

    }
    const registerSubmit = ( event ) => {
        event.preventDefault(); 

        if( registerPassword !== registerPasswordValidation) return Swal.fire('Error en Validación','Las contraseñas deben ser identicas', 'error'); 
        startCreateUser({ 
            name: registerName,
            email: registerEmail,
            password: registerPassword,
        })
    }

    useEffect(() => {
        
        if( errorMessage !== undefined ){
            Swal.fire(
                'Error en la autenticación',    
                errorMessage,
                'error'
            )
        }
    
    }, [ errorMessage ])
    


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form  onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPasswordValidation"
                                value={ registerPasswordValidation }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
  
}
