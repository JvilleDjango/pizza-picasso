import { ChartPie, Leaf, Pizza, type LucideIcon } from 'lucide-react'

interface IconFactoryProps {
  iconName?: string
}

const iconsMap: Record<string, LucideIcon> = {
  fapizzaslice: Pizza,
  fachartpie: ChartPie,
  facheese: Leaf,
}

function IconFactory({ iconName }: IconFactoryProps) {
  const normalizedIconName = iconName?.toLowerCase()
  const Icon = normalizedIconName ? iconsMap[normalizedIconName] : undefined

  return Icon ? <Icon aria-hidden="true" /> : null
}

export default IconFactory
