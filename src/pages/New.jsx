import React from "react"
import "../styles/new.css"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import { useEffect, useState } from "react"
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore"
import { auth, db, storage } from "../firebase.config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("")
  const [data, setData] = useState({})
  const [per, setPerc] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name

      console.log(name)
      const storageRef = ref(storage, `files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")
          setPerc(progress)
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused")
              break
            case "running":
              console.log("Upload is running")
              break
            default:
              break
          }
        },
        error => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setData(prev => ({ ...prev, img: downloadURL }))
          })
        }
      )
    }
    file && uploadFile()
  }, [file])

  console.log(data)

  const handleInput = e => {
    const id = e.target.id
    const value = e.target.value

    setData({ ...data, [id]: value })
  }

  const handleAdd = async e => {
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp()
      })
      toast.success(" Aser Added successfuly")

      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  upload your profile : <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input required type="file" id="file" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>

              {inputs &&
                inputs.map(input => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input required id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput} />
                  </div>
                ))}
              <button className="button_new" disabled={per !== null && per < 10} type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
