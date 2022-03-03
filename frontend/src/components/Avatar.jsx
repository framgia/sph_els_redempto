import React from 'react'

function Avatar({className = "inline-block w-16", isRounded = true}) {
  return (
    <div className={`avatar placeholder align-top ${className}`}>
        <div className={`bg-neutral-focus text-neutral-content h-full ${isRounded ? "rounded-full" : ""}`}>
            <span className="text-3xl">K</span>
        </div>
    </div>
  )
}

export default Avatar;
