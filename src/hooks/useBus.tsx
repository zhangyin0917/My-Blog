import React, { type ReactElement } from 'react'

import mitt from 'mitt'
// 提供一个上下文对象 能够在组件树中共享状态数据
type MittBus = ReturnType<typeof mitt>
export const BusContext = React.createContext<MittBus | null>(null)
const useBus = () => {
  return React.useContext(BusContext)
}
export default useBus

export function useListener(name: string, fn: (e: any) => void) {
  const bus = useBus() as MittBus
  React.useEffect(() => {
    bus.on(name, fn)
    return () => {
      bus.off(name, fn)
    }
  }, [bus, name, fn])
}

export function Provider({ children }: { children: ReactElement }) {
  const [bus] = React.useState(() => mitt())

  return <BusContext.Provider value={bus}>{children}</BusContext.Provider>
}
