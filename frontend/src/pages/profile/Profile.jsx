import React from "react"
import { useSelector } from "react-redux"
import "./profile.css"
import { Pencil } from "lucide-react"

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className="profile-main_container">
      <div className="profile-profile_info">
        <div className="user-info">
          <div className="user-details">
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full mask-b-from-20% mask-b-to-80% opacity-50">
              <img
                src="https://plus.unsplash.com/premium_photo-1669411190248-b67e6c4a50cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8"
                alt=""
                srcset=""
                className="h-full w-full bg-cover bg-center"
              />
            </div>
            <div className="user-avatar">
              {/* <img src="" alt="" srcset="" /> */}
              {user?.fullName[0].toUpperCase()}
            </div>
            <div className="user-name mb-1">
              <h5>{user.fullName}</h5>
              <p className="text-fg-muted text-sm">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button className="text-fg-muted bg-basebg-surface2 hover:bg-basebg-surface border-border-default my-2 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded text-sm hover:border">
              <Pencil size={16} className="mt-0.5" />
              Edit Profile
            </button>
          </div>
        </div>
        <div className="bg-border-default m-4 h-0.25"></div>
      </div>
      <div className="profile-performance"></div>
    </div>
  )
}

export default Profile
