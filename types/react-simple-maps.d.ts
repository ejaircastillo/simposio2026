declare module 'react-simple-maps' {
  import { ComponentType, ReactNode, CSSProperties } from 'react'

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: any
    style?: CSSProperties
    children?: ReactNode
  }

  export interface GeographiesProps {
    geography?: string
    children?: (props: { geographies: any[] }) => ReactNode
  }

  export interface GeographyProps {
    geography?: any
    style?: any
    fill?: string | number
    fillOpacity?: number
    stroke?: string
    strokeWidth?: number
    strokeOpacity?: number
    onMouseEnter?: () => void
    onMouseLeave?: () => void
  }

  export interface MarkerProps {
    coordinates?: [number, number] | number[]
    children?: ReactNode
  }

  export interface ZoomableGroupProps {
    zoom?: number
    children?: ReactNode
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const Marker: ComponentType<MarkerProps>
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>
}

