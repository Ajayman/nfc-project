'use client'

import { loginAction } from '@/app/lib/actions'
export default function LoginForm() {
    return (
        <form action="loginAction">
            <div>Please Login to Continue</div>
            <div>
                <input type="email" name="email" required />
            </div>
            <div>
                <input type="password" name='password' required />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>

    )
}
