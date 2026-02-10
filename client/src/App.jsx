import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Auth test</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default App;
