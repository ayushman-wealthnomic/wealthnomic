import { createContext, useContext, useState, useEffect } from 'react'
import {
    signUp,
    signIn,
    signOut,
    confirmSignUp,
    getCurrentUser,
    fetchUserAttributes
} from 'aws-amplify/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Check if user is already logged in
    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        try {
            const currentUser = await getCurrentUser()
            const attributes = await fetchUserAttributes()
            setUser({ ...currentUser, ...attributes })
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    // Sign Up
    async function handleSignUp({ email, password, name }) {
        try {
            setError(null)
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        email,
                        name
                    },
                    autoSignIn: true
                }
            })

            return {
                success: true,
                isSignUpComplete,
                userId,
                nextStep
            }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    // Confirm Sign Up (email verification)
    async function handleConfirmSignUp({ email, code }) {
        try {
            setError(null)
            const { isSignUpComplete } = await confirmSignUp({
                username: email,
                confirmationCode: code
            })

            return { success: true, isSignUpComplete }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    // Sign In
    async function handleSignIn({ email, password }) {
        try {
            setError(null)
            const { isSignedIn, nextStep } = await signIn({
                username: email,
                password
            })

            if (isSignedIn) {
                await checkUser()
            }

            return { success: true, isSignedIn, nextStep }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    // Sign Out
    async function handleSignOut() {
        try {
            await signOut()
            setUser(null)
            return { success: true }
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        }
    }

    const value = {
        user,
        loading,
        error,
        signUp: handleSignUp,
        confirmSignUp: handleConfirmSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
        checkUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
