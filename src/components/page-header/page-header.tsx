import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import type { NavigationItem } from '../../configs/template.config'
import AccountMenu from '../account-menu'
import Header from '../header'
import MobileMenu from '../navigation/mobile-menu'
import './page-header.module.scss'

interface PageHeaderProps {
  headers: NavigationItem[]
}

const PageHeader = ({ headers }: PageHeaderProps) => {
  const { pathname } = useLocation()
  const [currentPage, setCurrentPage] = useState<NavigationItem | null>(null)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const currentRoute = pathname.split('/').filter(Boolean).pop()
    const page = headers.find((entry) => entry.route === `/${currentRoute}`) ?? null
    setCurrentPage(page)
  }, [headers, pathname])

  return (
    <div className="page-header">
      <div className="page-header-left">
        {windowWidth <= 768 ? (
          <>
            <MobileMenu menu={headers} />
            <Header />
          </>
        ) : null}

        {currentPage ? (
          <>
            <h2 className="page-title">{currentPage.pageHeader}</h2>
            <p className="page-subtitle">{currentPage.pageSubHeader}</p>
          </>
        ) : (
          <p className="page-subtitle">Loading...</p>
        )}
      </div>

      <div className="page-header-right">
        <AccountMenu />
      </div>
    </div>
  )
}

export default PageHeader
