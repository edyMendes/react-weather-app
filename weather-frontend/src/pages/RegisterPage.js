import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (username.length < 3) {
            alert("Username must be at least 3 characters long.");
            return false;
        }
        if (password.length < 10) {
            alert("Password must be at least 10 characters long.");
            return false;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, password });
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="noselect" onSubmit={handleRegister}>
            <h2 className="noselect">Register</h2>
            <div>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="confirmPassword"
                    id="confirmpassword"
                    autoComplete="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <br />
            <Button type="submit" variant="contained" color="primary" size='large' startIcon={<PersonAddIcon />} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </Button>
            <p className="noselect">Already have an account? <Link to="/login">Login here</Link></p>
        </form>
    );
};
export default Register;
