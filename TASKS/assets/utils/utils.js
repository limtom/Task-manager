/**
 * Logic for the pagination
 */

export const paginator = (items, currentPage, perPageItems) => {
  let page = currentPage || 1
  let perPage = perPageItems || 4
  let offset = (page - 1) * perPage

  let parginatedItems = items.slice(offset).slice(0, perPageItems)
  let totalPages = Math.ceil(items.length / perPage)
  return {
    page,
    perPage,
    prePage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages,
    data: parginatedItems,
  }
}

export const abreviate = (string) => {
  let abr = string.split('')[0] + newValue.split('')[1]
  return abr.toUpperCase()
}
