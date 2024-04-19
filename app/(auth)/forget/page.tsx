

"use client"
import forget from "./forgetAction"
import { useFormState } from "react-dom"
export default function LoginPage() {
  const [error, formAction] = useFormState(forget, undefined)
  return (
    <div>
      <form action={formAction}>
        <h2>Reset Password?</h2>
        <input type="email" name='email' placeholder='Email' />
        <button type='submit'>Submit</button>
        <a href="#">Cancel</a>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}