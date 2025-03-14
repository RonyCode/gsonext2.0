import './IconCalendar.css'
import { cn } from '@/lib/utils'
import * as React from 'react'

type SVGProps = {
  width?: number
} & React.SVGProps<SVGSVGElement> &
  React.HTMLAttributes<HTMLDivElement>

export default function IconCalendar({ width, className, ...props }: SVGProps) {
  return (
    <svg
      width={width}
      id="calendario"
      data-name="Camada 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 797.3 796.4"
      className={cn(' ', className)}
      {...props}
    >
      <path d="M797.2,194c0-25.3-9.4-46.6-26.3-64.5-25.4-27.1-57.9-34.7-93.7-31.9-5.1,.4-7.2,3.3-7.5,8.2-.3,6.5,0,13-.2,19.4-1.2,26-21,45.9-47.1,46.7-16.8,.5-33.7,.5-50.5,0-22.6-.7-39.8-15-45.5-36.8-2.2-8.4-1.4-17-1.6-25.5-.3-10.6-1.5-11.9-12.3-12.1-1,0-2.1,0-3.1,0-74.1,0-148.3,0-222.4,0-2.3,0-4.7,0-7,.1-5.8,0-8.5,3-8.6,8.7-.1,5.4,0,10.9-.1,16.3-.4,28.5-20.7,49.1-49.1,49.5-15.5,.2-31.1,.2-46.7,0-28-.4-48.3-20.8-48.9-48.9-.1-6,.2-11.9-.2-17.9-.3-4.5-2.4-7.4-7.1-7.6-17.9-.7-35.9-1.3-53,5.4C28.6,117.7,4.9,143.8,0,185.2V710.9c1.7,6.4,1.2,13.2,3.8,19.6,14.8,37.5,41.1,60.6,81.8,66H707.7c6.8-1.6,13.9-.6,20.6-2.8,39.8-12.9,69-50.7,68.9-91.9-.3-169.3-.2-338.5,0-507.8Zm-50.7,500.9c0,30.9-21.5,51.7-52.8,51.7-98.5,0-197,0-295.5,0s-194.9,0-292.4,0c-36.1,0-56-20.1-56-56.4,0-128.3,0-256.6,0-384.9,0-36.3,19.9-56.4,56-56.4,195.4,0,390.9,0,586.3,0,22.1,0,39.1,8.4,49.4,28.5,3.7,7.3,5,15.2,5,23.3,0,131.4,0,262.8,0,394.3Z" />
      <path d="M149.3,74.9c0-16.1-.1-32.1,0-48.2,.1-16.4,10.3-26.5,26.8-26.6,15.3-.1,30.6-.1,45.9,0,16.5,.1,26.7,10.2,26.8,26.6,.1,32.1,.1,64.3,0,96.4,0,15.9-10.4,26.1-26.4,26.2-15.6,.1-31.1,.1-46.7,0-16-.1-26.3-10.3-26.4-26.2-.2-16.1,0-32.1,0-48.2Z" />
      <path d="M547.5,74.9c0-16.1-.1-32.1,0-48.2,.1-16.4,10.3-26.5,26.8-26.6,15.3-.1,30.6-.1,45.9,0,16.5,.1,26.7,10.2,26.8,26.6,.1,32.1,.1,64.3,0,96.4,0,15.9-10.4,26.1-26.4,26.2-15.6,.1-31.1,.1-46.7,0-16-.1-26.3-10.3-26.4-26.2-.2-16.1,0-32.1,0-48.2Z" />

      <path d="M149.3,397.5c0-8-.2-16.1,0-24.1,.4-14.2,10.5-24.6,24.6-24.8,16.8-.3,33.7-.3,50.5,0,13.7,.3,23.9,10.6,24.2,24.4,.3,16.8,.3,33.7,0,50.5-.3,13.7-10.5,24.1-24.2,24.4-17.1,.4-34.2,.4-51.3,0-13.3-.3-23.3-10.6-23.8-23.9-.3-8.8,0-17.6,0-26.4h0Z" />
      <path d="M448,398.9c0,7.8,.1,15.6,0,23.3-.3,15.1-10.4,25.5-25.3,25.7-16.3,.2-32.7,.2-49,0-14.6-.2-24.9-10.5-25.2-25.1-.3-16.3-.2-32.7,0-49,.2-14.9,10.6-25.2,25.7-25.4,16.1-.2,32.1-.2,48.2,0,15,.2,25.3,10.5,25.6,25.5,.2,8.3,0,16.6,0,24.9Z" />
      <path d="M647,398.2c0,8.3,.2,16.6,0,24.9-.4,14.2-10.5,24.6-24.6,24.8-16.8,.3-33.7,.3-50.5,0-13.7-.3-23.9-10.6-24.2-24.4-.3-16.8-.3-33.7,0-50.5,.3-13.7,10.5-24.1,24.2-24.4,17.1-.4,34.2-.4,51.3,0,13.3,.3,23.3,10.6,23.8,23.9,.3,8.5,0,17.1,0,25.7h0Z" />
      <g id="dias">
        <path d="M149.3,597.3c0-8.3-.2-16.6,0-24.9,.4-14.1,10.5-24.5,24.6-24.8,16.8-.3,33.7-.3,50.5,0,13.7,.3,23.9,10.6,24.2,24.4,.3,16.8,.3,33.7,0,50.5-.3,13.7-10.5,24.1-24.2,24.4-17.1,.4-34.2,.4-51.3,0-13.3-.3-23.3-10.6-23.8-24-.3-8.5,0-17.1,0-25.7h0Z" />
        <path d="M399,547.6c8,0,16.1-.2,24.1,0,14.1,.4,24.5,10.5,24.8,24.6,.3,16.8,.3,33.7,0,50.5-.3,13.7-10.6,23.9-24.4,24.2-16.8,.3-33.7,.3-50.5,0-13.7-.3-24.1-10.5-24.4-24.2-.4-17.1-.4-34.2,0-51.3,.3-13.3,10.6-23.3,24-23.8,8.8-.3,17.6,0,26.4,0h0Z" />
      </g>
    </svg>
  )
}
