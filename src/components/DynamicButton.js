import React from 'react'
import { useForm } from 'react-hook-form'
export default function DynamicButton() {
  const { handleSubmit, formState } = useForm()
  const { isSubmitting } = formState
  function submitForm(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
          <div className="mt-2">
              <button disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting && (
                  <span className="spinner-grow spinner-grow-sm"></span>
                )}
                Sign In
              </button>
          </div>
      </form>
    </div>
  )
}