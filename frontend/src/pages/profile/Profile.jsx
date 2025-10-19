import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./profile.css"
// import { Pencil } from "lucide-react"
import ava1 from "@/assets/images/avatar/olivia-rhye.jpeg"
import { Badge } from "@/components/badge/Badge"
import Button from "@/components/button/Button"
import Input from "@/components/input/Input"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { getUserDetails, updateUserProfile } from "@/services/user.service"
import { fetchUserDetails, fetchUserDetailsStart } from "@/features/rtk/auth/authSlice"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.auth)
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  const { loading, run } = useAsyncHandler()
  const dispatch = useDispatch()

  const handleSaveProfile = run(
    async () => {
      await updateUserProfile({ fullName, username, email })
      const response = await getUserDetails()
      console.log(response, "---")
      dispatch(fetchUserDetailsStart())
      dispatch(fetchUserDetails(response.data.data.user))
    },
    { successMessage: "Profile updated successfully!" }
  )

  const handleCancel = () => {
    setUsername(user.username)
    setFullName(user.fullName)
    setEmail(user.email)
  }

  useEffect(() => {
    setUsername(user.username)
    setFullName(user.fullName)
    setEmail(user.email)
  }, [user])

  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <div>
      <div className="relative mb-36">
        <div className="bg-tertiary h-42 rounded-xl"></div>
        <div className="absolute -bottom-32 left-0 z-1 flex w-full items-center gap-4">
          <div className="bg-primary border-secondary h-40 w-40 rounded-full border p-2">
            <div className="overflow-hidden rounded-full">
              <img src={ava1} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="flex flex-1 items-start justify-between">
            <span className="flex flex-col gap-1">
              <span className="flex items-baseline gap-2">
                <h4>{user.fullName}</h4>
                <Badge variant="fill" color="brand" className="capitalize">
                  {user.role}
                </Badge>
              </span>
              <p className="text-secondary">{user.email}</p>
            </span>
            <span className="flex gap-4">
              <Button color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button loading={loading} onClick={handleSaveProfile}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </span>
          </div>
        </div>
      </div>
      <div className="border-secondary flex items-center justify-start gap-4 border-t px-4 py-8">
        <span className="w-2/6 font-semibold">
          <p>Username*</p>
        </span>
        <span className="w-2/6">
          <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </span>
      </div>
      <div className="border-secondary flex items-center justify-start gap-4 border-t px-4 py-8">
        <span className="w-2/6 font-semibold">
          <p>Fullname*</p>
        </span>
        <span className="w-2/6">
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Fullname" />
        </span>
      </div>
      <div className="border-secondary flex items-center justify-start gap-4 border-t px-4 py-8">
        <span className="w-2/6 font-semibold">
          <p>Email*</p>
        </span>
        <span className="w-2/6">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
        </span>
      </div>
      <div className="border-secondary flex items-center justify-start gap-4 border-t px-4 py-8">
        <span className="w-2/6 font-semibold">
          <p>Avatar*</p>
        </span>
        <span className="w-2/6">
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <img src={ava1} alt="" className="h-full w-full object-cover" />
          </div>
        </span>
      </div>
    </div>
  )
}

export default Profile
