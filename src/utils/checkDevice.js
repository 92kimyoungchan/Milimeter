export function hasNotch () {
  const isSafeCssSupports = CSS.supports('padding-bottom: env(safe-area-inset-bottom)')
  if (isSafeCssSupports) {
    const tempDiv = document.createElement('div')
    tempDiv.style.paddingBottom = 'env(safe-area-inset-bottom)'
    document.body.appendChild(tempDiv)
    const calculatedPadding = parseInt(window.getComputedStyle(tempDiv).paddingBottom, 10)
    document.body.removeChild(tempDiv)
    if (calculatedPadding > 0) {
      return true
    } else {
      return false
    }
  }
}

export const NOTCH_HEIGHT = 50
