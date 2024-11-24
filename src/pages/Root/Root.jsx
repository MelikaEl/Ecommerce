import React from 'react'
import Header from '../../components/common/Header/Header'
import CategoriesChips from '../../components/common/CategoriesChips'
import ProductsGridWithPagination from '../../components/common/ProductsGridWithPagination'

const Root = () => {
  return (
    <>
    <Header/>
    <CategoriesChips/>
    <ProductsGridWithPagination />
    </>
  )
}

export default Root