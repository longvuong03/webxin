import React, { useState } from 'react';
import { registerUser } from '../../services/UserServices'; // Đường dẫn đến file chứa API services của em
const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUser(email, firstName, lastName, password);
            if (response.status === 200) {
                alert('Registration successful!');
                // Em có thể điều hướng đến trang login hoặc trang khác sau khi đăng ký thành công
            }
        } catch (error) {
            setErrorMessage('Registration failed. Email may already be in use.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-btn">Register</button>
            </form>
        </div>
    );
};

export default Register;
