import { useActiveWeb3React } from 'hooks/web3'
import { useEffect } from 'react'
import { useDarkModeManager } from 'state/user/hooks'
import { SupportedChainId } from '../constants/chains'

const initialStyles = {
  width: '200vw',
  height: '200vh',
  transform: 'translate(-50vw, -100vh)',
}
const backgroundResetStyles = {
  width: '100vw',
  height: '100vh',
  transform: 'unset',
}

type TargetBackgroundStyles = typeof initialStyles | typeof backgroundResetStyles

const backgroundRadialGradientElement = document.getElementById('background-radial-gradient')
const setBackground = (newValues: TargetBackgroundStyles) =>
  Object.entries(newValues).forEach(([key, value]) => {
    if (backgroundRadialGradientElement) {
      backgroundRadialGradientElement.style[key as keyof typeof backgroundResetStyles] = value
    }
  })
export default function RadialGradientByChainUpdater(): null {
  const { chainId } = useActiveWeb3React()
  const [darkMode] = useDarkModeManager()
  // manage background color
  useEffect(() => {
    if (!backgroundRadialGradientElement) {
      return
    }

    switch (chainId) {
      case SupportedChainId.ARBITRUM_ONE:
      case SupportedChainId.ARBITRUM_RINKEBY:
        setBackground(backgroundResetStyles)
        const arbitrumLightGradient = 'radial-gradient(150% 100% at 50% 0%, #FF7900 0%, #FFD600 50%, #FFFF00 100%)'
        const arbitrumDarkGradient = 'radial-gradient(150% 100% at 50% 0%, #FF7900 0%, #FFD600 50%, #FFFF00 100%)'
        backgroundRadialGradientElement.style.background = darkMode ? arbitrumDarkGradient : arbitrumLightGradient
        break
      case SupportedChainId.OPTIMISM:
      case SupportedChainId.OPTIMISTIC_KOVAN:
        setBackground(backgroundResetStyles)
        const optimismLightGradient = 'radial-gradient(150% 100% at 50% 0%, #FF7900 2%, #FFD600 53%, #FFFF00 100%)'
        const optimismDarkGradient = 'radial-gradient(150% 100% at 50% 0%, #FF7900 2%, #FFD600 53%, #FFFF00 100%)'
        backgroundRadialGradientElement.style.background = darkMode ? optimismDarkGradient : optimismLightGradient
        break
      default:
        setBackground(initialStyles)
        backgroundRadialGradientElement.style.background = ''
    }
  }, [darkMode, chainId])
  return null
}
