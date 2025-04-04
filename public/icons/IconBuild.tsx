import './IconBuild.css'
import * as React from 'react'

import { cn } from '@/lib/utils'

type SVGProps = {
  width?: number
  className?: string
} & React.SVGProps<SVGSVGElement> &
  React.HTMLAttributes<HTMLDivElement>

export default function IconBuild({
  width,
  className,
  ...props
}: SVGProps) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 512}
      viewBox="0 0 512.000000 482.000000"
      preserveAspectRatio="xMidYMid meet"
      className={cn(' ', className)}
      {...props}
    >
      <g
        transform="translate(0.000000,482.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          d="M1443 4805 c-65 -28 -63 -11 -63 -670 l0 -595 -661 0 -661 0 -29 -29
      -29 -29 0 -1555 c0 -1493 1 -1555 18 -1570 16 -14 44 -17 180 -17 155 0 161 1
  176 22 22 31 20 51 -7 76 -21 20 -34 22 -135 22 l-112 0 0 1480 0 1480 630 0
  630 0 0 -745 c0 -732 0 -745 20 -765 11 -11 29 -20 40 -20 11 0 29 9 40 20 20
  20 20 33 20 1405 l0 1385 1055 0 1055 0 0 -1373 c0 -1226 2 -1375 16 -1395 19
  -27 64 -29 87 -4 16 17 17 84 17 755 l0 737 635 0 635 0 0 -1480 0 -1480 -170
  0 c-157 0 -172 -2 -190 -20 -25 -25 -26 -62 -2 -83 16 -15 48 -17 234 -17 195
  0 216 2 231 18 16 17 17 140 17 1571 l0 1553 -29 29 -29 29 -666 0 -666 0 0
  598 c0 457 -3 603 -13 622 -7 14 -28 33 -47 42 -33 17 -106 18 -1115 18 -898
  -1 -1085 -3 -1112 -15z"
        />
        <path
          d="M1730 4441 c-6 -12 -10 -123 -10 -290 0 -268 0 -270 22 -285 20 -14
  114 -16 813 -16 699 0 793 2 813 16 22 15 22 17 22 285 0 167 -4 278 -10 290
  -10 19 -30 19 -825 19 -795 0 -815 0 -825 -19z"
        />

        <path
          d="M1764 3447 c-2 -7 -3 -91 -2 -187 l3 -175 183 -3 182 -2 0 190 0 190
      -180 0 c-138 0 -182 -3 -186 -13z"
        />
        <path d="M2370 3270 l0 -190 185 0 185 0 0 190 0 190 -185 0 -185 0 0 -190z" />
        <path d="M2980 3270 l0 -190 183 2 182 3 3 188 2 187 -185 0 -185 0 0 -190z" />
        <path
          d="M397 2813 c-4 -3 -7 -51 -7 -105 l0 -98 345 0 346 0 -3 103 -3 102
      -336 3 c-184 1 -338 -1 -342 -5z"
        />
        <path d="M4040 2715 l0 -105 340 0 340 0 0 105 0 105 -340 0 -340 0 0 -105z" />
        <path d="M1760 2585 l0 -185 185 0 185 0 0 185 0 185 -185 0 -185 0 0 -185z" />
        <path d="M2370 2585 l0 -185 185 0 185 0 0 185 0 185 -185 0 -185 0 0 -185z" />
        <path d="M2980 2585 l0 -185 185 0 185 0 0 185 0 185 -185 0 -185 0 0 -185z" />
        <path
          d="M394 2377 c-3 -8 -4 -54 -2 -103 l3 -89 343 -3 343 -2 -3 102 -3 103
      -338 3 c-275 2 -338 0 -343 -11z"
        />
        <path d="M4040 2285 l0 -105 340 0 340 0 0 105 0 105 -340 0 -340 0 0 -105z" />

        <path
          d="M2380 2124 c-105 -29 -198 -103 -242 -192 -20 -41 -23 -64 -26 -194
  l-3 -148 -30 -29 c-32 -32 -39 -84 -19 -137 19 -50 175 -288 224 -341 75 -82
  122 -106 223 -111 78 -4 88 -2 148 27 41 20 80 50 107 81 58 66 208 312 225
  369 16 53 3 106 -28 116 -18 6 -19 15 -17 143 1 86 -2 153 -10 179 -29 99
  -116 184 -229 225 -76 28 -244 34 -323 12z m21 -298 c91 -77 248 -135 386
  -143 l93 -6 -7 -26 c-3 -14 -12 -43 -20 -65 -21 -61 -18 -66 31 -66 51 0 59
  -11 42 -61 -23 -66 -169 -293 -226 -349 -60 -61 -105 -80 -184 -80 -105 0
  -164 47 -281 225 -107 162 -125 195 -125 228 0 32 18 47 58 47 l35 0 -7 48
  c-23 169 -20 187 42 245 54 51 104 52 163 3z"
        />

        <path
          d="M394 1947 c-3 -8 -4 -54 -2 -103 l3 -89 343 -3 342 -2 0 105 0 105
      -340 0 c-274 0 -342 -3 -346 -13z"
        />

        <path d="M4040 1855 l0 -105 340 0 340 0 0 105 0 105 -340 0 -340 0 0 -105z" />

        <path
          id="empregadoDireita"
          d="M3513 1600 c-86 -20 -192 -115 -247 -219 -85 -161 -102 -405 -39
      -538 15 -32 16 -33 82 -33 37 0 70 2 73 6 3 3 -1 26 -9 52 -23 76 -28 226 -10
  299 21 82 65 167 115 223 l39 45 23 -45 c37 -73 77 -116 153 -167 40 -26 102
  -76 140 -112 52 -50 67 -60 67 -44 0 11 -14 39 -30 61 -36 50 -26 55 17 10 63
  -67 82 -136 63 -236 -6 -35 -14 -70 -17 -78 -4 -11 6 -14 46 -14 52 0 52 0 71
  43 11 24 24 77 31 118 38 243 -81 517 -263 608 -57 29 -68 31 -167 30 -58 -1
  -120 -4 -138 -9z"
        />

        <path
          id="empregadoEsquerda"
          d="M1213 1490 c-82 -17 -156 -69 -191 -135 -10 -19 -17 -65 -20 -130 -4
      -79 -9 -105 -25 -126 -28 -39 -18 -74 50 -183 100 -159 158 -206 250 -206 100
  1 159 49 255 210 68 115 78 150 49 179 -18 18 -21 33 -21 118 0 113 -19 164
  -78 213 -62 51 -182 78 -269 60z m4 -219 c65 -44 159 -77 245 -86 l57 -6 -15
  -41 c-19 -55 -19 -56 19 -60 27 -3 32 -7 29 -27 -3 -30 -95 -184 -141 -234
  -44 -49 -80 -67 -132 -67 -73 0 -113 32 -195 156 -82 125 -95 157 -67 172 10
  5 24 7 32 4 11 -4 12 9 6 66 -8 77 5 117 47 146 33 23 50 20 115 -23z"
        />
        <path
          d="M2174 839 c-28 -16 -118 -46 -201 -69 -226 -60 -277 -87 -329 -176
      -39 -67 -51 -128 -65 -329 -13 -181 -12 -186 8 -213 11 -15 35 -32 54 -39 49
  -17 1709 -17 1758 0 19 7 43 24 54 39 19 26 20 34 10 170 l-11 143 30 26 30
  25 -22 79 c-21 74 -21 81 -6 106 26 43 12 59 -49 59 -30 0 -57 -5 -60 -10 -4
  -6 -19 0 -38 14 -57 42 -109 63 -267 105 -85 23 -179 55 -209 71 -30 17 -56
  29 -58 27 -1 -2 -34 -104 -72 -228 -38 -123 -72 -217 -75 -209 -3 8 -21 69
  -39 135 -33 115 -34 121 -17 140 31 36 41 62 31 88 -12 32 -29 37 -110 37 -53
  0 -72 -4 -84 -18 -24 -26 -21 -58 9 -97 l25 -33 -39 -133 c-21 -72 -41 -128
  -44 -123 -3 5 -38 107 -78 227 -40 119 -75 216 -79 216 -3 -1 -29 -14 -57 -30z"
        />
        <path
          id="empregadoDireita"
          d="M3938 623 c22 -26 58 -77 81 -113 l41 -65 -69 -5 -69 -5 -142 -124
      -141 -123 -30 28 -30 29 6 -55 c4 -30 8 -61 10 -68 4 -9 96 -12 418 -12 l413
  0 -8 78 c-16 153 -59 242 -148 307 -51 37 -213 117 -314 154 l-58 22 40 -48z"
        />
        <path
          id="empregadoEsquerda"
          d="M1046 623 c-17 -9 -89 -31 -160 -49 -76 -20 -146 -45 -169 -60 -56
      -37 -83 -103 -96 -239 -9 -101 -9 -112 8 -135 l18 -25 402 -3 c377 -2 401 -1
  401 15 1 100 33 373 50 424 12 34 20 62 18 64 -10 8 -50 26 -52 23 -1 -2 -22
  -67 -46 -146 -24 -78 -46 -139 -50 -135 -4 5 -17 43 -29 86 l-22 78 20 26 c33
  41 6 73 -60 73 -38 0 -69 -16 -69 -36 0 -9 7 -29 17 -44 15 -26 15 -32 -7
  -109 -13 -45 -27 -78 -31 -74 -3 5 -28 70 -54 146 -26 75 -51 137 -54 137 -3
  -1 -19 -8 -35 -17z"
        />
      </g>
    </svg>
  )
}
