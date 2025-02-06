export interface HeaderProps {
  title: string
  breadcrumbs?: BreadcrumbItem[]
}

export interface BreadcrumbItem {
  id: number
  label: string,
  href?: string
}
