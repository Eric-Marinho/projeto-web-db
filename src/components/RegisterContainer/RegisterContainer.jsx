// src/components/RegisterContainer/RegisterContainer.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterContainer.css';

export default function RegisterContainer() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dataNascimento: '',
        foto: null
    });
    const [preview, setPreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            setForm({ ...form, [name]: files[0] });

            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(files[0]);
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleFirstStepSubmit = (e) => {
        e.preventDefault();
        console.log("Submetendo primeira etapa com:", form);

        if (form.password !== form.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        console.log("Senha validada. Avançando para etapa 2.");
        setStep(2);
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        console.log('Usuário cadastrado com:', form);
        alert('Cadastro completo (simulado)');
        navigate('/login');
    };

    return (
        <div className="register-container">
            <div className="box">
                {step === 1 ? (
                    <>
                        <h2>Criar Conta</h2>
                        <form onSubmit={handleFirstStepSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <div className="senha-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button type="button" className="senha-toggle" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmar Senha</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="register-button">Próxima Etapa</button>
                            <button type="button" className="back-button" onClick={() => navigate('/login')}>Voltar para Login</button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2>Dados Adicionais</h2>
                        {preview && (
                            <div className="preview-container">
                                <img src={preview} alt="Preview" className="profile-preview" />
                            </div>
                        )}
                        <form onSubmit={handleFinalSubmit}>
                            <div className="form-group">
                                <label htmlFor="dataNascimento">Data de Nascimento</label>
                                <input type="date" id="dataNascimento" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="foto">Foto de Perfil</label>
                                <input type="file" id="foto" name="foto" accept="image/*" onChange={handleChange} />
                            </div>
                            <button type="submit" className="register-button">Finalizar Cadastro</button>
                            <button type="button" className="back-button" onClick={() => setStep(1)}>Voltar</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
