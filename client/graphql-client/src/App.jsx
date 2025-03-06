import { useQuery, gql } from "@apollo/client"

const GET_LOCATION = gql`
query MyQuery {
   getTodos {
    id
    todo
    completed
    user {
      username
      age
      email
    }
  }
}
`
function App() {
  const {data, loading, error} = useQuery(GET_LOCATION);
  console.log(data);
  
  if(loading) return <p style={{ textAlign: "center" }}>Loading...</p>
  if(error) return <p>Error: {error.message}</p>

  return (
    <>
     <div>
      <h2>My first Graphql Apollo app 🚀 Todos List</h2>
      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead><tr><td>Todo</td><td>Completed</td><td>username</td><td>age</td><td>email</td></tr></thead>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id} style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>{todo.todo}</td>
              <td style={{ border: "1px solid black" }}>{todo.completed ? "true" : "false"}</td>
              <td style={{ border: "1px solid black" }}>{todo.user.username}</td>
              <td style={{ border: "1px solid black" }}>{todo.user.age}</td>
              <td style={{ border: "1px solid black" }}>{todo.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default App
