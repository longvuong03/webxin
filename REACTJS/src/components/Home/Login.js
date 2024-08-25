import React, { useState } from 'react';
import { logins } from '../../services/UserServices';
import '../../asset/css/styledn.css';
// import './assets/css/style.css';




const LoginForm = ({ handleLogin }) => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await logins(email, password);
            if (res && res.id && res.first_name) {
                console.log('Login successful', res);
                sessionStorage.setItem('user', JSON.stringify({
                    id: res.id,
                    email: res.email,
                    first_name: res.first_name,
                    last_name: res.last_name,
                }));
                handleLogin(res);
            } else {
                console.log('Login failed');
                console.log('Wrong username or password!')
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };
    const huyLogin = () => {
        setEmail('');
        setPassword('');
    }
    return (
        <div>
        <div className="container">
           <div className="row mb-5">
              <div className="col-9 col-sm-8 mt-4 mb-4">
                 <p className="fw-bolder fs-6">LOGIN</p>
              </div>
              <div className="col-2 col-sm-4 fs-6 fw-bolder text-secondary mt-4 mb-4 font-respon">HOME / LOGIN</div>
           </div>
        </div>
        <div className="container">
           <div className="row mt-4">
              <div className="col-lg-5 col-sm-12 mt-5">
                 <div className="row">
                    <p className="fs-2 fw-bold">LOGIN</p>
                 </div>
                 <div className="row border p-2 rounded-1 mb-5">
                    <form onSubmit={handleLoginSubmit} className="row needs-validation" noValidate>
                       <div className="row mt-3">
                          <label htmlFor="validationCustomUsername" className="form-label fw-bolder">Username</label>
                          <div className="input-group has-validation">
                             <input type="email" name="email" class="form-control inputdn" id="validationCustomUsername" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required="" aria-required="true"/>
                             <div className="invalid-feedback">
                                Please choose a username.
                             </div>
                          </div>
                       </div>
                       <div className="row mt-2">
                          <label htmlFor="validationCustomPassword" className="form-label fw-bolder">Password</label>
                          <div className="input-group has-validation">
                             <input type="password" name="password" class="form-control inputdn" id="validationCustomPassword" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required="" aria-required="true"/>
                             <div className="invalid-feedback">
                                Please check your password.
                             </div>
                          </div>
                       </div>
                       <div className="col-12">
                          <div className="form-check mt-2">
                             <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                             <label className="form-check-label" htmlFor="invalidCheck">
                             Agree to terms and conditions
                             </label>
                             <div className="invalid-feedback">
                                You must agree before submitting.
                             </div>
                          </div>
                       </div>
                       <div className="col-12 text-center">
                          <button type="submit" class="btnlogin mt-3 mb-3"><a className="text-decoration-none text-dark">Đăng nhập</a></button>
                       </div>
                    </form>
                    <div className="row mt-4 mb-4 loginsocial">
                       <div className="col-6">
                          <span className="fontchulogin fw-bold">
                          <i className="fa-brands fa-facebook text-primary"></i>&emsp;&emsp; Login With Facebook
                          </span>
                       </div>
                       <div className="col-6">
                          <span className="fontchulogin fw-bold">
                          <i className="fa-brands fa-google text-secondary"></i>&emsp;&emsp; Login With Google
                          </span>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="col-lg-5 col-sm-12 mt-5 mx-auto">
                 <div className="row">
                    <p className="fs-3 fw-bold">NEW CUSTOMER</p>
                 </div>
                 <div className="row mt-3">
                    <p className="fw-bold">CREATE AN ACCOUNT</p>
                    <p className="text-secondary mt-3">
                       Sign up for a free account at our store. Registration is quick and easy. It allows you to be able to order from our shop. To start shopping click register.
                    </p>
                    <button className="btnsignup">
                    <a href="./indexdk.html" className="text-decoration-none text-white fw-bold">CREATE AN ACCOUNT</a>
                    </button>
                 </div>
              </div>
           </div>
        </div>
     </div>


        
        // <div className="container">
        //     <div className="d-flex justify-content-center mt-5 ">
        //         <div className="wrapper">
        //             <form onSubmit={handleLoginSubmit}>
        //                 <h1>Login</h1>
        //                 <div className="input-box">
        //                 <input type="email" value={email}
        //                 onChange={(e) => setEmail(e.target.value)} placeholder='Email hoặc số điện thoại' className="form-control" aria-describedby="emailHelp" />

        //                 </div>
        //                 <div className="input-box">
        //                 <input type="password" value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     autoComplete="current-password" placeholder='Mật khẩu' className="form-control" />

        //                 </div>

        //                 <div className="remember-forgot">
        //                     <label><input type="checkbox" />Remember me </label>
        //                     <a href="">Forgot password</a>
        //                 </div>

        //                     <button type="submit">Login</button>

        //                 <div className="register-link">
        //                     <p>Don't have an account? <a href="a">Register</a></p>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );
};

export default LoginForm;
