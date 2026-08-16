const ErrorLayout = ({ title = 'Something went wrong', children }) => (
  <main role="alert">
    <h1>{title}</h1>
    {children}
  </main>
)

export default ErrorLayout
