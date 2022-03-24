import React from 'react'

function Avatar({ className = "inline-block w-16", isRounded = true, user = null }) {

  return (
    <div className={`avatar placeholder align-top ${className}`}>
      <div className={`bg-neutral-focus text-neutral-content h-full ${isRounded ? "rounded-full" : ""}`}>
        {
          user == null || user.profile_pic_path == null ?
            <span className="text-3xl">P</span> :
            <img src={user.profile_pic_path} alt="P" />
        }
      </div>
    </div>
  )
}

export default Avatar;
