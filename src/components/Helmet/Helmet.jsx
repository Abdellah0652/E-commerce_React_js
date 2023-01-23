import React from "react"

export default function Helmet(props) {
  document.title = "𝔇𝔦𝔞𝔫𝔞 𝔖𝔱𝔬𝔯𝔢 -" + props.title
  return <div className="w-100">{props.children}</div>
}
