import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/auth'
import { useAuthStore } from '../store/auth.store'

function LoginPage() {
    const navigate = useNavigate()
    const setLogin = useAuthStore((state) => state.login)

    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setLogin(data.user, data.token)
            navigate('/')
        },
        onError: () => {
            setError('Invalid email or password')
        },
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-6">Sign in</h1>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={(e) => {
                    e.preventDefault()
                    setError('')
                    mutation.mutate({ email, password })
                }}>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 mb-4"
                        required
                    />

                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 mb-6"
                        required
                    />

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                        {mutation.isPending ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    No account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage