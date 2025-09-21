import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit/index.jsx'
import ViewResume from './my-resume/[resumeId]/view/index.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn('Clerk publishable key not found. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file.')
}
const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      },
    ]
  },
 ,
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  },
  {
    path:'/my-resume/:resumeId/view',
    element:<ViewResume/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    ) : (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">AI Resume Builder</h1>
          <p className="text-gray-600 mb-4">Please configure your environment variables:</p>
          <div className="text-left bg-gray-50 p-4 rounded-md">
            <p className="text-sm font-mono">1. Create a .env file in the root directory</p>
            <p className="text-sm font-mono">2. Add your Clerk publishable key:</p>
            <p className="text-sm font-mono text-blue-600">VITE_CLERK_PUBLISHABLE_KEY=your_key_here</p>
          </div>
          <p className="text-gray-500 mt-4 text-sm">
            Get your Clerk key from: <a href="https://clerk.com" className="text-blue-500 underline">clerk.com</a>
          </p>
        </div>
      </div>
    )}
  </React.StrictMode>,
)
