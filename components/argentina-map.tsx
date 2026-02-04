'use client'

export function ArgentinaMap({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 340"
      className={className}
      fill="none"
    >
      {/* Argentina continental - accurate geographic outline */}
      <path
        d="M95.5,2 L100,3 L106,5 L112,8 L118,12 L122,16 L125,20 L127,24 L130,30 L133,38 L136,48 L138,56 L140,64 L141,72 L142,80 L142.5,88 L143,96 L143,104 L142.5,112 L142,120 L141,128 L140,134 L139,140 L138,146 L136,154 L134,162 L132,170 L130,178 L127,186 L124,194 L120,202 L116,210 L112,218 L108,226 L104,234 L100,242 L96,250 L92,257 L88,264 L84,271 L80,278 L77,284 L74,290 L72,295 L70,300 L68,305 L66,310 L63,316 L60,322 L57,327 L54,330 L50,332 L46,333 L42,332 L39,330 L37,326 L36,320 L36,314 L37,308 L38,302 L38,296 L37,290 L36,284 L34,278 L32,272 L30,266 L28,260 L26,254 L24,248 L23,242 L22,236 L22,230 L23,224 L25,218 L28,212 L32,206 L36,200 L40,195 L44,190 L48,186 L52,183 L55,180 L57,177 L58,174 L58,170 L57,166 L55,162 L52,158 L49,154 L46,150 L44,146 L43,142 L43,138 L44,134 L46,130 L49,126 L53,122 L57,119 L61,116 L64,113 L66,110 L67,106 L67,102 L66,98 L64,94 L62,90 L61,86 L61,82 L62,78 L64,74 L67,70 L70,67 L73,64 L76,62 L80,60 L84,58 L87,55 L89,51 L90,46 L90,40 L89,34 L88,28 L88,22 L89,16 L91,10 L93,6 L95.5,2 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />
      {/* Tierra del Fuego */}
      <path
        d="M42,338 L48,336 L56,336 L64,338 L70,342 L73,348 L72,354 L68,358 L62,360 L54,360 L46,358 L40,354 L38,348 L40,342 L42,338 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />
      {/* Islas Malvinas */}
      <path
        d="M120,330 L128,328 L136,330 L140,336 L138,342 L132,346 L124,346 L118,342 L116,336 L120,330 Z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="3,2"
      />
    </svg>
  )
}
