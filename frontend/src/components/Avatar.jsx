import React from 'react'

function Avatar({className = "inline-block w-16", isRounded = true}) {
  return (
    <div class={`avatar placeholder align-top ${className}`}>
        <div class={`bg-neutral-focus text-neutral-content h-full ${isRounded ? "rounded-full" : ""}`}>
            <span class="text-3xl">K</span>
        </div>
    </div>
  )
}

export default Avatar;
