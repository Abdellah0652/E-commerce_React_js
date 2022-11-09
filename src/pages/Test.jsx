import { useState } from "react"

function Test() {
  const [inputFields, setInputFields] = useState([{ name: "", age: "" }])
  return (
    <div className="App">
      <form>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <input name="name" placeholder="Name" value={input.name} />
              <input name="age" placeholder="Age" value={input.age} />
            </div>
          )
        })}
      </form>
    </div>
  )
}

export default Test
